/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

///O(N^2lgN)
var threeSumClosest = function (nums, target) {
  let twoSum = new Map();
  let result = null;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let key = `${j}x${k}`;
        let sum = 0;
        if (!twoSum.has(key)) {
          twoSum.set(key, nums[j] + nums[k]);
        }
        sum = twoSum.get(key);
        let threesum = nums[i] + sum;
        if (threesum == target) {
          return threesum;
        } else if (result == null) {
          result = threesum;
        } else if (Math.abs(result - target) > Math.abs(threesum - target)) {
          result = threesum;
        }
      }
    }
  }
  return result;
};


///O(N^2)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let sorted = nums.sort((a, b) => a - b);
  let diff = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < sorted.length - 2; i++) {
    let lo = i + 1;
    let hi = sorted.length - 1;
    while (lo < hi) {
      let sum = sorted[i] + sorted[lo] + sorted[hi];
      if (Math.abs(target - sum) < Math.abs(diff)) {
        diff = target - sum;
      }
      if (sum < target) {
        lo++;
      } else {
        hi--;
      }

      if (diff == 0) {
        return target;
      }
    }
  }
  return target - diff;

};