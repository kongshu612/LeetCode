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
var rotateRight = function (head, k) {
    let [li, n, cur] = [
        [], 0, head
    ]
    while (cur != null) {
        li.push(cur);
        cur = cur.next;
        n++;
    }
    if (n <= 1) {
        return head;
    }
    k = k % n;
    if (k == 0) {
        return head;
    }
    let [i, j] = [n - k - 1, n - k];
    li[n - 1].next = li[0];
    li[i].next = null;
    return li[j];
};