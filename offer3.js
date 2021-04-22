// 3-5
function replaceSpace(str,len){
    let move=0;
    for(let i=0;i<len;i++){
        if(str[i]==' '){
            move+=2;
        }
    }
    for(let j=len-1;j>=0;j--){
        if(str[j]!=' '){
            str[j+move]=str[j];
        }
        else{
            str[j+move]='0';
            str[j+move-1]='2';
            str[j+move-2]='%';
            move-=2;
        }
    }
}

//3-6
function insertMerge(a,b,lena,lenb){   
    let [i,j,k]=[lena-1,lenb-1,lena+lenb-1];
    while(i>=0&&j>=0){
        if(a[i]>b[j]){
            a[k]=a[i];
            k--;
            i--;
        }else if(a[i]<b[j]){
            a[k]=b[j];
            k--;
            j--;
        }else{
            a[k]=b[j];
            a[k-1]=a[i];
            k--;
            i--;
            j--;
        }
    }
    while(i>=0){
        a[k]=a[i];
        k--;
        i--;
    }
    while(j>=0){
        a[k]=b[j];
        k--;
        j--;
    }
}


//3-6
function printLink(root){
    let stack=[];
    let node = root;
    while(node!=null){
        stack.push(node.val);
        node=node.next;
    }
    while(stack.length>0){
        console.log(stack.pop());
    }
}

function preOrder(root){
    let stack=[];
    let node = root;
    while(node!=null){
        stack.push(node);
        node=node.left;
    }
    while(stack.length>0){
        node=stack.pop();
        console.log(node.val);
        node=node.right;
        while(node!=null){
            stack.push(node);
            node=node.left;
        }
    }
}

function inOrder(root){
    let [stack,node]=[[],root];
    while(node!=null){
        console.log(node.val);
        stack.push(node);
        node=node.left;
    }
    while(stack.length>0){
        node = stack.pop();
        node=node.right;
        while(node!=null){
            console.log(node.val);
            stack.push(node);
            node=node.left;
        }
    }
}
function ReverseOrder(root){
    if(root.left!=null){
        ReverseOrder(root.left);
    }
    if(root.right!=null){
        ReverseOrder(root.right);
    }
    console.log(root.val);
}


function postOrderVisit(root){
    let stack=[];
    let node = root;
    while(node!=null){
        stack.push({n:node,isRightVisited:false});
        node=node.left;
    }
    while(stack.length>0){
        let n = stack[stack.length-1];
        if(n.isRightVisited){
            console.log(n.n.val);
            stack.pop();
        }
        else{
            n.isRightVisited=true;
            node = n.n.right;
            while(node!=null){
                stack.push({n:node,isRightVisited:false});
                node=node.left;
            }
        }
    }
}

function bfs(root){
    let stack=[];
    let node = root;
    stack.push(node);
    while(stack.length){
        node = stack.shift();
        if(node!=null){
            console.log(node.val);
            stack.push(node.left);
            stack.push(node.right);
        }
    }
}

//3-7
function rebuilBinaryTree(preOrder,midOrder){
    var rebuild=(pre,mid)=>{
        if(!pre||!pre.length){
            return null;
        }
        let root = {
            val:pre[0],
            left:null,
            right:null
        };
        if(pre.length==1){
            if(pre[0]!=mid[0]){
                throw 'error';
            }
            else{
                return root;
            }
        }
        let index = mid.indexOf(pre[0]);
        if(index<0){
            throw 'error';
        }
        let midleft = [...mid.slice(0,index)||[]];
        let midright = [...mid.slice(index+1)||[]];
        let preleft = [...pre.slice(1,1+midleft.length)||[]];
        let preright = [...pre.slice(1+midleft.length)||[]];

        root.left = rebuild(preleft,midleft);
        root.right=rebuild(preright,midright);
        return root;
    }
    return rebuild(preOrder,midOrder);
}

// 3-8
function findNext(node){
    // find first left child of right tree
    if(node.right!=null){
        let t=node.right;
        while(t.left!=null){
            t=t.left;
        }
        return t.val;
    }
    else{
        if(node.parent==null){
            return null;
        }else{
            let parent = node.parent;
            if(parent.left==node){
                return parent.val;
            }
            else{
                let grandparent = parent.parent;
                while(grandparent!=null&&grandparent.right==parent){
                    parent=grandparent;
                    grandparent=parent.parent;
                }
                return grandparent==null?null:grandparent.val;
            }
        }
    }
}

//3-9
class Queue{
    addStack=[];
    shiftStack=[];

    appendTail(val){
        this.addStack.push(val);
    }

    deleteHead(){
        if(!this.shiftStack.length){
            while(this.addStack.length>0){
                this.shiftStack.push(this.addStack.pop());
            }
        }        
        if(this.shiftStack.length>0){
            return this.shiftStack.pop();
        }else{
            return undefined;
        }
    }

    constructor(){
        this.addStack=[];
        this.shiftStack=[];
    }
}

//3-10
function Fibonacci(n){
    if(n<=0){
        return 0;
    }
    else if(n==1){
        return 1;
    }
    else{
        return Fibonacci(n-1)+Fibonacci(n-2);
    }
}

function Fi(n){
    if(n<=0){
        return 0;
    }
    else if(n==1){
        return 1;
    }
    else{
        let [pre,prepre]=[1,0];
        for(let i=0;i<n-1;i++){
            let t = pre+prepre;
            [prepre,pre]=[pre,t];
        }
        return pre;
    }
}

//4-2
function f(n){
    if(n<=0){
        return 0;
    }
    else if(n==1){
        return 1;
    }else if(n==2){
        return 2;
    }
    else{
        return f(n-1)+f(n-2);
    }
}

function ff(n){
    if(n<=0){
        return 0;
    }
    if(n==1){
        return 1;
    }else if(n==2){
        return 2;
    }
    else{
        let [pre,prepre]=[2,1];
        for(let i=0;i<n-2;i++){
            let t = pre+prepre;
            [prepre,pre]=[pre,t];
        }
        return pre;
    }
}

function quickSort(nums,length,start,end){
    var partial=(nums,length,start,end)=>{
        if(length<=0||start<0||end>=length||start>end){
            throw 'error';
        }
        let mid= parseInt((start+end)/2);
        let t = nums[mid];
        [nums[mid],nums[end]]=[nums[end],t];
        let cursor=start-1;
        for(let i=start;i<end;i++){
            if(nums[i]<nums[end]){
                cursor++;
                if(cursor!=i){
                    [t,nums[cursor],nums[i]=t]=[nums[cursor],nums[i]];
                }
            }
        }
        [t,nums[cursor],nums[end]]=[nums[cursor],nums[end],t];
        return cursor;
    }
    if(start==end){
        return;
    }
    let split = partial(nums,length,start,end);
    if(split>start){
        quickSort(nums,length,start,split-1);
    }
    if(split<end){
        quickSort(nums,length,split+1,end);
    }
}

