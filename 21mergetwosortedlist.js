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
var mergeTwoLists = function (l1, l2) {
  let head;
  let cur;
  let [f, s] = [l1, l2];
  if (!f && !s) {
    return null;
  } else if (!f) {
    return s;
  } else if (!s) {
    return f;
  }
  if (f.val < s.val) {
    head = f;
    f = f.next;
    cur = head;
  } else {
    head = s;
    s = s.next;
    cur = head;
  }
  while (f && s) {
    if (f.val < s.val) {
      cur.next = f;
      cur = f;
      f = f.next;
    } else {
      cur.next = s;
      cur = s;
      s = s.next;
    }
  }
  if (!f && !s) {
    return head;
  } else if (!f) {
    cur.next = s;
  } else if (!s) {
    cur.next = f;
  }

  return head;
};