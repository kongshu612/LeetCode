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
    let [h, cur, res] = [null, head, null];
    while (cur != null) {
        if (cur.next == null || cur.next.val != cur.val) {
            if (res == null) {
                res = cur;
                cur = cur.next;
                res.next = null;
            } else {
                res.next = cur;
                res = cur;
                cur = cur.next;
                res.next = null;
            }
            if (h == null) {
                h = res;
            }
        } else if (cur.next.val == cur.val) {
            let val = cur.val;
            while (cur != null && cur.val == val) {
                cur = cur.next;
            }
        }
    }
    return h;
};