// Iterator-implement
Object.prototype.symbol[iterator]=function(){
    let keys = Object.keys(this);
    let [index,maxlength]=[0,keys.length];
    return {
        next:()=>{
            if(index>=maxlength){
                return {
                    done:true
                }
            }else{
                return {
                    value:this[keys[index]],
                    done:false
                }
            }
        }
    }
}

// map-implement
Object.prototype._map=function(fn){
    let result=[];
    for(const it of this){
        result.push(fn(it));
    }
    return result;
}

//Observable implement
function MyObservable(data){
    let subscribes = [];
    const handler={
        set(target,propertyKey,val,receiver){
            Reflect.set(target,propertyKey,val,receiver);
            subscribes.forEach(it=>it(target))
        }
    };
    let result = new Proxy(data,handler);
    result.__proto__.subscribe = (fn)=>{
        subscribes.push(fn);
    }
    return result;
}

// circle Array
function CreateArray(...elements){
    const handle={
        get(target,propertyKey,receiver){
            if(NaN(propertyKey)){
                return Reflect.get(target,propertyKey,receiver);
            }
            let index = Number(propertyKey);
            if(index<0){
                propertyKey=String(index+elements.length);
            }
            return Reflect.get(target,propertyKey,receiver);
        }
    }
    return new Proxy([...elements],handle);
}

// Bind implement
Object.prototype._bind = function(thisArg){
    if(typeof this !='function'){
        throw new TypeError('error');
    }

    var baseArgs = [...arguments].slice(1);
    var self = this;
    var fn=function(){};
    if(this.prototype){
        fn.prototype=this.prototype;
    }
    var fBound = function(){
        return self.apply(this instanceof fn?this:self,[...baseArgs,arguments]);
    }
    fBound.prototype=new fn();
    return fBound;
}

// Simple Bind version
Object.prototype._bind = function(thisArg){
    if(typeof this!='function'){
        throw new TypeError('error');
    }
    var baseArgs = [...arguments].slice(1);
    var self = this;
    return function(){
        return self.apply(thisArg,[...baseArgs,...arguments]);
    }
}

// Iterator
Object.prototype.symbol['iterator1']=function(){
    let [index,length,self]=[0,this.length,this];
    return {
        next(){
            if(index<length){
                return {
                    value:self[index++],
                    done:false
                }
            }else{
                return {done:true}
            }           
        }
    }
}


//Thunk 
var MyThunk=function(fn){
    return function(...args){
        return function(callback){
            return fn.apply(this,[...args,callback]);
        }
    }
}

function executor(gen){
    const ite = gen();
    let result = ite.next();
    while(!result.done){
        console.log(result.value);
        result=ite.next();
    }
}

function readFile(path,callback){

}

function Thunk(fn){
    return (params)=>{
        return (callback)=>{
            return fn(...params,callback);
        }
    }
}

function * genf(){
    yield Thunk(readFile)(f1);
    yield Thunk(readFile)(f2);
    yield Thunk(readFile)(f3);
}

function run(genf){
    const ite = genf();
    function next(res){
        let result = ite.next(res);
        if(result.done){return;}
        result.value(next);
    }
    next();
}