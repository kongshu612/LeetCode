function MyPromise(fn){
    let [state,result,handlers]=[null,null,[]];
    const [PENDING,RESOLVED,REJECTED]=['PENDING','RESOLVED','REJECTED'];

    function doResolve(val){
        state=RESOLVED;
        result=val;
        handlers.filter(it.resolve!=null).forEach(it=>it.resolve(val));
    }

    function doReject(err){
        state=REJECTED;
        result=err;
        handlers.filter(it.reject!=null).forEach(it=>it.reject(err));
    }

    function addSubscribe(listener){
        if(state==PENDING){
            handlers.push(listener);
        }else{
            if(state==RESOLVED&&listener.resolve!=null){
                listener.resolve(result);
            }
            if(state==REJECTED&&listener.reject!=null){
                listener.reject(result);
            }
        }
    }

    function internalResolve(val){
        if(state==PENDING){
            let then = val.then;
            if(then!=null&&typeof then === 'function'){
                val.then(internalResolve,doReject);
            }else{
                resolve(val);
            }
        }
    }
    fn(internalResolve,doReject);

    this.add = (resolve,reject)=>{
        setTimeout(()=>this.addSubscribe({resolve,reject}),0);
    }

    this.then=(resolve,reject)=>{
        var self = this;
        return new MyPromise((nextresolve,nextreject)=>{
            self.add((val)=>{
                if(resolve!=null ){
                    nextresolve(resolve(val))
                }else{
                    nextresolve(val);
                }
            },(err)=>{
                if(reject!=null){
                    nextreject(reject(err));
                }else{
                    nextreject(err);
                }
            });
        })
    }  


}