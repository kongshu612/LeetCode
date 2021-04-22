function findDuplicate(nums){
    for(let i=0;i<nums.length;i++){
        while(nums[i]!=i){
            let t = nums[nums[i]];
            if(t==nums[i]){
                return t;
            }
            nums[nums[i]]=nums[i];
            nums[i]=t;
        }
    }
}