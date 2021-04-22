function MyPromise(fn){
    const PENDING='PENDING';
    const FULFILLED='FULFILLED';
    const REJECTED='REJECTED';
    var status=PENDING;
    var result=null;
    var handlers=[];

    function onFulfill(value){
        result=value;
        status=FULFILLED;
        handlers.forEach(it=>handle(it));
    }

    function reject(error){
        result=error;
        status=REJECTED;
        handlers.forEach(it=>handle(it));
    }

    function handle(handler){
        if(status==PENDING){
            handlers.push(handler);
        }else{
            if(status==FULFILLED&&typeof handler.onFulfill=='function'){
                handler.onFulfill(result);
            }
            if(status==REJECTED&&typeof handler.onReject=='function'){
                handler.onReject(result);
            }
        }
    }

    function getThen(result){
        if(result&&typeof result==='object'||typeof result==='function'){
            let then = result.then;
            if(typeof then=='function'){
                return then;
            }
        }
        return null;
    }

    function resolve(value){
        try{
            let then = getThen(value);
            if(then){
                doResolve(then.bind(value),resolve,reject);
                return;
            }else{
                onFulfill(value);
            }
        }catch(ex){
            onReject(ex);
        }        
    }

    function doResolve(fn,onFullfill,onReject){
        var isdone=false;
        try{
            fn((value)=>{
                if(!isdone){
                    isdone=true;
                    onFulfill(value);
                }
            },(error)=>{
                if(!isdone){
                    isdone=true;
                    onReject(error);
                }
            })
        }
        catch(ex){
            if(!isdone){
                onReject(error);
            }
        }
    }

    this.done=(onFulfill,onReject)=>{
        setTimeout(()=>{
            handlers.push({
                onFulfill:onFulfill,
                onReject:onReject
            })
        },0);
    }

    this.then=function(onFulfill,onReject){
        var self=this;
        return new Promise((resolve,reject)=>{
            self.done((value)=>{
                if(typeof onFulfill=='function'){
                    try{
                        resolve(onFulfill(value));
                    }catch(ex){
                        reject(ex);
                    }                    
                }else{
                    resolve(value);
                }
            },(error)=>{
                if(typeof onReject=='function'){
                    try{
                        reject(onReject(error));
                    }catch(ex){
                        reject(ex);
                    }
                }else{
                    reject(error);
                }
            })
        })
    }

    doResolve(fn,resolve,reject);
}

MyPromise.all=function(promises){
    if(Array.isArray(promises)){
        throw new TypeError('ddd');
    }
    return new MyPromise((resolve,reject)=>{
        let len = promises.length;
        let count=0;
        let result= new Array(len);
        for(let i=0;i<len;i++){
            promises[i].then((val)=>{
                result[i]=val;
                count++;
                if(count>=len){
                    resolve(result);
                }
            },(error)=>{
                reject(error);
            })
        }
    });    
}

MyPromise.prototype.finally=function(callback){
    let P=this.constructor;
    return this.then(
        (value)=>P.resolve(callback()).then(()=>value),
        (error)=>P.resolve(callback()).then(()=>{throw error;}),
    );
}

MyPromise.race=function(promises){
    return new MyPromise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
MyPromise.any=function(promises){
    return new MyPromise((resolve,reject)=>{
        let errorCount=0;
        for(let i=0;i<promises.length;i++){
            promises[i].then((val)=>{

            },(error)=>{
                errorCount++;
                if(errorCount>=promises.length){
                    reject()
                }
            })
        }
    })
}

MyPromise.resolve=function(fn){
    if(fn.prototype==MyPromise.prototype){
        return fn;
    }
    if(fn&&typeof fn=='object'||typeof fn=='function'){
        let then = fn.then;
        if(typeof then=='function'){
            return new MyPromise((resolve,reject)=>{
                fn.then(resolve,reject);
            })
        }
    }
    return new Promise((resolve,reject)=>{
        resolve(fn);
    })
}