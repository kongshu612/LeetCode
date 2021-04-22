/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  function findSubstring(s, start) {
    let charactMap = new Map();
    for (let i = start; i < s.length; i++) {
      let c = s[i];
      if (charactMap.has(c)) {
        let pos = charactMap.get(c);
        return {
          result: {
            index: start,
            length: i - start
          },
          next: pos + 1
        }
      } else {
        charactMap.set(c, i);
      }
    }
    return {
      result: {
        index: start,
        length: s.length - start
      },
      next: null
    };
  }
  let substringList = [];
  let start = findSubstring(s, 0);
  substringList.push(start.result);
  let nextIndex = start.next;
  while (nextIndex) {
    let lastrun = findSubstring(s, nextIndex);
    substringList.push(lastrun.result);
    nextIndex = lastrun.next;
  }
  let res = 0;
  substringList.forEach(it => {
    if (it.length > res) {
      res = it.length;
    }
  });
  return res;
};