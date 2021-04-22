/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
    let errorNodes=[];
    let preNode=null;
    let stack=[];
    let node = root;
    while(node!=null){
        stack.push(node);
        node=node.left;
    }
    while(stack.length>0){
        let node = stack.pop();
        if(preNode!=null&&preNode.val>node.val){
            errorNodes.push({
                preNode:preNode,
                node:node
            });
        }
        preNode=node;
        node=node.right;
        while(node!=null){
            stack.push(node);
            node=node.left;
        }
    }
    if(errorNodes.length==2){
        let [f,l]=[errorNodes[0].preNode,errorNodes[1].node];
        let t = f.val;
        f.val=l.val;
        l.val=t;
    }
    else if(errorNodes.length==1){
        let t= errorNodes[0].preNode.val;
        errorNodes[0].preNode.val=errorNodes[0].node.val;
        errorNodes[0].node.val=t;
    }
};