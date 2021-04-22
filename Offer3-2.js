function findduplicate(nums){
    let len = nums.length;
    var search = (min,max)=>{
        if(min>max){
            return null;
        }else if(min==max){
            return min;
        }
        let mid = parseInt((min+max)/2);
        if(nums.filter(it=>it>=min&&it<=mid).length>(mid-min+1)){
            return search(min,mid);
        }else{
            return search(mid+1,max);
        }
    }
    return search(1,len);
}