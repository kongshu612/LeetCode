/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let nodes = [];
  let t = head;
  if (!head) {
    return head;
  }
  while (t.next != null) {
    nodes.push(t);
    t = t.next;
  }
  nodes.push(t);
  let len = nodes.length;
  if (len == 1) {
    return null;
  }
  if (n == 1) {
    nodes[len - 2].next = null;
    return head;
  } else if (n == len) {
    return nodes[1];
  } else {
    let pre = nodes[len - n - 1];
    let next = nodes[len - n + 1];
    pre.next = next;
    return head;
  }
};