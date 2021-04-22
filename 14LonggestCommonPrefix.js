/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = '';
  let index = 0;
  if (!strs || strs.length == 0) {
    return ''
  }
  let minlength = strs.map(it => it.length).sort()[0];
  while (index < minlength) {
    let c = strs[0][index];
    if (strs.some(it => it[index] != c)) {
      return res;
    }
    res = `${res}${c}`;
    index++;
  }
  return res;
};