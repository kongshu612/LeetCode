function myPromise(fn){
    let [status,result,handlers]=['PENDING',null,[]];
    const [PENDING,RESOLVED,REJECTED]=['PENDING','RESOLVED','REJECTED'];
    function resolve(val){
        result=val;
        status=RESOLVED;
        handlers
        .filter(it=>it.resolve!=null)
        .forEach(it=>it.resolve(result))
    }
    function reject(reason){
        result=reason;
        status=REJECTED;
        handlers
        .filter(it=>it.reject!=null)
        .forEach(it=>it.reject(result));
    }
    function doInit(fn,doresolve,doreject){
        fn((val)=>doresolve(val),(err)=>doreject(err));
    }
    function doresolve(val){
        let then = getThen(val);
        if(then!=null){
            then((res)=>doresolve(res),(err)=>reject(err));
            return;
        }else{
            resolve(val);
        }
    }
    function getThen(obj){
        if(obj.then!=null&&(typeof obj.then) === 'function'){
            return obj.then;
        }else{
            return null;
        }
    }
    doInit(fn,doresolve,reject);

    this.listen = (resolve,reject)=>{
        setTimeout(()=>{
            if(status===RESOLVED&&resolve!=null){
                resolve(result);
                return;
            }else if(status===REJECTED&&reject!=null){
                reject(result);
            }else{
                handlers.push({resolve,reject});
            }
        })
    }

    this.then = (resolveCallback,rejectCallback)=>{
        let self = this;
        return new myPromise((resolve,reject)=>{
            self.listen(
                (val)=>{
                    if(resolveCallback!=null){
                        resolve(resolveCallback(val));
                    }else{
                        resolve(val);
                    }
                },
                (err)=>{
                    if(rejectCallback!=null){
                        reject(rejectCallback(err));
                    }else{
                        reject(err);
                    }
                }
            )
        });
    }

    this.catch = (reject)=>this.then(null,reject);
    this.finally = (final)=>this.then(
        (val)=>final(val),(err)=>final(err)
    )
}

myPromise.prototype.all = (promises)=>{
    return new myPromise((resolve,reject)=>{
        let results=new Array(promises.length);
        let len = promises.length;
        let commitCount=0;
        for(let i=0;i<len;i++){
            promises[i].then(val=>{
                results[i]=val;
                commitCount++;
                if(commitCount==len){
                    resolve(results);
                }
            },err=>{
                reject(err);
            })
        }
    });
}

myPromise.prototype.race=(promises)=>{
    return new myPromise((resolve,reject)=>{
        let isCommit=false;
        for(let i=0;i<promises.length;i++){
            promises[i].then((val)=>{
                if(!isCommit){
                    isCommit=true;
                    resolve(val);
                }
            },(err)=>{
                if(!isCommit){
                    isCommit=true;
                    reject(err);
                }
            })
        }
    })
}



myPromise.prototype.allf=(promises)=>{
    return new myPromise((resolve, reject)=>{
        let values = new Array(promises.length);
        let total = promises.length;
        let completedCount=0;
        for(let i=0;i<total;i++){
            promises[i].then((val)=>{
                values[i]=val;
                completedCount++;
                if(completedCount>=total){
                    resolve(values);
                }
            },(err)=>{
                reject(err);
            })
        }
    })
}

