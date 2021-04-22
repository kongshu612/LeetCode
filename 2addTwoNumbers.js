/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  function sum(left, right, base) {
    let res = 0;
    if (left) {
      res += left.val;
    }
    if (right) {
      res += right.val;
    }
    let node = new ListNode(res);
    if (base) {
      if (base.popup) {
        node.val += base.popup;
      }
      base.next = node;
    }
    if (node.val >= 10) {
      node.popup = parseInt(node.val / 10);
      node.val = node.val % 10;
    }
    return node;
  }
  let result = sum(l1, l2);
  let left = l1.next;
  let right = l2.next;
  let parent = result;
  while (left || right || parent.popup) {
    parent = sum(left, right, parent);
    left = left != null ? left.next : null;
    right = right != null ? right.next : null;
  }
  return result;
};