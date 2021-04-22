/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    var dfs = (n,offset)=>{
        if(n==0){
            return [];
        }
        else if(n==1){
            return [new TreeNode(offset+n)];
        }
        let rootNodes=[];
        for(let i=1;i<=n;i++){            
            let leftNodes=dfs(i-1,offset);
            let rightNodes=dfs(n-i,i+offset);
            if(leftNodes.length==0){
                for(let r=0;r<rightNodes.length;r++){
                    let rootNode = new TreeNode(i+offset,null,rightNodes[r]);
                    rootNodes.push(rootNode);
                }                
            }
            else if(rightNodes.length==0){
                for(let r=0;r<leftNodes.length;r++){
                    let rootNode = new TreeNode(i+offset,leftNodes[r],null);
                    rootNodes.push(rootNode);
                }                
            }
            else{
                for(let l=0;l<leftNodes.length;l++){
                    for(let r=0;r<rightNodes.length;r++){
                        let rootNode = new TreeNode(i+offset,leftNodes[l],rightNodes[r]);
                        rootNodes.push(rootNode);
                    }
                }
            }            
        }
        return rootNodes;
    }

    return dfs(n,0);
};