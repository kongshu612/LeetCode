/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let open = ['(', '[', '{'];
  let stack = [];
  let pair = new Map().set(')', '(').set(']', '[').set('}', '{');
  if (!s || !s.length) {
    return true;
  }
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (open.indexOf(c) >= 0) {
      stack.push(c);
    } else {
      if (stack.length <= 0) {
        return false;
      }
      let last = stack[stack.length - 1];
      if (last != pair.get(c)) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length == 0;
};