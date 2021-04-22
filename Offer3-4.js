function find(nums,n){
    if(!nums||!nums.length||!nums[0].length){
        return false;
    }
    let [row,col]=[nums.length,nums[0].length];
    for(let i=0;i<row;i++){
        if(nums[i][0]==n||nums[i][col-1]==n){
            return true;
        }
        else if(nums[i][0]<n&&n<nums[i][col-1]){
            for(let j=0;j<col;j++){
                if(nums[i][j]==n){
                    return true;
                }
            }
        }
    }
    return false;
}


function find(nums,n){
    var search=(i,j)=>{
        if(i>=nums.length||j<0){
            return false;
        }
        if(nums[i][j]==n){
            return true;
        }
        else if(nums[i][j]>n){
            return search(i,j-1);
        }
        else{
            return search(i+1,j);
        }
    }
    if(!nums||!nums.length||!nums[0].length){
        return false;
    }
    return search(0,nums.length-1);
}