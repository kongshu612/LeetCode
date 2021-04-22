function MyPromise(fn){
    const PENDING=0;
    const FULFILLED=1;
    const REJECTED=2;
    var state=PENDING;
    var value=null;
    var handlers=[];

    function fulfill(result){
        value=result;
        state=FULFILLED;
        handlers.forEach(it=>handle(it));
    }

    function reject(error){
        value=error;
        state=REJECTED;
        handlers.forEach(it=>handle(it));
    }

    function getThen(value){
        let t = typeof value;
        if(value&&(t==='object'||t==='function')){
            let then = value.then;
            if(typeof then === 'function'){
                return then;
            }
        }
        return null;
    }

    function doResolve(fn,onFulfilled,onRejected){
        var done=false;
        try{
            fn((value)=>{
                if(done){
                    return;
                }
                done=true;
                onFulfilled(value);
            },(error)=>{
                if(done){
                    return;
                }
                done=true;
                onRejected(error);
            })
        }catch (ex){
            if(done){
                return;
            }
            done=true;
            onRejected(ex);
        }
    }

    function resolve(result){  
        try{
            var then = getThen(result);
            if(then){
                doResolve(then.bind(result),resolve,reject);
                return;
            }
            fulfill(result);
        }
        catch(ex){
            reject(ex);
        }
    }

    function handle(handler){
        if(state===PENDING){
            handlers.push(handler);
        }else{
            if(state===FULFILLED && typeof handler.onFulfilled==='function'){
                handler.onFulfilled(value);
            }
            if(state===REJECTED && typeof handler.onRejected==='function'){
                handler.onRejected(value);
            }
        }
    }    

    this.done=(onFulfilled,onRejected)=>{
        setTimeout(()=>{
            handle({
                onFulfilled:onFulfilled,
                onRejected:onRejected
            })
        },0);
    }

    this.then=(onFulfilled,onRejected)=>{
        var self=this;
        return new MyPromise((resolve,reject)=>{
            return self.done((result)=>{
                if(typeof onFulfilled === 'function'){
                    try{
                        return resolve(onFulfilled(result));
                    }catch(ex){
                        return reject(ex);
                    }
                }else{
                    return resolve(result);
                }
            },(error)=>{
                if(typeof onRejected === 'function'){
                    try{
                        return reject(onRejected(error));
                    }catch(ex){
                        return reject(ex);
                    }
                }else{
                    return reject(error);
                }
            })
        });
    }    

    doResolve(fn,resolve,reject);
}

MyPromise.race=(promises)=>{
    if(!Array.isArray(promises)){
        throw new TypeError('you must specify an array');
    }
    return new MyPromise((resolve,reject)=>{
        var done=false;
        var result=null;
        for(let i=0;i<promises.length;i++){
            promises[i].then((val)=>{
                if(!done){
                    dont=true;
                    resolve(val);
                }
            },(error)=>{
                if(!done){
                    done=true;
                    reject(error);
                }
            })
        }
    });
}

MyPromise.all=(promises)=>{
    if(!Array.isArray(promises)){
        throw new TypeError('you must specify an array');
    }
    return new MyPromise((resolve,reject)=>{
        var count=promises.length;
        var result=[];
        for(let i=0;i<promises.length;i++){
            promises[i].then((val)=>{
                if(count>0){
                    count--;
                result.push(val);
                if(count<=0){
                    resolve(result);
                }
                }
                
            },(error)=>{
                count=0;
                reject(error);
            })
        }
    });
}