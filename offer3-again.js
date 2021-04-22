function findLastKNode(root,k){
    let [p1,p2]=[root,root];
    let count=1;
    if(!root||k<1){
        return null;
    }
    while(p1.next!=null&&count<k){
        p1=p1.next;
    }
    if(count<k){
        return null;
    }
    while(p1.next!=null){
        p1=p1.next;
        p2=p2.next;        
    }
    return p2;
}

function test3(nums){

    for(let i=0;i<nums.length;i++){
        let t = nums[i];
        if(t==i){
            continue;
        }
        if(nums[t]==t){
            return t;
        }else{
            nums[i]=nums[t];
            nums[t]=t;            
        }
    }
}

function test4(nums,target){
    let [m,n]=[nums.length,nums[0].length];
    var search=(x,y)=>{
        if(x>=m||y<0){
            return false;
        }
        if(nums[x][y]==target){
            return true;
        }else if(nums[x][y]<target){
            return search(x+1,y);
        }else{
            return search(x,y-1);
        }
    }
    return search(0,n-1);
}

function test9(){
    this.isrevert=false;
    this.queue1=[];
    this.queue2=[];
    this.push=(n)=>{
        if(this.isrevert){
            this.queue2.push(n);
        }else{
            this.queue1.push(n);
        }
    }
    this.pop=()=>{
        if(this.isrevert){
            if(this.queue2.length==0){
                return null;
            }
            while(this.queue2.length>1){
                let node = this.queue2.shift();
                this.queue1.push(node);
            }
            this.isrevert=!this.isrevert;
            return this.queue2.shift();
        }else{
            if(this.queue1.length==0){
                return null;
            }
            while(this.queue1.length>1){
                let node = this.queue1.shift();
                this.queue2.push(node);
            }
            this.isrevert=!this.isrevert;            
            return this.queue1.shift();
        }
    }
}