//3-11
function findMin(nums){
    var search=(nums,start,end)=>{
        if(start>end){
            throw 'error';
        }
        else if(start==end){
            return nums[start];
        }
        else if(end-start==1){
            return Math.min(nums[start],nums[end]);
        }
        else if(end-start==2){
            return Math.min(nums[start],nums[start+1],nums[start+2]);
        }
        else{
            let mid=parseInt((start+end)/2);
            if(nums[start]>nums[mid]){
                return search(nums,start,mid);
            }else if(nums[mid+1]>nums[end]){
                return search(nums,mid+1,end);
            }
            else{
                return Math.min(search(nums,start,mid),search(nums,mid+1,end));
            }
        }
    }
    if(!nums||!nums.length){
        return undefined;
    }else if(nums.length==1){
        return nums[0];
    }
    return search(nums,0,nums.length-1);
}

function findMinIterate(nums){
    if(!nums||!nums.length){
        return undefined;
    }else if(nums.length==1){
        return nums[0];
    }
    let [left,right]=[0,nums.length-1];
    while(left<right){
        let mid=parseInt((left+right)/2);
        if(right-left==1){
            return Math.min(nums[left],nums[right]);
        }else if(right-left==2){
            return Math.min(nums[left],nums[left+1],nums[left+2]);
        }
        else if(nums[left]>nums[mid]||nums[right]>nums[mid]){
            right=mid;
        }else if(nums[right]<nums[mid]||nums[left]<nums[mid]){
            left=mid;
        }else{
            let t= nums[left];
            for(let i=left;i<=right;i++){
                if(nums[i]<t){
                    t=nums[i];
                }
            }
            return t;
        }
    }
    return nums[left];
}


//3-12
function findPath(nums,s){
    var isPathExist=(p,x,y,blacklist)=>{
        if(!p||!p.length){
            return true;
        }
        if(x<0||x>=nums.length||y<0||y>=nums[0].length){
            return false;
        }
        let key = `${x}x${y}`;
        if(blacklist.indexOf(key)>=0){
            return false;
        }
        if(nums[x][y]!=p[0]){
            return false;
        }else if(p.length==1&&nums[x][y]==p[0]){
            return true;
        }else{
            let [left,bottom,right,top]=[
                {x:x,y:y-1},
                {x:x+1,y:y},
                {x:x,y:y+1},
                {x:x-1,y:y},
            ];
            return isPathExist(p.substr(1),left.x,left.y,[...blacklist||[],key])||
            isPathExist(p.substr(1),bottom.x,bottom.y,[...blacklist||[],key])||
            isPathExist(p.substr(1),right.x,right.y,[...blacklist||[],key])||
            isPathExist(p.substr(1),top.x,top.y,[...blacklist||[],key]);            
        }
    }
    if(!s||!s.length){
        return true;
    }
    if(!nums||!nums.length||!nums[0].length){
        return false;
    }
    for(let i=0;i<nums.length;i++){
        for(let j=0;j<nums[0].length;j++){
            if(nums[i][j]==s[0]&&isPathExist(s,i,j,[])){
                return true;
            }
        }
    }
    return false;
}

//3-13
function findRobotBlocks(m,n,k){
    let visitedPath=new Set();
    var isLessThan=(x,y)=>{
        let sum=0;
        while(x>0){
            sum+=x%10;
            x=parseInt(x/10);
        }
        while(y>0){
            sum+=y%10;
            y=parseInt(y/10);
        }
        return sum<=k;
    }
    var gotoNext=(x,y)=>{
        let key=`${x}x${y}`;
        if(x>=0&&x<m&&y>=0&&y<n&&!visitedPath.has(key)&&isLessThan(x,y)){
            visitedPath.add(key);
            return 1 +
            gotoNext(x-1,y)+
            gotoNext(x,y-1)+
            gotoNext(x+1,y)+
            gotoNext(x,y+1); 
        }else{
            return 0;
        }
    }
    return gotoNext(0,0,[]);
}

function findRobotNext(m,n,k){
    var isLessThan=(x,y)=>{
        let sum=0;
        while(x>0){
            sum+=x%10;
            x=parseInt(x/10);
        }
        while(y>0){
            sum+=y%10;
            y=parseInt(y/10);
        }
        return sum<=k;
    }
    let count=0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(isLessThan(i,j)){
                count++;
            }
        }
    }
    return count;
}

//14
function find14(n,m){
    let cache = new Map();
    var finder=(n,m)=>{
        if(n<m){
            return 0;
        }
        let key=`${n}x${m}`;
        if(cache.has(key)){
            return cache.get(key);
        }
        if(m==1){
            cache.set(key,n);
            return n;
        }else if(n==m){
            cache.set(key,1);
            return 1;
        }
        let result = 0;
        for(let i=1;i<=n-m+1;i++){
            let t = i*finder(n-i,m-1);
            if(t>result){
                result=t;
            }
        }
        cache.set(key,result);
        return result;
    }
    if(n<=0||m<=0){
        return 0;
    }
    return find14(n,m);
}

function find14_2(n){
    if(n==2){
        return 1;
    }
    let cache=[0,1,2];
    for(let i=3;i<=n;i++){
        let result=0;
        for(let t=1;t<i;t++){
            let eachResult = t*cache[i-t];
            if(eachResult>result){
                result=eachResult;
            }
        }
        if(i<n&&result<i){
            result=i;
        }
        cache.push(result);
    }
    return cache[n];
}

//15
function test15(n){
    let [count,flag]=[0,1];
    while(flag!=0){
        if(n&flag){
            count++;
        }
        flag=flag<<1;
    }
    return count;
}

function test15_2(n){
    let count=0;
    while(n){
        count++;
        n=(n-1)&n;
    }
    return count;
}

//16
function test16(base,exponent){
    if(base==0){
        return 0;
    }
    if(exponent<0){
        base=1/base;
        exponent=-exponent;
    }
    let result=1;
    for(let i=1;i<=exponent;i++){
        result*=base;
    }
    return result;
}

//17
function test17(n){
    var increase=(s)=>{
        let len = s.length;
        let [index,digit]=[len-1,s[len-1]-'0'];
        while(index>0){
            digit++;
            if(digit==10){
                s[index]='0';
                index--;
                digit=s[index]-'0';
            }else{
                s[index]=`${digit}`;
                break;
            }
        }
        if(index==0){
            if(digit==9){
                s[0]='0';
                s.splice(0,0,'1');
            }else{
                s[0]=`${digit+1}`;
            }
        }
    }
    let s=['1'];
    while(s.length<=n){
        console.log(s.join(''));
        increase(s);
    }
}

