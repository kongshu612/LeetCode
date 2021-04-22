/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    let result = null;
    let preLastNode = null;
    let cache = new Array(k);
    let count = 0;
    let cur = head;
    while (cur != null) {
        count = 0;
        while (cur != null && count < k) {
            cache[k - count - 1] = cur;
            cur = cur.next;
            count++;
        }
        if (count == k) {
            if (!result) {
                result = cache[0];
            }
            if (preLastNode) {
                preLastNode.next = cache[0];
            }
            for (let i = 0; i < count - 1; i++) {
                cache[i].next = cache[i + 1];
            }
            preLastNode = cache[count - 1];
            preLastNode.next = null;
        } else if (cur == null) {
            if (!result) {
                return head;
            }
            preLastNode.next = cache[k - 1];
        }
    }
    return result;

};