function Promise1(fn){
    const PENDING='PENDING';
    const FULLFILLED='FULLFILLED';
    const REJECTED='REJECTED';

    var promise=this;
    promise._resolves=[];
    promise._rejects=[];
    promise._status=PENDING;
    promise._value=null;
    promise._err=null;
    const isFunction = param=>typeof param === 'function';
    this.then=function(onFullfilled,onReject){
        return new Promise1((resolve,reject)=>{
            function handle(value){
                var ret = isFunction(onFullfilled)&& onFullfilled(value)||value;
                if(ret && typeof ret['then'] == 'function'){
                    ret.then(()=>{
                        resolve(value);
                    });
                }else{
                    resolve(ret);
                }                
            }

            function errback(err){
                err=isFunction(onReject)&&onReject(err)||err;
                reject(err);
            }
            if(promise._status==PENDING){
                promise._resolves.push(handle);
                promise._rejects.push(errback);
            }else if(promise._status==FULLFILLED){
                handle(promise._value);
            }else if(promise._status==REJECTED){
                errback(promise._err);
            }
        });     
    }
    function resolve(value){
        promise._value=value;
        promise._status=FULLFILLED;
        promise._resolves.forEach(it=>{
            it(value);
        });      
    }
    function reject(err){
        promise._err=err;
        promise._status=REJECTED;
        promise._rejects.forEach(it=>it(err));
    }
    fn(resolve,reject);
}

Promise1.all=(promises)=>{
    if(!Array.isArray(promises)){
        throw new TypeError('you must pass an array to all');
    }
    return new Promise1((resolve,reject)=>{
        var result=[];
        var count = promises.length;
        function resolver(index){
            return function(value){
                resolveAll(value,index);
            }
        }

        function rejecter(){
            return function(err){
                reject(err);
            }
        }

        function resolveAll(value,index){
            result[index]=value;
            if(--count==0){
                resolve(result);
            }
        }
        for(var i=0;i<promises.length;i++){
            promises[i].then(resolver(i),rejecter);
        }
    });
}

Promise1.race=(promises)=>{
    if(!Array.isArray(promises)){
        throw new TypeError('You must pass an array to race.');
    }
    return new Promise1((resolve,reject)=>{
        // function resolver(value){
        //     resolve(value);
        // }
        // function rejecter(err){
        //     reject(err);
        // }
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}


// function MyPromise(fn){
//     const isFunction = param=>typeof param === 'function';
//     const PENDING='PENDING';
//     const FULFILLED='FULFILLED';
//     const REJECTED='REJECTED';
//     const promise=this;
//     promise._status=PENDING;
//     promise._value=undefined;
//     promise._resolves=[];
//     promise._rejected=[];

//     function resolve(){

//     }
// }



