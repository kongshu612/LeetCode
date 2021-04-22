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
 * @return {boolean}
 */
var isValidBST = function(root) {
    var dfs = (node,min,max)=>{        
        if(min!=null&&node.val<=min){
            return false;
        }else if(max!=null&&node.val>=max){
            return false;
        }
        let isValid=true; 
        if(node.left!=null&&node.left.val>=node.val){
            return false;
        }     
        if(node.right!=null&&node.right.val<=node.val) {
            return false;
        }
        if(node.left!=null){
            isValid = dfs(node.left,min,node.val);
            if(!isValid){
                return false;
            }
        }
        if(node.right!=null){
            isValid = dfs(node.right,node.val,max);
            if(!isValid){
                return false;
            }
        }
        return isValid;        
    }
    if(root==null){
        return true;
    }

    return dfs(root,null,null);
};