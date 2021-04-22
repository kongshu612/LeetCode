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
var swapPairs = function (head) {
    if (!head || !head.next) {
        return head;
    }
    let result = null;
    let p = head;
    let pn = head.next;
    let pre = null;
    while (p && pn) {
        if (pre) {
            pre.next = pn;
        }
        if (!result) {
            result = pn;
        }
        p.next = pn.next;
        pn.next = p;
        pre = p;
        p = p.next;
        if (!p) {
            pn = null;
        } else {
            pn = p.next;
        }
    }
    return result;

};