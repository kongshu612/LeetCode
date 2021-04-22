/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    let cache = new Map();
    var isSR = (s1,s2)=>{
        let key = `${s1}_${s2}`;
        if(cache.has(key)){
            return cache.get(key);
        }
        let len = s1.length;
        if(s2.length!=len){
            cache.set(key,false);
            return false;
        }
        else if(len==1){
            cache.set(key,s1==s2);
            return s1==s2;
        }
        else if(s1==s2){
            cache.set(key,true);
            return true;
        }
        for(let i=1;i<len;i++){
            let [ls1,rs1]=[s1.substr(0,i),s1.substr(i)];
            let [ls2,rs2]=[s2.substr(0,i),s2.substr(i)];
            let [sls2,srs2]=[s2.substr(0,len-i),s2.substr(len-i)];
            if(isSR(ls1,ls2)&&isSR(rs1,rs2)){
                cache.set(key,true);
                return true;
            }
            if(isSR(ls1,srs2)&&isSR(rs1,sls2)){
                cache.set(key,true);
                return true;
            }            
        }
        cache.set(key,false);
        return false;
    }
    return isSR(s1,s2);
    // var dsf=(s)=>{
    //     if(cache.has(s)){
    //         return cache.get(s);
    //     }
    //     let len = s.length;
    //     if(len==1){            
    //         return [`${s}`];
    //     }
    //     else if(len==2){
    //         return [`${s}`,`${s[1]}${s[0]}`];
    //     }
    //     let result=new Set();
    //     for(let i=0;i<len-1;i++){
    //         let [left,right]=[dsf(s.substr(0,i+1)),dsf(s.substr(i+1))];
    //         for(let l=0;l<left.length;l++){
    //             for(let r=0;r<right.length;r++){
    //                 let [f,s]=[`${left[l]}${right[r]}`,`${right[r]}${left[l]}`];
    //                 result.add(f).add(s);
    //             }
    //         }
    //     }
    //     result = [...result];
    //     cache.set(s,result);
    //     return result;
    // }
    // let res = dsf(s1);
    // let set = new Set([...res]);
    // return set.has(s2);
};