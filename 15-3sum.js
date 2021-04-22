/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = [];
  let positive = new Map();
  let negative = new Map();
  let isZero = false;

  function gettwosums(map, sum) {
    let result = [];
    let middle = parseInt(sum / 2);
    for (let key of map.keys()) {
      if (key > middle) {
        continue;
      }
      let remaing = sum - key;
      if (map.has(remaing)) {
        if (key == remaing && map.get(key).length <= 1) {
          continue;
        }
        result.push([key, remaing]);
      }
    }
    return result;
  }

  for (let i = 0; i < nums.length; i++) {
    let absolute = Math.abs(nums[i]);
    if (absolute == 0) {
      isZero = true;
    } else if (nums[i] > 0) {
      if (!positive.has(absolute)) {
        positive.set(absolute, [absolute]);
      } else {
        let t = positive.get(absolute);
        positive.set(absolute, [...t, absolute]);
      }
    } else {
      if (!negative.has(absolute)) {
        negative.set(absolute, [absolute]);
      } else {
        let t = negative.get(absolute);
        negative.set(absolute, [...t, absolute]);
      }
    }
  };
  if (nums.filter(it => it === 0).length >= 3) {
    result.push([0, 0, 0]);
  }
  for (let key of positive.keys()) {
    if (isZero && negative.has(key)) {
      result.push([key, 0, key * -1]);
    }
    let sum = gettwosums(negative, key);
    if (sum.length > 0) {
      sum.forEach(each => {
        result.push([key, ...each.map(it => it * -1)]);
      });
    }
  }
  for (let key of negative.keys()) {
    let sum = gettwosums(positive, key);
    if (sum.length > 0) {
      sum.forEach(each => {
        result.push([key * -1, ...each]);
      });
    }
  }

  return result;
};