/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  let matrix = new Map();
  let i = 0;
  while (i < numRows) {
    matrix.set(i, []);
    i++;
  }
  let index = 0;
  let j = 0;
  while (index < s.length) {
    let i = 0;
    while (i < numRows) {
      if (index >= s.length) {
        break;
      }
      let bag = matrix.get(i++);
      bag[j] = s[index++];
    }
    if (index >= s.length) {
      break;
    }
    i -= 2;
    j++;
    while (i > 0) {
      if (index >= s.length) {
        break;
      }
      let bag = matrix.get(i--);
      bag[j++] = s[index++];
    }
    if (index >= s.length) {
      break;
    }
  }

  i = 0;
  let res = '';
  while (i < numRows) {
    res += matrix.get(i++).filter(it => it != undefined).join('');
  }
  return res
};