//18
function test18(root,node){    
    if(node.next!=null){
        node.val=node.next.val;
        node.next=node.next.next;
        return root;
    }else{
        let cursor=root;
        if(root==node){
            return null;
        }
        while(cursor.next!=node){
            cursor=cursor.next;
        }
        cursor.next=null;
        return root;
    }
}


function test18_2(root){
    let [cursor,resultCursor]=[root,root];
    while(cursor!=null){        
        while(cursor.next!=null&&cursor.next.val==cursor.val){
            cursor=cursor.next;
        }
        cursor=cursor.next;
        resultCursor.next=cursor;
        resultCursor=resultCursor.next;
    }
    return root;
}


//19
function test19(s,p){
    var isMatch=(s,p)=>{
        if(!p||!p.length){
            return !s||!s.length;
        }
        else if(!s||!s.length){
            if(p.length==1||p[1]!='*'){
                return false;
            }else{
                return isMatch(s,p.substr(2));
            }
        }
        else if(s.length==1&&p.length==1){
            return p[0]=='.'||s[0]==p[0];
        }
        //p.length>2
        if(p.length>=2&&p[1]=='*'){
            return isMatch(s,p.substr(2))||(
                (
                    p[0]=='.'||
                    s[0]==p[0]
                )&&
                isMatch(s.substr(1),p));        
        }
        else{
            if(p[0]=='.'){
                return isMatch(s.substr(1),p.substr(1));
            }else{
                return s[0]==p[0]&&isMatch(s.substr(1),p.substr(1));
            }
        }
    }
    if(p.length>0&&p[0]=='*'){
        throw 'error regular expression';
    }
    return isMatch(s,p);
}

//20
function test20(str){
    var isUnsignedInt=(str)=>{
        if(!str||!str.length){
            return false;
        }
        for(let i=0;i<str.length;i++){
            if(str[i]-'0'>9||str[i]-'0'<0){
                return false;
            }
        }
        return true;
    }
    var isbaseUnsignedDigit = (str)=>{
        if(!str||!str.length){
            return false;
        }
        if(str[0]=='+'||str[0]=='-'){
            str=str.substr(1);
            if(!str||!str.length){
                return false;
            }
        }
        let tmp = str.split('.');
        if(tmp.length>2){
            return false;
        }else if(tmp.length==2){
            return isUnsignedInt(tmp[0])&&isUnsignedInt(tmp[1]);
        }else{
            return isUnsignedInt(tmp[0]);
        }
    }
    
    let tmp = str.replace('E','e').split('e');
    if(tmp.length>2){
        return false;
    }else if(tmp.length==1){
       return isbaseUnsignedDigit(tmp[0]);       
    }else{
        let [base,exponent] =[tmp[0],tmp[1]];
        if(isbaseUnsignedDigit(base)){
            if(!exponent||!exponent.length){
                return false;
            }
            if(exponent[0]=='+'||exponent[0]=='-'){
                exponent=exponent.substr(1);
                if(!exponent||!exponent.length){
                    return false;
                }
            }
            return isUnsignedInt(exponent);
        }
        return false;
    }
}

//21
function test21(nums){
    if(!nums||!nums.length||nums.length==1){
        return;
    }
    let [left,right,tmp]=[0,nums.length-1];
    while(left<right){
        while(nums[left]%2==1&&left<right){
            left++;
        }
        if(left>=right){
            break;
        }
        while(nums[right]%2==0&&right>left){
            right--;
        }        
        if(left<right){
            [tmp,nums[right],nums[left]=tmp]=[nums[right],nums[left]];
        }else{
            break;
        }
    }
}

//22
function test22(root,k){
    if(root==null){
        return null;
    }
    let [nodes,cursor]=[[],root];
    while(cursor!=null){
        nodes.push(cursor);
        cursor=cursor.next;
    }
    let len = nodes.length;
    if(len-k<0){
        return null;
    }
    return nodes[len-k]; 
}

function test22_1(root,k){
    if(root==null){
        return null;
    }
    let [pre,cur,count]=[root,root,1];
    while(count<k&&cur!=null){
        cur=cur.next;
        count++;
    }
    if(count<k){
        return null;
    }
    while(cur.next!=null){
        cur=cur.next;
        pre=pre.next;
    }
    return pre;
}

//23
function test23(root){
    let cache = new Set();
    let node = root;
    while(!cache.has(node)&&node!=null){
        node=node.next;
        cache.add(node);
    }
    return node;
}

function test23_2(root){
    var isCircleExist=(node)=>{
        if(!node||!node.next||!node.next.next){
            return null;
        }
        let [p1,p2]=[node.next,node.next.next];
        while(p1!=p2){
            if(p1.next==null||p2.next==null||p2.next.next==null){
                return null;
            }
            p1=p1.next;
            p2=p2.next.next;
        }
        return p1;
    }
    var calcualteCircureCount=(node)=>{
        let [t,count] = [node,1];
        node=node.next;
        while(node!=t){
            count++;
            node=node.next;
        }
        return count;
    }
    let node = isCircleExist(root);
    if(node){
        let count = calcualteCircureCount(node);
        let [p1,p2]=[root,root];
        for(let i=0;i<count;i++){
            p2=p2.next;
        }
        while(p1!=p2){
            p1=p1.next;
            p2=p2.next;
        }
        return p1;
    }
    return null;
}

//24
function test24(root){
    if(!root||!root.next){
        return root;
    }else if(!root.next.next){
        t=root.next;
        t.next=root;
        root.next=null;
        return t;
    }
    let [pre,cur,tmp]=[root,root.next];
    while(cur!=null){
        tmp=cur.next;
        cur.next=pre;
        pre=cur;
        cur=tmp;
    }
    return pre;
}

//25
function test25(first,second){
    let [f,s,r,root]=[first,second];
    if(!f){
        return s;
    }else if(!s){
        return f;
    }
    while(f!=null&&s!=null){
        if(f.val<s.val){
            if(!r){
                r=f;
                root=f;
            }else{
                r.next=f;
            }
            f=f.next;
        }else{
            if(!r){
                [r,root]=[s,s];
            }else{
                r.next=s;
            }
            s=s.next;
        }
    }
    if(!f){
        r.next=s;
    }else{
        r.next=f;
    }
    return root;
}

//26
function test26(treeA,treeB){
    var isSameTree = (a,b)=>{
        if(!a&&!b){
            return true;
        }else if(!a||!b){
            return false;
        }
        if(a.val!=b.val){
            return false;
        }
        return isSameTree(a.left,b.left)&&isSameTree(a.right,b.right);
    }
    if(!treeA){
        return !treeB;
    }
    let stack=[];
    stack.push(treeA);
    while(stack.length>0){
        let node = stack.shift();
        if(isSameTree(node,treeB)){
            return true;
        }
        if(node.left){
            stack.push(node.left);
        }
        if(node.right){
            stack.push(node.right);
        }
    }
    return false;
}



