function MyPromise(fn){
    const PENDING='PENDING';
    const FULFILLED='FULFILLED';
    const REJECTED='REJECTED';
    var status=PENDING;
    var handlers=[];
    var result=null;

    function fulfill(value){
        result=value;
        status=FULFILLED;
        handlers.forEach(it=>handle(it));
    }

    function reject(error){
        result=error;
        status=REJECTED;
        handlers.forEach(it=>handle(it));
    }

    function handle(hanlder){
        if(status==PENDING){
            handlers.push(hanlder);
        }else{
            if(status==FULFILLED&&hanlder.onFulfill){
                hanlder.onFulfill(result);
            }
            if(status==REJECTED&&hanlder.onReject){
                hanlder.onReject(result);
            }
        }
    }

    function getThen(result){        
        if(result&&(typeof result=='object'||typeof result =='function')){
            let then = result.then;
            if(then){
                return then;
            }
        }
        return null;
    }

    function resolve(result){
        try{
            let then=getThen(result);
        if(then){
            doresolve(then.bind(result),resolve,reject);
            return;
        }
        fulfill(result);
        }
        catch (ex){
            reject(ex);
        }        
    }

    this.done=function(onfulfill,onreject){
        setTimeout(
            ()=>{
                handle({
                    onFulfill:onfulfill,
                    onReject:onreject
                })
            },0
        );
    }

    this.then=function(onFulfill,onReject){
        var self=this;
        return new MyPromise((resolve,reject)=>{
            self.done((result)=>{                
                    if(typeof onFulfill === 'function'){
                        try{
                            resolve(onFulfill(result));
                        }catch(ex){
                            reject(ex);
                        }               
                    }else{
                        resolve(result);
                    }
            },
            error=>{
                
                    if(typeof onReject === 'function'){
                        try{reject(onReject(error));
                        }catch (ex){
                            reject(ex);
                        }
                    }else{
                        reject(error);
                    }
            })
        });
    }

    this.catch=function(onReject){
        return this.then(null,onReject);
    }

    this.finally=function(callback){
        this.then((value)=>{
            callback(value);
            resolve(value);
        },(error)=>{
            callback(error);
            reject(error);
        })
    }

    function doresolve(fn,onfulfill,onreject){
        let isdone=false;
        try{
            fn((result)=>{
                if(!isdone){
                    isdone=true;
                    onfulfill(result);
                }
            },(error)=>{
                if(!isdone){
                    isdone=true;
                    onreject(error);
                }
            });
        }catch (ex){
            if(!isdone){
                isdone=true;
                onreject(ex);
            }
        }
        
    }

    doresolve(fn,resolve,reject);
}

MyPromise.resolve=function(value){
    if(value.__prototype__==MyPromise.prototype){
        return value;
    }
    if(value&&typeof value==='object'||typeof value==='function'){
        let then = value.then;
        if(then){
            return new MyPromise((resolve,reject)=>{
                value.then(resolve,reject);
            })
        }
    }
    return new MyPromise((resolve)=>{
        resolve(value);
    })
}

MyPromise.prototype.finally=function(callback){
    let P = this.constructor;
}

