/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits || !digits.length) {
    return [];
  }
  let cache = new Map();
  let dic = new Map()
    .set('2', ['a', 'b', 'c'])
    .set('3', ['d', 'e', 'f'])
    .set('4', ['g', 'h', 'i'])
    .set('5', ['j', 'k', 'l'])
    .set('6', ['m', 'n', 'o'])
    .set('7', ['p', 'q', 'r', 's'])
    .set('8', ['t', 'u', 'v'])
    .set('9', ['w', 'x', 'y', 'z']);

  let order = [digits];
  let split = 0;
  let str = '';
  let index = 0;
  while (index < order.length) {
    str = order[index];
    if (str.length > 1) {
      split = parseInt(str.length / 2);
      order.push(str.substring(0, split));
      order.push(str.substring(split));
    }
    index++;
  }
  for (let k = order.length - 1; k >= 0; k--) {
    let str = order[k];
    if (str.length == 1) {
      if (!cache.has(str)) {
        cache.set(str, dic.get(str));
      }
    } else {
      let split = parseInt(str.length / 2);
      let l = str.substring(0, split);
      let r = str.substring(split);
      let left = cache.get(l);
      let right = cache.get(r);
      let results = [];
      for (let i = 0; i < left.length; i++) {
        for (let j = 0; j < right.length; j++) {
          let tmp = `${left[i]}${right[j]}`;
          results.push(tmp);
        }
      }
      cache.set(str, [...new Set(results)]);
    }
  }
  return cache.get(digits);
};