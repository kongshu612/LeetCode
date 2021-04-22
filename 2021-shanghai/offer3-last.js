//3-1
function getDuplicate(nums){
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
    return null;
}

//3-4
function checkNumberInArray(nums,target){
    let [m,n]=[nums.length,nums[0].length];
    function isExist(x,y,target){
        if(x==0){
            while(y>=0){
                if(nums[0][y]>target){
                    y--;
                }else if(nums[0][y]==target){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        }else if(y==0){
            while(x>=0){
                if(nums[x][0]>target){
                    x--;
                }else if(nums[x][0]==target){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        }else{
            if(nums[x][y]>target){
                return isExist(x-1,y,target)||isExist(x,y-1,target);
            }else if(nums[x][y]==target){
                return true;
            }else{
                return false;
            }
        }
    }
    return isExist(m-1,n-1,target);
}

//3-5
function replace35(str){
    let step=0;
    for(let i=0;i<str.length;i++){
        if(str[i]==' '){
            step+=2;
        }
    }
    for(let j=str.length-1;j>=0&&step>0;j--){
        if(str[j]!=' '){
            str[j+step]=str[j];
        }else{
            str[j+step]='0';
            str[j+step-1]='2';
            str[j+step-2]='%';
            step-=2;
        }
    }
    return str;
}

//3-6
function revertprint(node){
    let stack = [];
    while(node!=null){
        stack.push(node.val);
        node=node.next;
    }
    while(stack.length>0){
        console.log(stack.pop());
    }
}

function preOrder(node){
    let stack=[];
    let result=[];
    let cursor = node;
    while(cursor!=null){
        result.push(cursor.val);
        stack.push(cursor);
        cursor=cursor.left;
    }
    while(stack.length>0){
        cursor = stack.pop().right;
        while(cursor!=null){
            result.push(cursor.val);
            stack.push(cursor);
            cursor=cursor.left;
        }
    }
    return result;
}

function inOrder(node){
    let [result,stack,cursor]=[[],[],node];
    while(cursor!=null){
        stack.push(cursor);
        cursor=cursor.left;
    }
    while(stack.length>0){
        cursor=stack.pop();
        result.push(cursor.val);
        cursor=cursor.right;
        while(cursor!=null){
            stack.push(cursor);
            cursor=cursor.left;
        }
    }
    return result;
}

function postOrder(node){
    let [result,stack,cursor]=[[],[],node];
    while(cursor!=null){
        stack.push({node:cursor});
        cursor=cursor.left;
    }
    while(stack.length>0){
        cursornode = stack[stack.length-1];
        if(cursornode.isRightVisised){
            result.push(cursornode.node.val);
            stack.pop();
        }else{
            cursor = cursornode.node.right;
            cursornode.isRightVisised=true;
            while(cursor!=null){
                stack.push({node:cursor});
                cursor=cursor.left;
            }
        }
    }
}

function bfs(root){
    let [stack,result,cursor]=[[],[],root];
    if(cursor!=null){
        stack.push(cursor);
    }
    while(stack.length>0){
        cursor = stack.shift();
        result.push(cursor.val);
        if(cursor.left!=null){
            stack.push(cursor.left);
        }
        if(cursor.right!=null){
            stack.push(cursor.right);
        }
    }
    return result;
}

//3-7
function rebuildTree(preorder,inorder){
    if(preorder.length<=0||inorder.length<=0){
        return null;
    }
    let root={val:preorder[0]};
    let inIndex = inorder.indexOf(preorder[0]);
    let [leftinOrder,rightinOrder]=[inorder.slice(0,inIndex),inorder.slice(inIndex+1)];
    let [leftlength]=[leftinOrder.length];
    let [leftpreOrder,rightpreOrder]=[preorder.slice(1,leftlength+1),preorder.slice(leftlength+1)];
    root.left = rebuildTree([...leftpreOrder],[...leftinOrder]);
    root.right = rebuildTree([...rightpreOrder],[...rightinOrder]);
    return root;
}



//3-8
function findNext38(node){
    if(node.right!=null){
        let cursor = node.right;
        while(cursor.left!=null){
            cursor=cursor.left;
        }
        return cursor.val;
    }else{
        while(cursor.parent!=null&&cursor.parent.right==cursor){
            cursor=cursor.parent;
        }
        if(cursor.parent!=null){
            return cursor.parent.val;
        }else{
            return null;
        }
    }
}

//3-9
function queueSimulator39(){
    let [normal,reverse]=[[],[]]
    this.add=(num)=>{
        while(reverse.length>0){
            normal.push(reverse.pop())
        }
        normal.push(num);
    }
    this.shift=()=>{
        if(reverse.length>0){
            return reverse.pop();
        }else{
            while(normal.length>1){
                reverse.push(normal.pop());
            }
            return normal.pop();
        }
    }
}

//3-10
function findN310(n){
    if(n==0||n==1){
        return 1;
    }
    let [last,llast]=[1,1];
    for(let i=2;i<=n;i++){
        [last,llast]=[last+llast,last];
    }
    return last;
}

//3-11
function findMin311(nums){
    function findInArray(a,b){
        if(a==b){
            return nums[a];
        }else if(a==b-1){
            return Math.min(nums[a],nums[b]);
        }else if(b-a>1){
            let mid = Math.ceil((a+b)/2);
            return nums[a]>nums[mid]?findInArray(a,mid):findInArray(mid,b);
        }else{
            throw new TypeError('outof range');
        }
    }
    return findInArray(0,nums.length-1);
}

//3-12
function findPath312(str,nums){
    let [maxX,maxY]=[nums.length,nums[0].length];
    function find(str,x,y,visited){
        if(!str||!str.length){
            return true;
        }
        if(str[0]==nums[x][y]&&visited.findIndex(a=>a.x==x&&a.y==y)<0){
            let nextSteps = [
                {x,y:y-1},
                {x:x-1,y},
                {x,y:y+1},
                {x:x+1,y}
            ].filter(it=>it.x>=0&&it.x<maxX&&it.y>=0&&it.y<maxY);
            visited.push({x,y})
            for(let next of nextSteps){
                if(find(str.substring(1),next.x,next.y,visited)){
                    return true;
                }
            }
            visited.pop();
            return false;
        }else{
            return false;
        }
    }
    for(let x=0;x<nums.length;x++){
        for(let y=0;y<nums.length;y++){
            let visited=[];
            if(find(str,x,y,visited)){
                return visited;
            }
        }
    }
    return null;
}


//3-13
function robotPath313(nums,thread){
    let[maxX,maxY]=[nums.length,nums[0].length];
    function isLessThan(x,y,thread){
        let val = nums[x][y];
        let sum=0;
        while(val>0){
            sum+=val%10;
            val=Math.ceil(val/10);
        }
        return sum<=thread;
    }
    function countBlock(x,y,visited){
        let key = `${x}x${y}`;
        visited.add(key);
        let nextSteps = [
            {x,y:y-1},
            {x:x-1,y},
            {x,y:y+1},
            {x:x+1,y}
        ].filter(it=>!visited.has(`${it.x}x${it.y}`)&&
            it.x>=0&&
            it.x<maxX&&
            it.y>=0&&
            it.y<maxY&&
            isLessThan(it.x,it.y,thread));
        for(let next of nextSteps){
            countBlock(next.x,next.y,visited);
        }
    }
    let visited = new Set();
    countBlock(0,0,visited);
    return visited.length;
}

//3-14
function getMax314(n){
    let hash = new Map();
    function f(n){
        let key = `${n}`;
        if(hash.has(key)){
            return hash.get(key);
        }
        if(n<=1){
            return 0;
        }
        else{
            let result =0;
            for(let i=1;i<=n-1;i++){
                let tmp = f(i)*f(n-i);
                if(tmp>result){
                    result=tmp;
                }
            }
            hash.set(key,result);
            return result;
        }      
    }
    return f(n);
}

//3-15
function findOne315(num){
    let [count,bit]=[0,1];
    while(bit!=0){
        if((bit&num)==bit){
            count++;
        }
        bit=bit<<1;
    }
    return count;
}

//3-19
function regMatch319(str,p){
    function isMatch(str,p){
        if(str.length==p.length&&p.length==0){
            return true;
        }
        if((str.length==0&&p.length>0)||(str.length>0&&p.length==0)){
            return false;
        }
        if(p.length==1){
            return str.length==1&&(str[0]==p[0]||p[0]=='.');
        }
        if(p[1]=='*'){
            return isMatch(str,p.substring(2))||isMatch(str.substring(1),p)
        }else{
            return (str[0]==p[0]||p[0]=='.')&&isMatch(str.substring(1),p.substring(1));
        }
    }
    return isMatch(str,p);
}

//127
function findLastN322(head,k){
    let [f,l,count]=[head,head,0];
    while(count<k-1&&f!=null){
        f=f.next;
        count++;
    }
    if(f==null)return null;
    while(f.next!=null){
        f=f.next;
        l=l.next;
    }
    return l.val;
}

//142
function reverselink324(root){
    if(root==null){
        return null;
    }else if(root.next==null){
        return root;
    }else if(root.next.next==null){
        let [f,s]=[root,root.next];
        f.next=null;
        s.next=f;
        return s;        
    }
    let [f,s,t]=[root,root.next,root.next.next];
    root.next=null;
    while(s!=null){
        s.next=f;
        [f,s,t]=[s,t,t!=null?t.next:null];
    }
    return f;
}

function mergeorderlink325(node1,node2){
    let [f,s,root,current]=[node1,node2,null,null];

    while(f!=null&&s!=null){
        if(f.val>s.val){
            if(root==null){
                [root,current]=[s,s];
            }else{
                current.next=s;  
                current=s;              
            }
            s=s.next;
        }else{
            if(root==null){
                [root,current]=[f,f];
            }else{
                current.next=f;
                current=f;
            }
            f=f.next;
        }
    }
    while(f!=null){
        current.next=f;
        current=f;
        f=f.next;
    }
    while(s!=null){
        current.next=s;
        [current,s]=[s,s.next];
    }
    return root;
}

function isSubTree326(node1,node2){
    if(isEqual(node1,node2)){
        return true;
    }else{
        if(node1==null){
            return false;
        }
        return isSubTree(node1.left,node2)||
        isSubTree(node1.right,node2);
    }
    function isEqual(root1,root2){
        if(root1==root2==null){
            return true;
        }else if(root1==null&&root2!=null){
            return false;
        }else if(root2==null){
            return true;
        }
        else if(root1.val!=root2.val){
            return false;
        }
        return isEqual(root1.left,root2.left)&&
        isEqual(root1.right,root2.right);
    }
}

function mirror27(root){
    let queue=[];
    if(root!=null){
        queue.push(root);
    }
    while(queue.length>0){
        let node = queue.shift();
        [node.left,node.right]=[node.right,node.left];
        [node.left,node.right].filter(it=>it!=null)
            .forEach(it=>queue.push(it));
    }
    return root;
}

//159