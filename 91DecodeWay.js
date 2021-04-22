/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let cache = new Map();
    var isLegal=(s)=>{
        return s[0]=='1'||(s[0]=='2'&&parseInt(s[1])<=6);
    }
    var dfs = (s)=>{
        if(cache.has(s)){
            cache.get(s);
        }
        if(!s||!s.length||(s.length==1&&s[0]=='0')){
            return 0;
        }
        if(s.length==1){
            cache.set(s,1);            
            return 1;
        }else if(s.length==2){
            let count=0;
            if(s[0]!='0'){
                if(isLegal(s)&&s[1]!='0'){
                    count=2;
                }else if(s[1]!='0'||isLegal(s)){
                    count=1;
                }
            }
            cache.set(s,count);
            return count;
        }
        let firstOne = s[0];
        let firstTwo = s.substr(0,2);
        let count = 0;
        if(firstOne!='0'){
            count=dfs(s.substr(1));
        }
        if(isLegal(firstTwo)){
            count+=dfs(s.substr(2));
        }
        cache.set(s,count);
        return count;
    }

    var process = (s)=>{
        let res='';
        let last='';
        for(let i=0;i<s.length;i++){
            if(parseInt(s[i])>2&&i!=0&&parseInt(last)>2){
                continue;
            }
            res+=s[i];
            last=s[i];
        }
        return res;
    }
    return dfs(process(s));
};