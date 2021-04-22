/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let [f, s, i, t] = [1, 2, 3, 0];
  if (n == 1) {
    return 1;
  } else if (n == 2) {
    return 2;
  }
  while (i <= n) {
    t = f + s;
    f = s;
    s = t;
    i++;
  }
  return t;
};