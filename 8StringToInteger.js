/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  str = str.trimStart(' ');
  let answer = 0;
  let isNegative = false;
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (i == 0) {
      if (c != '+' && c != '-' && (c < '0' || c > '9')) {
        return 0;
      } else if (c == '-') {
        isNegative = true;
        continue;
      } else if (c == '+') {
        continue;
      }
    }
    if (c >= '0' && c <= '9') {
      let d = c - '0';
      answer *= 10;
      answer += d;
    } else {
      break;
    }
  }
  answer = isNegative ? answer * -1 : answer;
  if (answer < Math.pow(2, 31) * -1) {
    return Math.pow(2, 31) * -1;
  } else if (answer > Math.pow(2, 31) - 1) {
    return Math.pow(2, 31) - 1;
  } else {
    return answer;
  }
};