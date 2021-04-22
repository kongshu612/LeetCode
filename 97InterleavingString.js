/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    let cache = new Map();
    var dfs = (s1,s2,s3)=>{
        let key = `${s1}x${s2}x${s3}`;
        if(cache.has(key)){
            return cache.get(key);
        }

        let result=false;
        if(s1.length+s2.length!=s3.length){
            cache.set(key,false);
            return false;
        }
        if(!s1||!s1.length){
            result = s2==s3;
            cache.set(key,result);
            return result;
        }
        else if(!s2||!s2.length){
            result = s1==s3;
            cache.set(key,result);
            return result;
        }

        if(s1[0]==s3[0]){
            if(s1.length==1){
                result = s2==s3.substr(1);
            }else{
                result = dfs(s1.substr(1),s2,s3.substr(1));
            }            
        }
        if(!result&&s2[0]==s3[0]){
            if(s2.length==1){
                result = s1==s3.substr(1);
            }else{
                result = dfs(s1,s2.substr(1),s3.substr(1));
            }            
        }
        cache.set(key,result);
        return result;
    }
    return dfs(s1,s2,s3);






    // var findcommonprefix=(s1,s2)=>{
    //     if(!s1||!s1.length){
    //         return 0;
    //     }
    //     let count=0;
    //     for(let i=0;i<s1.length;i++){
    //         if(s1[i]!=s2[i]){
    //             break;
    //         }
    //         count++;
    //     }
    //     return count;
    // }
    // var match = (s1,s2,s3)=>{        
    //     if(s1.length+s2.length!=s3.length){
    //         return false;
    //     }else if(!s3||!s3.length){
    //         return true;
    //     }else if(!s1||!s1.length){
    //         return s2==s3;
    //     }
    //     else if(!s2||!s2.length){
    //         return s1==s3;
    //     }
    //     let [len1,len2]=[findcommonprefix(s1,s3),findcommonprefix(s2,s3)];
    //     if(len1==len2&&len1==0){
    //         return false;
    //     }
    //     let ispass=false;
    //     if(len1>0){
    //         if(len1==s1.length){
    //             ispass=ispass || s2==s3.substr(len1);
    //         }else{
    //             ispass = ispass || match(s1.substr(len1),s2,s3.substr(len1));
    //         }
    //     }
    //     if(!ispass&&len2>0){
    //         if(len2==s2.length){
    //             ispass = ispass || s1==s3.substr(len2);
    //         }else{
    //             ispass = ispass || match(s1,s2.substr(len2),s3.substr(len2));
    //         }
            
    //     }
    //     return ispass;
    // }
    // return match(s1,s2,s3);
};