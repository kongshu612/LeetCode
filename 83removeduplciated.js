/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if (head == null) {
        return head;
    }
    let [h, cur, pre] = [head, head.next, head];
    while (cur != null) {
        if (cur.val != pre.val) {
            pre.next = cur;
            pre = cur;
        } else if (cur.next == null) {
            pre.next = null;
        }
        cur = cur.next;
    }
    return h;
};