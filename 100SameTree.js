/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    var gothrough = (node)=>{
        let stack = [];
        let it=node;
        let result='';
        while(it!=null){
            stack.push(it);
            it=it.left;
        }
        while(stack.length>0){
            it=stack.pop();
            result=`${result}${it.val}`;
            if(it.right!=null){
                it=it.right;
                while(it!=null){
                    stack.push(it);
                    it=it.left;
                }
            }
            else{
                result=`${result}null`;
            }
        }
        return result;
    }
    var bfs=(node)=>{
        let result='';
        let stack=[];
        let it=node;
        stack.push(it);
        while(stack.length>0){
            it=stack.shift();
            if(it!=null)
            {
                result=`${result}${it.val}`;
                stack.push(it.left);
                stack.push(it.right);
            }
            else{
                result=`${result}null`;
            }            
        }
        return result;
    }
    return gothrough(p)==gothrough(q)&&bfs(p)==bfs(q);
};