//27
function test27(root){
    let queue=[];
    if(!root){
        return root;
    }
    queue.push(root);
    while(queue.length>0){
        let node = queue.shift();
        let t= node.left;
        node.left=node.right;
        node.right=t;
        if(node.left){
            queue.push(node.left);
        }
        if(node.right){
            queue.push(node.right);
        }
    }
    return root;
}

//28
function test28(root){
    var getMirror=(root)=>{
        if(!root){
            return null;
        }
        let result={...root};
        let queue=[];
        queue.push({original:root,current:result});
        while(queue.length>0){
            let node = queue.shift();
            let left = node.original.left;
            let right = node.original.right;
            node.current.left={...left};
            node.current.right={...right};
            let t = node.current.left;
            node.current.left=node.current.right;
            node.current.right=t;
            if(left){
                queue.push({original:left,current:node.current.right});
            }
            if(right){
                queue.push({original:right,current:node.current.left});
            }
        }
        return result;
    }

    var isSameTree=(a,b)=>
    {
        if(!a&&!b){
            return true;
        }else if(!a||!b){
            return false;
        }
        if(a.val!=b.val){
            return false;
        }
        return isSameTree(a.left,b.left)&&isSameTree(a.right,b.right);
    }
    let t = getMirror(root);
    return isSameTree(root,t);
}

function test28_2(root){
    var isSameForMirroTree=(a,b)=>
    {
        if(!a&&!b){
            return true;
        }
        else if(!a||!b){
            return false;
        }
        if(a.val!=b.val){
            return false;
        }
        return isSameForMirroTree(a.left,b.right)&&isSameForMirroTree(a,right,b.left);
    }
    return isSameForMirroTree(root,root);
}

//29
function test29(nums){
    var print=(x,y,m,n)=>{
        let [i,j]=[x,y];
        while(j<y+n){
            console.log(nums[i][j]);
            j++;
        }
        j--;
        i++;
        while(i<x+m){
            console.log(nums[i][j]);
            i++;
        }
        i--;
        j--;
        while(j>=y&&m>1){
            console.log(nums[i][j]);
            j--;
        }
        j++;
        i--;
        while(i>x&&n>1){
            console.log(nums[i][j]);
            i--;
        }
    }
    if(!nums||!nums.length){
        return;
    }

    let [rows,cols]=[nums.length,nums[0].length];
    let [x,y]=[0,0];
    let [m,n]=[rows,cols];
    while(m>=0&&n>=0){
        print(x,y,m,n);
        m-=2;
        n-=2;
        x++;
        y++;
    }    
}

//30
function test30(){
    this.data=[];
    this.minstack=[];
    this.push=(val)=>{
        this.data.push(val);
        if(this.minstack.length==0){
            this.minstack.push(val);
        }else{
            let top = this.minstack[this.minstack.length-1];
            this.minstack.push(val<top?val:top);
        }
    }

    this.pop=()=>{
        this.minstack.pop();
        return this.data.pop();
    }

    this.min=()=>{
        if(this.minstack.length>0){
            return this.minstack[this.minstack.length-1];
        }else{
            return undefined;
        }
    }
}

//31
function test31(a,b){
    if(!a||!a.length){
        return !b||!b.length;
    }
    if(!b||!b.length){
        return false;
    }
    if(a.length!=b.length){
        return false;
    }
   let stack=[];
   let last=-1;
   for(let i=0;i<b.length;i++){
       if(stack.length>0&&stack[stack.length-1]==b[i]){
           stack.pop();
       }else{
        let index = a.indexOf(b[i]);
        if(index<=last){
            return false;
        }
        for(let j=last+1;j<index;j++){
            stack.push(a[j]);
        }
        last=index;
       }       
   }
   return true;
}

//32
function test32(root){
    if(!root){
        return;
    }
    let stack=[];
    stack.push(root);
    while(stack.length>0){
        let node = stack.shift();
        console.log(node.val);
        if(node.left){
            stack.push(node.left);
        }
        if(node.right){
            stack.push(node.right);
        }
    }
}

function test32_2(root){
    if(!root){
        return;
    }
    let stack=[];
    let last=0;
    let eachline='';
    stack.push({nodel:root,level:0});
    while(stack.length>0){
        let p=stack.shift();
        let current=p.level;
        let node = p.node;
        if(current!=last){
            console.log(eachline);
            eachline=`${node.val}`;
        }else{
            eachline=`${eachline},${node.val}`;
        }
        if(node.left){
            stack.push({node:node.left,level:current+1});
        }
        if(node.right){
            stack.push({node:node,level:current+1});
        }        
    }
    console.log(eachline);
}

function test32_3(root){
    if(!root){
        return;
    }
    let stack1=[];
    let stack2=[];
    stack1.push(root);
    while(true){
        let eachline='';
        while(stack1.length>0){
            let node = stack1.pop();
            if(!eachline||!eachline.length){
                eachline=`${node.val}`;
            }else{
                eachline=`${eachline},${node.val}`;
            }
            if(node.left){
                stack2.push(node.left);
            }
            if(node.right){
                stack2.push(node.right);
            }
        }
        console.log(eachline);
        eachline='';
        if(stack2.length==0){
            break;
        }
        while(stack2.length>0){
            let node = stack2.pop();
            if(!eachline||!eachline.length){
                eachline=`${node.val}`;
            }else{
                eachline=`${eachline},${node.val}`;
            }
            if(node.right){
                stack1.push(node.right);
            }
            if(node.left){
                stack1.push(node.left);
            }
        }
        console.log(eachline);
        if(stack1.length==0){
            break;
        }
    }
}

//33
function test33(nums){
    var isSearchTree=(start,end)=>{
        if(start>=end){
            return true;
        }
        let rootNode = nums[end];
        let split=-1;
        for(let i=start;i<end;i++){
            if(nums[i]>rootNode){
                split=i;
                break;
            }
        }
        if(split==-1){
            return isSearchTree(start,end-1);
        }else{
            for(let i=split;i<end;i++){
                if(nums[i]<=rootNode){
                    return false;
                }
            }
            return isSearchTree(start,split-1)&&isSearchTree(split,end-1);
        }        
    }
    if(!nums||!nums.length){
        return false;
    }
    if(nums.length==1){
        return true;
    }
    return isSearchTree(0,nums.length-1);
}

