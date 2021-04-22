/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    let cache = new Map();
    var dfs = (n,offset)=>{
        let key = `${n}x${offset}`;
        if(cache.has(key)){
            return cache.get(key);
        }
        if(n==0){
            cache.set(key,1);
            return 1;
        }
        else if(n==1){
            cache.set(key,1);
            return 1;
        }
        let result = 0;
        for(let i=1;i<=n;i++){
            let [l,r]=[dfs(i-1,offset),dfs(n-i,offset+i)];
            result+=l*r;
        }
        cache.set(key,result);
        return result;
    }

    return dfs(n,0);
};