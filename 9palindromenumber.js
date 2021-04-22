/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  if (x == 0) {
    return true;
  }
  let original = [];
  let reverse = [];
  while (x > 0) {
    let d = x % 10;
    original = [...original, d];
    reverse = [d, ...reverse];
    x = parseInt(x / 10);
  }
  for (let i = 0; i < original.length; i++) {
    if (original[i] != reverse[i]) {
      return false;
    }
  }
  return true;
};