//34
function test34(root,target){
    var dfs=(node,pathes)=>{
        if(node.left!=null){
            dfs(node.left,[...pathes||[],node.val]);
            return;
        }
        if(node.right!=null){
            dfs(node.right,[...pathes||[],node.val]);
            return;
        }
        let sum =[...pathes||[],node.val].reduce((pre,cur)=>pre+cur,0);
            if(sum==target){
                console.log(pathes.join(','));
            }
    }

    if(root==null){
        return;
    }
    dfs(root,[]);
}

//35
function test35(root){
    var cloneLink = (root)=>{
        let [head,node]=[root,root];
        while(node!=null){
            let cloned = {...node};
            node.next=cloned;
            node = cloned.next;           
        }
        return head;
    }
    var cloneSibling=(root)=>{
        let node = root.next;
        while(node!=null){
            if(node.sibling!=null){
                node.sibling=node.sibling.next; 
            }
            node = node.next;
            if(node!=null){
                node = node.next;
            }
        }
    }
    var splitLink=(root)=>{
        let [phead,node] = [root.next,root];
        while(node!=null){
            let pnode = node.next;
            node.next=pnode.next;
            if(node.next!=null){
                pnode.next=node.next.next;
            }else{
                pnode.next=null;
            }
            node = node.next;
        }
        return phead;
    }
    if(root==null){
        return null;
    }
    let phead = cloneLink(root);
    cloneSibling(root);
    phead=splitLink(root);
    return phead;
}

//36
function test36(root){
    var inorder = (root)=>{
        let [phead,stack,node,pre]=[null,[],root,null];
        while(node!=null){
            stack.push(node);
            node=node.left;
        }
        while(stack.length>0){
            let node = stack.pop();
            if(pre==null){
                phead=node;
                phead.left=null;
            }else{
                pre.right=node;
                node.left=pre;
            }
            pre=node;
            node=node.right;
            while(node!=null){
                stack.push(node);
                node=node.left;
            }
        }
        pre.right=null;
        return phead;
    }
    if(root==null){
        return null;
    }
    return inorder(root);
}

//37
function serialize37(node,prefix){
    if(node==null){
        return '';
    }
    if(!prefix||!prefix.length){
        prefix=`${node.val}`;
    }else{
        prefix=`${prefix},${node.val}`;
    }
    if(node.left!=null){
        prefix=serialize37(node.left,prefix);
    }else{
        prefix=`${prefix},$`;
    }
    if(node.right!=null){
        prefix=serialize37(node.right,prefix);
    }else{
        prefix=`${prefix},$`;
    }
    return prefix;
}

function deserize37(str){
    if(!str||!str.length){
        return null;
    }
    let stack=[];
    let nodes=str.split(',');
    let node=null;
    let phead=null;
    for(let i=0;i<nodes.length;i++){
        if(nodes[i]=='$'){
            if(nodes[i-1]!='$'){
                node=stack.pop();
            }
            if(node.left===undefined){
                node.left=null;
            }
            else{
                node.right=null;
                node=stack.pop();
            }
        }else{
            let tmp={
                val:nodes[i],
                left:undefined,
                right:undefined
            }
            if(node!=null){
                if(node.left===undefined){
                    node.left=tmp;
                }else{
                    node.right=tmp;
                }
            }
            if(phead==null){
                phead=tmp;
            }
            stack.push(tmp);
            node=tmp;
        }
    }
    return phead;
}

//38
function test38(str){
    var dfs=(chars)=>{
        if(chars.length==1){
            return [...chars];
        }
        let result=[];
        for(let i=0;i<chars.length;i++){
            let c = chars[i];
            let remaining = chars.filter((it,index)=>index!=i);
            dfs(remaining).map(it=>[c,...it||[]])
                .forEach(it=>{
                    result.push(it);
                });            
        }
        return result;
    }
    if(!str||!str.length){
        return [];
    }
    let chars = str.split('');
    return dfs(chars);
}

//39
function test39(nums){
    if(!nums||!nums.length){
        return 0;
    }
    if(nums.length==1){
        return nums[0];
    }
    if(nums.length==2){
        return nums[0]!=nums[1]?0:nums[0];
    }
    let limit = parseInt(nums.length/2);
    var dfs = (s,e)=>{
        if(e-s<0){
            return 0;
        }
        let mid = parseInt((s+e)/2);
        let tmp=nums[mid];
        nums[mid]=nums[e];
        nums[e]=tmp;
        let split=s;
        for(let i=s;i<e;i++){
            if(nums[i]<nums[e]){
                if(split!=i){
                    tmp=nums[i];
                    nums[i]=nums[split];
                    nums[split]=tmp;   
                }             
                split++;
            }
        }
        [tmp,nums[split],nums[e]=tmp]=[nums[split],nums[e]];
        if(split<limit){
            return dfs(split+1,e);
        }else if(split>limit){
            return dfs(s,split-1);
        }else{
            let t = nums[split];            
            return nums.filter(it=>it==t).length>limit?
                t:0;
        }
    }
    return dfs(0,nums.length-1);
}

function test39_2(nums){
    if(!nums||!nums.length){
        return 0;
    }
    if(nums.length==1){
        return nums[0];
    }
    if(nums.length==2){
        return nums[0]!=nums[1]?0:nums[0];
    }
    let [pre,preCount]=[0,0];
    for(let i=0;i<nums.length;i++){
        if(preCount==0){
            pre=nums[i];
            preCount=1;
        }else{
            if(pre==nums[i]){
                preCount++;
            }else{
                preCount--;
            }
        }
    }
    return pre;
}

//40
function test40(nums,k){
    if(!nums||!nums.length||nums.length<=k){
        return nums;
    }
    var partial=(s,e,k)=>{
        if(e<s){
            throw 'exception';
        }
        let mid=parseInt((s+e)/2);
        let tmp = nums[mid];
        nums[mid]=nums[e];
        nums[e]=tmp;
        let split=s;
        for(let i=s;i<e;i++){
            if(nums[i]<=nums[e]){
                if(i!=split){
                    [tmp,nums[split],nums[i]=tmp]=[nums[split],nums[i]];
                }
                split++;
            }
        }
        [tmp,nums[split],nums[e]=tmp]=[nums[split],nums[e]];
        let [left]=[split-s];
        if(left>k){
            return partial(s,split-1,k);
        }else if(left==k||left==k-1){
            return;
        }else{
            k=k-left-1;
            return partial(split+1,e,k);
        }
    }
    partial(0,nums.length-1,k);
    return nums.filter((i,index)=>index<k);
}

