/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    let [pre,cur]=[[],[]];
    let [res0,res1,res2]=[[0],[0,1],[0,1,3,2]];
    if(n==0){
        return res0;
    }else if(n==1){
        return res1;
    }else if(n==2){
        return res2;
    }
    pre=[...res2];
    for(let i=3;i<=n;i++){
        cur=[...pre];
        for(let j=pre.length-1;j>=0;j--){
            cur.push(pre[j]+Math.pow(2,i-1));
        }
        pre=cur;
        cur=[];
    }
    return pre;
};