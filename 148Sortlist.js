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
var sortList = function (head) {
  function sortMerge(s1, s2) {
    if (!s1) return s2;
    if (!s2) return s1;
    if (s1.next) {
      s1 = sortlink(s1);
    }
    if (s2.next) {
      s2 = sortlink(s2);
    }
    let head, cur;
    while (s1 && s2) {
      if (s1.val <= s2.val) {
        if (!head) {
          head = s1;
        }
        if (!cur) {
          cur = s1;
        } else {
          cur.next = s1;
          cur = s1;
        }
        s1 = s1.next;
      } else {
        if (!head) {
          head = s2;
        }
        if (!cur) {
          cur = s2;
        } else {
          cur.next = s2;
          cur = s2;
        }
        s2 = s2.next;
      }
    }
    if (s1) {
      cur.next = s1;
    } else if (s2) {
      cur.next = s2;
    }
    return head;
  }

  function sortlink(s) {
    if (!s) return null;
    if (!s.next) return s;
    let l = s;
    let r = s.next;
    while (r && r.next) {
      l = l.next;
      r = r.next.next;
    }
    r = l.next;
    l.next = null;
    return sortMerge(s, r);
  }

  return sortlink(head);
};