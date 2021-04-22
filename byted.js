Object.prototype[Symbol.iterator]=function(){
    var [digitKeys,nonDigitKeys]=[
        Object.keys(this).filter(it=>!isNaN(it)).sort(),
        Object.keys(this).filter(it=>isNaN(it)).sort((a,b)=>a.charCodeAt()-b.charCodeAt())
    ];
    var allkeys=[...digitKeys,...nonDigitKeys];
    var allValues = [];
    for(let i=0;i<allkeys.length;i++){
        allValues.push(this[allkeys[i]]);
    }
    var index=0;
    return {        
        next:function(){
            if(index>=allValues.length){
                return {value:null,done:true};
            }
            return {value:allValues[index++],done:false};
        }
    }
}



Object.prototype.map=function(fn){
    let digits=Object.keys(this).filter(it=>!isNaN(it)).sort();
    let nondigit=Object.keys(this).filter(it=>isNaN(it)).sort((a,b)=>a.charCodeAt()-b.charCodeAt());
    let keys=[...digits,...nondigit];
    let result=[];
    for(let i=0;i<keys.length;i++){
        result.push(fn(this[keys[i]],i,this))
    }
    return result;
}

