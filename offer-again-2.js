function test3(nums){
    if(!nums||!nums.length){
        return null;
    }
    let index=0;
    while(index<nums.length){
        while(nums[index]!=index){
            let d = nums[index];
            if(nums[d]==d){
                return d;
            }else{
                [nums[index],nums[d]]=[nums[d],nums[index]];
            }
        }
        index++;
    }
    return null;
}

function test4(nums,t){
    if(!nums||!nums.length||!nums[0]||!nums[0].length){
        return false;
    }
    var search=(x,y)=>{
        if(x>=nums.length||y<0){
            return false;
        }
        if(nums[x][y]==t){
            return true;
        }else if(nums[x][y]>t){
            return search(x,y-1);
        }else{
            return search(x+1,y);
        }
    }
    let [r,c]=[nums.length,nums[0].length];
    return search(0,c-1);
}

function test7(nums1,nums2){
    var rebuild=(s1,e1,s2,e2)=>{
        if(s1>e1||s2>e2){
            return null;
        }
        let dig = nums1[s1];
        let index = nums2.indexOf(dig);
        let root = {
            val:dig,
            left:null,
            right:null,
        }
        let [leftlen,rightlen] = [index-s2,e2-index];
        if(leftlen>0){
            root.left = rebuild(s1+1,s1+leftlen,s2,index-1);
        }
        if(rightlen>0){
            root.right = rebuild(s1+leftlen+1,e1,index+1,e2)
        }
        return root;
    }
    if(!nums1||!nums1.length||nums1.length!=nums2.length){
        return null;
    }
    return rebuild(0,nums1.length-1,0,nums2.length-1);
}

function test10(n){
    if(n<0){
        return null;
    }else if(n==0||n==1){
        return 1;
    }else{
        let [pre,cur,index]=[1,1,2];
        while(index<=n){
            [cur,pre]=[pre+cur,cur];
            index++;
        }
        return cur;
    }
}

function test11(nums){
    var search=(s,e)=>{
        if(s==e){
            return nums[s];
        }else if(e-s==1){
            return Math.min(nums[s],nums[e]);
        }
        else if(s>e){
            throw 'error';
        }else{
            let mid = parseInt((s+e)/2);
            let [l,m,r]=[nums[s],nums[mid],nums[e]];
            if(m>=r&&m<=l){
                return m;
            }else if(m>=r){
                return search(mid+1,e);
            }
            else{
                return search(s,mid);                
            }
        }
    }
    if(!nums||!nums.length){
        return null;
    }
    return search(0,nums.length-1);
}


function test14(n){
    if(n<=1){
        return null;
    }else if(n==2){
        return 1;
    }else if(n==3){
        return 2;
    }else{
        let tmp=[0,1,2,3];
        for(let i=4;i<=n;i++){
            let max=tmp[2];
            for(let j=2;j<=parseInt(i/2);j++){
                let t=tmp[j]*tmp[n-j];
                if(max<t){
                    max=t;
                }
            }
            tmp[i]=max;
        }
        return tmp[n];
    }
}

function test15(num){
    let count=0;
    while(num!=0){
        if(num&0x01==0x01){
            count++;
        }
        num=num>>>1;
    }
    return count;
}

function test15_2(num){
    let count=0;
    while(num!=0){
        count++;
        num=(num-1)&num;
    }
    return count;
}

function test29(nums){
    let [r,c]=[nums.length,nums[0].length];
    var print=(x,y,r,c)=>{
        if(r==0||c==0){
            return '';
        }else if(r==1){
            return nums[r].slice(y,y+c).join('');
        }else if(c==1){
            let result='';
            for(let i=x;i<x+r;i++){
                result+=nums[i][y];
            }
            return result;
        }else if(r==2){
            return nums[x].slice(y,y+c).join('')+
                nums[x+1].slice(y,y+c).reverse().join('');
        }else if(c==2){
            let result=`${nums[x][y]}`;
            for(let j=x;j<x+r;j++){
                result+=`${nums[j][y+1]}`;
            }
            if(x+r-1!=x){
                result+=`${nums[x+r-1][y]}`;
            }            
            for(let j=x+r-2;j>x;j--){
                result+=`${nums[j][y]}`;
            }
            return result;
        }else{
            let result ='';
            for(let j=y;j<y+c;j++){
                result+=`${nums[x][j]}`;
            }
            for(let i=x+1;i<x+r;i++){
                result+=`${nums[i][y+c-1]}`;
            }
            for(let j=y+c-2;j>=y;j--){
                result+=`${nums[x+r-1][j]}`;
            }
            for(let i=x+r-2;i>x;i--){
                result+=`${nums[i][y]}`;
            }
            return result+print(x+1,y+1,r-2,c-2);
        }
    }

    return print(0,0,r,c);
}

function test36(root){
    let stack=[];
    let node = root;
    let pre=null;
    let head=null;
    while(node!=null){
        stack.push(node);
        node=node.left;
    }
    while(stack.length>0){
        node = stack.pop();
        if(pre==null){
            pre=node;
            head=node;
        }else{
            pre.right=node;
            node.left=pre;
            pre=node;
        }
        node=node.right;
        while(node!=null){
            stack.push(node);
            node=node.left;
        }
    }
    return head;
}

function test48(strs){
    let cache = new Map();
    let [p1,p2,maxlength]=[0,1,1];
    cache.set(strs[0],0);
    while(p2<strs.length){
        let c = strs[p2];
        if(cache.has(c)&&cache.get(c)>=p1){
            let len = p2-p1;
            if(len>maxlength){
                maxlength=len;
            }
            p1=cache.get(c)+1;
            cache.set(c,p2);
            p2++;            
        }else{
            cache.set(c,p2);
            p2++;
            let len = p2-p1;
            if(len>maxlength){
                maxlength=len;
            }
        }        
    }
    return maxlength;
}