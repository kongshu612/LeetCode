/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  var moveToTail = (pre, cur, tail) => {
    if (pre == null) {
      tail.next = cur;
      cur = cur.next;
      tail = tail.next;
      tail.next = null;
      return {
        pre: null,
        cur: cur,
        tail: tail,
      };
    } else if (cur == tail) {
      return {
        pre: cur,
        cur: null,
        tail: cur,
      };
    }
    pre.next = cur.next;
    tail.next = cur;
    cur.next = null;
    return {
      pre: pre,
      cur: pre.next,
      tail: cur,
    };
  };

  if (head == null) {
    return head;
  }
  let [pre, cur, tail, len] = [null, head, head, 1];
  while (tail.next != null) {
    tail = tail.next;
    len++;
  }
  for (let i = 0; i < len; i++) {
    if (cur.val >= x) {
      let pos = moveToTail(pre, cur, tail);
      cur = pos.cur;
      tail = pos.tail;
      pre = pos.pre;
      if (pre == null) {
        head = cur;
      }
    } else {
      pre = cur;
      cur = cur.next;
    }
  }
  return head;
};