// function test40_2(nums,k){
//     let [root,count,max]=[null,0,0];
//     var insert=(val)=>{
//         if(root==null){
//             root={
//                 val:val,
//                 left:null,
//                 right:null,
//             };
//             if(max<val){
//                 max=val;
//             }
//             count++;
//         }else{
//             let node = root;
//             while(true){
//                 if(node.val==val){
//                     return;
//                 }else if(node.val<val){
//                     if(node.right!=null){
//                         node=node.right;                        
//                         if(max<val){
//                             max=val;
//                         }
//                     }else{
//                         if(count<k){
//                             let tmp={
//                                 val:val,
//                                 left:null,
//                                 right:null,
//                             }
//                             if(max<val){
//                                 max=val;
//                             }
//                             node.right=tmp;
//                             count++;
//                             return;
//                         }else{ 
//                             if(val<max){
//                                 node.val=val;
//                             }                           
//                             return;
//                         }
//                     }                    
//                 }else{
//                     if(node.left!=null){
//                         node=node.left;
//                     }else{
//                         if(count<k){
//                             let tmp={
//                                 val:val,
//                                 left:null,
//                                 right:null,
//                             }
//                             node.left=tmp;
//                             count++;
//                             return;
//                         }else{
//                             node.val=val;
//                             return;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     var check=(val)=>{
//         if(root==null){
//             root={
//                 val:val,
//                 left:null,
//                 right:null,
//             };
//             if(max<val){
//                 max=val;
//             }
//             count++;
//         }else{
//             let node = root;
//             while(true){
//                 if(node.val==val){
//                     return;
//                 }else if(node.val<val){
//                     if(node.right!=null){
//                         node=node.right;                        
//                         if(max<val){
//                             max=val;
//                         }
//                     }else{
//                         if(count<k){
//                             let tmp={
//                                 val:val,
//                                 left:null,
//                                 right:null,
//                             }
//                             if(max<val){
//                                 max=val;
//                             }
//                             node.right=tmp;
//                             count++;
//                             return;
//                         }else{ 
//                             if(val<max){
//                                 node.val=val;
//                             }                           
//                             return;
//                         }
//                     }                    
//                 }else{
//                     if(node.left!=null){
//                         node=node.left;
//                     }else{
//                         if(count<k){
//                             let tmp={
//                                 val:val,
//                                 left:null,
//                                 right:null,
//                             }
//                             node.left=tmp;
//                             count++;
//                             return;
//                         }else{
//                             node.val=val;
//                             return;
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     var print=()=>{
//         if(root==null){
//             return null;
//         }
//         let [result,stack,node]=[[],[],root];
//         while(node!=null){
//             stack.push(node);
//             result.push(node.val);
//             node=node.left;
//         }
//         while(stack.length>0){
//             node = stack.pop();
//             if(node.right!=null){
//                 node=node.right;
//                 while(node!=null){
//                     stack.push(node);
//                     result.push(node.val);
//                     node=node.left;
//                 } 
//             }
//         }
//         return result;
//     }

//     for(let i=0;i<nums.length-1;i++){
//         check(nums[i]);
//     }
//     return print();
// }

//41
function test41(){

}

//42
function test42(nums){
    if(!nums||!nums.length){
        return 0;
    }
    let [sum,sums,len]=[-1,-1*(Number.MAX_VALUE+1),nums.length];
    for(let i=0;i<len;i++){
        if(sum<0){
            sum=nums[i];
        }else{
            sum+=nums[i];
        }
        if(sum>sums){
            sums=sum;
        }
    }
    return sums;
}

//43
function test43(n){
    if(n<=0){
        throw 'exception';
    }
    let nums=[];
    while(n>0){
        let t = n%10;
        nums.push(t);
        n=parseInt(n/10);
    }
    var dfs=(nums)=>{
        if(nums.length==1){
            if(nums[0]>=1){
                return 1;
            }else{
                return 0;
            }
        }
        let result =0;
        let len = nums.length;
        result+=dfs(nums.filter((it,index)=>index<len-1));
        if(nums[len-1]>1){
            result += Math.pow(10,len-1);
        }else if(nums[len-1]==1){
            let tmp=0;
            for(let j=0;j<len-1;j++){
                tmp += nums[j]*Math.pow(10,j);
            }
            result=result+tmp+1;
        }
        result = result + Math.pow(10,len-2)*(len-1)*nums[len-1]; 
        return result;       
    }
    
    return dfs(nums);
}

//44
function test44(n){
    if(n<0){
        throw 'exception';
    }
    if(n<10){
        return n;
    }
    let [i]=[2];
    n=n-9;
    while(n>Math.pow(10,i-1)*9*i){
        n=n-Math.pow(10,i-1)*9*i;
        i++;
    }
    let target = parseInt((n-1)/i)+Math.pow(10,i-1);
    let remaining=n%i;
    let nums=[];
    while(target>0){
        nums.push(target%10);
        target=parseInt(target/10);
    }
    let len = nums.length;
    return remaining==0?nums[0]:nums[len-remaining];
}

//45
function test45(nums){
    if(!nums||!nums.length){
        return null;
    }
    let strs=nums.map(it=>`${it}`);
    let sorted = strs.sort((a,b)=>{
        let [lena,lenb]=[a.length,b.length];
        for(let i=0;i<Math.min(lena,lenb);i++){
            if(a[i]<b[i]){
                return -1;
            }else if(a[i]>b[i]){
                return 1;
            }
        }
        if(lena==lenb){
            return -1;
        }else if(lena>lenb){
            return a[lenb]-a[0];
        }else{
            return b[lena]-b[0];
        }
    });
    return sorted.join('');
}

//46
function test46(num){
    let cache = new Map();

    var dfs=(nums)=>{
        let key = nums;
        if(cache.has(key)){
            return cache.get(key);
        }
        if(!nums||!nums.length){
            return [];
        }
        else if(nums.length==1){
            return [String.fromCharCode(parseInt(nums[0]))];
        }else{
            let result=[];
            let f= String.fromCharCode(parseInt(nums[0])+97);
            result = dfs(nums.substr(1))
                .map(it=>[f,...it]);
            let [fn,sn]=[parseInt(nums[0]),parseInt(nums[1])];
            let digit = 10*fn+sn;
            if(digit<26&&digit>9){
                let tmp = dfs(nums.substr(2));
                let pre=String.fromCharCode(digit+97);
                if(tmp.length>0){
                    for(let i=0;i<tmp.length;i++){
                        result.push([pre,...tmp[i]]);
                    }
                }else{
                    result.push([pre]);
                }
            }
            cache.set(key,result);
            return result;
        }
    }

    if(num<0){
        return 0;
    }
    let t = dfs(`${num}`);
    return t.length;
}

//47
function test47(nums){
    if(!nums||!nums.length||!nums[0].length){
        return 0;
    }
    let cache = new Map();
    let [tx,ty]=[nums.length-1,nums[0].length-1];
    var dfs=(x,y)=>{
        if(x>tx||y>ty){
            return 0;
        }
        let key = `${x}x${y}`;
        if(cache.has(key)){
            return cache.get(key);
        }
        if(x==tx){
            let tmp=0;
            for(let i=y;i<=ty;i++){
                tmp+=nums[x][i];
            }
            cache.set(key,tmp);
            return tmp;
        }else if(y==ty){
            let tmp=0;
            for(let i=x;i<=tx;i++){
                tmp+=nums[i][y];
            }
            cache.set(key,tmp);
            return tmp;
        }else{
            let tmp = Math.max(dfs(x+1,y),dfs(x,y+1));
            tmp+=nums[x][y];
            cache.set(key,tmp);
            return tmp;
        }
    }

    return dfs(0,0);
}

//48
function test48(strs){
    let cache = new Map();
    var dfs=(strs)=>{
        let key = strs;
        if(cache.has(key)){
            return cache.get(key);
        }
        if(!strs||!strs.length){
            return 0;
        }
        if(strs.length==1){
            return 1;
        }
        let f=strs[0];
        let dic= new Set().add(f);
        let count=1;
        for(let i=1;i<strs.length;i++){
            if(dic.has(strs[i])){
                break;
            }
            dic.add(strs[i]);
            count++;
        }
        let result = Math.max(count,dfs(strs.substr(1)));
        cache.set(key,result);
        return result;
    }
    return dfs(strs);
}

//49
function test49(n){
    let ugly=[1,2,3,4,5];
    if(n<=5){
        return ugly[n-1];
    }
    for(let i=6;i<=n;i++){
        let last = ugly[ugly.length-1];
        let tmp = [ugly.map(it=>it*2).find(it=>it>last),
            ugly.map(it=>it*3).find(it=>it>last),
            ugly.map(it=>it*5).find(it=>it>last)
        ]
        ugly.push(Math.min(...tmp));
    }
    return ugly[n-1];
}

//50
function test50(strs){
    let dic = new Map();
    let order=0;
    let queue=[];
    for(let i=0;i<strs.length;i++){
        let t = strs[i];
        if(dic.has(t)){
            dic.get(t).val++;
        }else{
            let tmp={
                content:t,
                val:1,
                order:order
            };
            queue.push(tmp);
            dic.set(t,tmp);
            order++;
        }
    }
    return queue.filter(it=>it.val==1).find(()=>true).content;
}

//51
function test51(nums){
    if(!nums||!nums.length){
        return 0;
    }
    let cache=new Set();
    let len = nums.length;    
    var search=(s)=>{
        let f = nums[s];
        let next=[];
        let count=0;
        for(let i=s+1;i<len;i++){
            if(nums[i]>=f){
                continue;
            }
            else{
                cache.add(i);
                next.push(i);
                count++;
            }
        }
        for(let i=0;i<next.length;i++){
            for(let j=i+1;j<next.length;j++){
                if(nums[next[i]]>nums[next[j]]){
                    count++;
                }
            }
        }
        return count;
    }
    let index=0;
    let count=0;
    while(index<len){
        count+=search(index);
        index++;
        while(index<len&&cache.has(index)){
            index++;
        }
    }
    return count;
}


//52
function test52(p1,p2){
    let [stack1,stack2]=[[],[]];
    let node=p1;
    while(node!=null){
        stack1.push(node);
        node=node.next;
    }
    node=p2;
    while(node!=null){
        stack2.push(node);
        node=node.next;
    }
    let pre,cur;
    while(stack1.length>0&&stack2.length>0){
        let cur1 = stack1.pop();
        let cur2=stack2.pop();
        if(cur1.val!=cur2.val){
            return pre;
        }else{
            pre=cur1;
        }
    }
    return pre;
}

//53
function test53_1(nums,k){
    var search=(s,e)=>{
        if(e<s){
            return 0;
        }
        else if(e==s){
            return nums[s]==k?1:0;
        }
        let mid= parseInt((s+e)/2);
        if(nums[mid]==k){
            let count=1;
            let i=mid-1;
            while(i>=0&&i<mid&&nums[i]==k){
                count++;
                i--;
            }
            i=mid+1;
            while(i<nums.length&&i>mid&&nums[i]==k){
                count++;
                i++;
            }
            return count;
        }else if(nums[mid]<k){
            return search(mid+1,e);
        }else{
            return search(s,mid-1);
        }
    }
    if(!nums||!nums.length){
        return 0;
    }
    return search(0,nums.length-1);
}

function test53_2(nums){
    var search=(s,e)=>{
        if(e<s){
            return s;
        }
        else if(s==e){
            return nums[s]==s?s+1:s;
        }
        let mid=parseInt((s+e)/2);
        if(nums[mid]==mid){
            if(nums[mid+1]!=mid+1){
                return mid+1;
            }
            else{
                return search(mid+1,e);
            }
        }
        else{
            return search(s,mid-1);
        }
    }
    if(!nums||!nums.length){
        return -1;
    }
    return search(0,nums.length-1);
}

//53_3
function test53_3(nums){
    var search=(s,e)=>{
        if(e<s){
            return null;
        }
        else if(s==e){
            return nums[s]==s?s:null;
        }
        let mid=parseInt((s+e)/2);
        if(nums[mid]==mid){
            return mid;
        }
        else if(nums[mid]<mid){
            return search(mid+1,e);
        }
        else{
            return search(s,mid-1);
        }
    }
    if(!nums||!nums.length){
        return null;
    }
    return search(0,nums.length-1);
}

//54
function test54(root,k){
    let result=[];
    let stack=[];
    let node=root;
    while(node!=null){
        stack.push(node);
        node=node.left;
    }
    while(stack.length>0){
        node=stack.pop();
        result.push(node.val);
        if(node.right!=null){
            node=node.right;
            while(node!=null){
                stack.push(node);
                node=node.left;
            }
        }
    }
    if(k>result.length){
        return null;
    }
    return result[k];
}

//55
function test55(root){
    let cache = new Map();

    var deepth = (root)=>{
        if(cache.has(root)){
            return cache.get(root);
        }
        let sub=0;
        if(root.left!=null){
            sub = deepth(root.left);
        }
        if(root.right!=null){
            let t = deepth(root.right);
            if(sub<t){
                sub=t;
            }
        }
        cache.set(root,sub+1);
        return sub+1;
    }
    if(root==null){
        return 0;
    }
    return deepth(root);
}

function test55_2(){

}

//56
function test56(nums){
    var findFirstone=(num)=>{
        let index=0;
        while((num&1)==0&&num>0){
            num=num>>1;
            index++;
        }
        return index;
    }
    var isBuffer1=(num,index)=>{
        return (num>>index)&1==1;
    }
    let t=0;
    for(let i=0;i<nums.length;i++){
        t^=nums[i];
    }
    let index=findFirstone(t);
    let [a1,a2]=[0,0];
    for(let i=0;i<nums.length;i++){
        if(isBuffer1(nums[i],index)){
            a1^=nums[i];
        }else{
            a2^=nums[i];
        }
    }
    return [a1,a2];
}

//56_2
function test56_2(nums){

}

//57
function test57(nums,k){
    if(!nums||!nums.length||nums.length==1){
        return null;
    }
    else if(nums.length==2){
        return nums[0]+nums[1]==k?[...nums]:null;
    }
    let [s,e]=[0,nums.length-1];
    let t = nums[s]+nums[e];
    while(s<=e){
        if(t==k){
            return [nums[s],nums[e]];
        }else if(t<k){
            s++;
        }else{
            e--;
        }
    }
    return null;
}

function test57_2(s){

}

//58
function test58(strs){
    let [s,e]=[0,strs.length-1];
    while(s<=e){
        let t = strs[s];
        strs[s]=strs[e];
        strs[e]=t;
        s++;
        e--;
    }
    s=0;
    e=0;
    let index=0;
    while(index<strs.length){
        [s,e]=[index];
        while(index<strs.length&&strs[index]!=' '){
            index++;
        }
        e=index-1;
        while(s<=e){
            let t=strs[s];
            strs[s]=strs[e];
            strs[e]=t;
            s++;
            e--;
        }
        index++;
    }
    console.log(strs.join(''));
}

function test58_2(strs,k){
    var reverse = (s,e)=>{
        while(s<=e){
            let t = strs[s];
            strs[s]=strs[e];
            strs[e]=t;
            s++;
            e--;
        }
    }
    if(!strs||!strs.length||k>strs.length||k<0){
        return;
    }
    let [s,e]=[0,strs.length-1];
    reverse(s,e);
    [s,e]=[0,strs.length-k-1];
    reverse(s,e);
    [s,e]=[strs.length-k,strs.length-1];
    reverse(s,e);
    console.log(strs.join(''));
}

//59
function test59(){
    this.data=[];
    this.max_array=[];
    this.push_back=(n)=>{
        this.data.push(n);
        while(this.max_array.length>0&&this.max_array[this.max_array.length-1]<n){
            this.max_array.pop();
        }
        this.max_array.push(n);      
    }
    this.pop_front=()=>{
        if(this.data.length>0){
            let n = this.data.shift();
            if(this.max_array.length>0){
                let f= this.max_array[0];
                if(n==f){
                    this.max_array.shift();
                }
            }
            
            return n;
        }else{
            return null;
        }
    }
    this.max=()=>{
        if(this.max_array.length>0){
            return this.max_array[0];
        }else{
            return null;
        }
    }
}

//60
function test60(n,s){
    let cache = new Map();
    var dfs=(n,s)=>{
        if(n<1){
            return 0;
        }else if(n==1){
            return s>0?1:0;
        }else{
            if(s<=0){
                return 0;
            }
            let key = `${n}x${s}`;
            if(cache.has(key)){
                return cache.get(key);
            }
            let result = dfs(n-1,s-1)+dfs(n-1,s-2)+dfs(n-1,s-3)+dfs(n-1,s-4)+dfs(n-1,s-5)+dfs(n-1,s-6);
            cache.set(key,result);
            return result;
        }
    }
    return dfs(n,s)/Math.pow(6,n);
}

//61
function test61(nums){
    if(!nums||!nums.length){
        return false;
    }
    let cache = new Set();
    let [stars,nonstars]=[[],[]];
    for(let i=0;i<nums.length;i++){
        if(nums[i]==0){
            stars.push(nums[i]);
        }else{
            if(cache.has(nums[i])){
                return false;
            }
            cache.add(nums[i]);
            nonstars.push(nums[i]);
        }
    }
    nonstars=nonstars.sort((a,b)=>a-b);
    let gap=0;
    for(let i=1;i<nonstars.length;i++){
        gap+=nonstars[i]-nonstars[i-1]-1;
    }
    return gap<=stars.length;
}

//62
function test62(n,k){
    var findlast = (nums,s,k)=>{
        if(nums.length==1){
            return nums[0];
        }
        let len = nums.length;
        let next = k;
        while(next>len){
            next-=len;
        }
        next = next+s-1;
        if(next>=len){
            next=next-len;
        }
        nums.splice(next,1);
        if(next==nums.length){
            next=0;
        }
        return findlast(nums,next,k);
    }
    if(n<=0||k<=0){
        return null;
    }
    let nums=[];
    for(let i=0;i<n;i++){
        nums.push(i);
    }
    return findlast(nums,0,k);
}

//63
function test63(nums){
    if(!nums||!nums.length||nums.length==1){
        return null;
    }
    let diff=[nums[0]];
    let lastmin=nums[0];
    for(let i=1;i<nums.length-1;i++){
        if(nums[i]<lastmin){
            lastmin=nums[i];
        }
        diff.push(lastmin);
    }
    let maxgap=null;
    for(let i=nums.length-1;i>=1;i--){
        let gap = nums[i]-diff[i-1];
        if(maxgap==null||maxgap<gap){
            maxgap=gap;
        }
    }
    return maxgap;
}

//64
function test64(){

}

function strToInt(strs){
    if(!strs||!strs.length){
        return 0;
    }
    let num=0;
    let isnegative=false;
    if(strs[0]=='+'){
        strs=strs.substr(1);
    }else if(strs[0]=='-'){
        isnegative=true;
        strs=strs.substr(1);
    }
    if(strs.length==0){
        return undefined;
    }
    strs=strs.trimStart('0');
    if(strs.length==0){
        return 0;
    }
    for(let i=0;i<strs.length;i++){
        let d = strs[i]-'0';
        if(d>=0&&d<10){
            num=num*10+d;
        }else{
            return undefined;
        }
    }
    if(isnegative){
        num=num*-1;
    }
    return num;

}

function test68(root,k,v){
    let [kpath,vpath]=[[],[]];
    var dfs=(root,pathes)=>{
        if(root.val==k){
            kpath=[...pathes,root];
        }else if(root.val==v){
            vpath=[...pathes,root];
        }else if(root.children!=null&&root.children.length>0){
            for(let i=0;i<root.children;i++){
                pathes.push(root.children[i]);
                dfs(root.children[i],pathes);
                pathes.pop();
            }
        }else{
            return;
        }
    }

    if(root==null){
        return undefined;
    }

    dfs(root,[]);

    let [klen,vlen]=[kpath.length,vpath.length];
    let [ik,iv,last]=[klen-1,vlen-1];
    while(ik>=0&&iv>=0&&kpath[ik]==kpath[iv]){
        last=kpath[ik];
        ik--;
        iv--;
    }
    return last;
}

