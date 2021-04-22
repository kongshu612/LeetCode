/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
    if(!nums||!nums.length){
        return [];
    }
    nums=nums.sort((a,b)=>a-b);
    var getKey=(pre,num)=>{
        if(!pre||!pre.length){
            return `${num}`;
        }
        return `${pre}x${num}`;
    }
    let [pre,cur]=[[],[]];
    for(let i=0;i<nums.length;i++){
        if(i==0){
            cur.push({
                key:`${nums[0]}`,
                value:[[nums[0]]]
            });
            cur.push({
                key:'',
                value:[]
            });
        }else{
            let hash=new Set(pre.map(it=>it.key));
            cur=[...pre];
            for(let j=0;j<pre.length;j++){
                let key = getKey(pre[j].key,nums[i]);
                if(!hash.has(key)){
                    cur.push({
                        key:key,
                        value:[...pre[j].value,nums[i]]
                    });
                }
            }
        }
        pre=[...cur];
        cur=[];
    }
    return pre.map(it=>it.value);
};