/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  function findPalidrome(start, s, minLength) {
    let poses = [];
    for (let i = start; i < s.length; i++) {
      if (s[i] == s[start]) {
        poses.push(i);
      }
    }
    if (poses.length <= 1) {
      return {
        start: start,
        length: 1,
        next: start + 1,
      }
    }
    for (let j = poses.length - 1; j > 0; j--) {
      let end = poses[j];
      if (end - start + 1 < minLength) {
        return {
          start: 0,
          length: 0,
          next: start + 1,
        }
      }
      if (isPalindrome(s, start, end)) {
        return {
          start: start,
          length: end - start + 1,
          next: start + 1,
        }
      }
    }
    return {
      start: start,
      length: 1,
      next: start + 1,
    }

  }

  function isPalindrome(s, start, end) {
    let i = start;
    let j = end;
    while (i < j) {
      if (s[i] == s[j]) {
        i++;
        j--;
      } else {
        return false;
      }
    }
    return true;
  }

  if (!s || !s.length) return '';
  else if (s.length == 1) return s;

  let start = 0;
  let maxlength = 0;
  let ans = findPalidrome(start, s, maxlength);
  if (ans.length > maxlength) {
    maxlength = ans.length;
    start = ans.start;
  }
  while (ans.next < s.length) {
    ans = findPalidrome(ans.next, s, maxlength);
    if (ans.length > maxlength) {
      maxlength = ans.length;
      start = ans.start;
    }
  }
  if (maxlength == 0) {
    return '';
  } else {
    return s.substring(start, start + maxlength);
  }
};