/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    var dfs = (s,path,depth,res)=>{
        if(!s.length&&depth==4){
            return res.add(path);
        }
        if(!s.length|| depth==4){
            return;
        }
        for(let i=1;i<=3;i++){
            let sub = s.substr(0,i);
            let num = parseInt(sub);

            let isValidateZero = num==0&&sub.length==1;
            let isValidateNonZero = num>0&&num<256&&sub[0]!='0';
            if(isValidateNonZero||isValidateZero){
                let tpath = path.length?`${path}.${sub}`:sub;
                dfs(s.substr(i),tpath,depth+1,res);
            }
        }
    }
    let res = new Set();
    dfs(s,'',0,res);
    return [...res];
};