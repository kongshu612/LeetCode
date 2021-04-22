/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {any[]} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let [stack,result] = [[],[]];  
    if(!root) {
        return [];
    }
    // function TreeNode(val, left, right) {
    //         this.val = (val===undefined ? 0 : val)
    //         this.left = (left===undefined ? null : left)
    //         this.right = (right===undefined ? null : right)
    //     }
    // rootNode=new TreeNode(root[0],null,null);
    // let nodes=[rootNode];
    // for(let i=1;i<root.length;i+=2){
    //     let [l,r]=[null,null];
    //     if(root[i]!=null){
    //         l=new TreeNode(root[i],null);            
    //     }
    //     if(i+1<root.length&&root[i+1]!=null){
    //         r=new TreeNode(root[i+1],null);
    //     }
    //     let p = nodes.shift();
    //     p.left=l;
    //     p.right=r;
    //     if(l!=null){
    //         nodes.push(l);
    //     }
    //     if(r!=null){
    //         nodes.push(r);
    //     }
    // }

    var pushinstoStack=(stack,node)=>{
        while(node.left!=null){
            stack.push(node);
            node=node.left;
        }
        stack.push(node);
    }

    pushinstoStack(stack,root);
    while(stack.length>0){
        let node =stack.pop();
        result.push(node.val);
        if(node.right!=null){
            pushinstoStack(stack,node.right);
        }
    }
    return result;
};