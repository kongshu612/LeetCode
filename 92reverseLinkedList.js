/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    if(m==n){
        return head;
    }
    if(m==1){
        let [pre,current,count]=[head,head.next,2];
        while(count<=n){
            let tmp = current.next;
            current.next=pre;
            pre=current;
            current=tmp;
            count++;
        }
        head.next=current;
        return pre;
    }else{
        let [cur,count] = [head,1];
        while(count<m-1){
            cur=cur.next;
            count++;
        }
        let [last,sh,pre,current]=[cur,cur.next,cur.next,cur.next.next];
        count+=2;
        while(count<=n){
            let tmp = current.next;
            current.next=pre;
            pre=current;
            current=tmp;
            count++;
        }
        last.next=pre;
        sh.next=current;
        return head;
    }
    
};