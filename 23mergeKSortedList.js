/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists || !lists.length) {
    return null;
  }
  let head, cur;
  let bag = lists.filter(it => it != null);
  if (!bag || bag.length) {
    return null;
  }
  while (bag && bag.length > 1) {
    let [min, index] = [bag[0], 0];
    for (let i = 1; i < bag.length; i++) {
      if (bag[i].val < min.val) {
        min = bag[i];
        index = i;
      }
    }
    if (!head) {
      head = min;
    }
    if (!cur) {
      cur = min;
    } else {
      cur.next = min;
      cur = min;
    }

    if (min.next) {
      bag[index] = min.next;
    } else {
      bag = bag.filter((it, i) => index != i);
    }
  }

  if (bag.length == 1) {
    if (!cur) {
      return bag[0];
    } else {
      cur.next = bag[0];
    }
  }


  return head;

};