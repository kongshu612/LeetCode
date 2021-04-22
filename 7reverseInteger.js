/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x >= Math.pow(2, 31) || x < Math.pow(2, 31) * -1) {
    return 0;
  }
  isNegative = x < 0;
  x = Math.abs(x);
  let answer = 0;
  while (x > 0) {
    answer += x % 10;
    x = parseInt(x / 10);
    if (x != 0) {
      answer *= 10;
    }
  }
  answer = isNegative ? -1 * answer : answer;
  if (answer >= Math.pow(2, 31) || answer < Math.pow(2, 31) * -1) {
    return 0;
  } else {
    return answer;
  }
};