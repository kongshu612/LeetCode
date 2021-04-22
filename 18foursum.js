/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums = nums.sort((a, b) => a - b);
  if (!nums || nums.length < 4) {
    return [];
  }
  let results = [];
  for (let i = 0; i < nums.length - 3; i++) {
    let remaining = target - nums[i];
    let tmpResult = threeSum(nums.filter((it, index) => index > i), remaining);
    if (tmpResult && tmpResult.length > 0) {
      tmpResult.forEach(it => {
        results.push([nums[i], ...it]);
      })
    }
  }

  if (results.length <= 0) {
    return [];
  }

  let distinct = new Set();
  let finalResult = [];
  for (let i = 0; i < results.length; i++) {
    let each = results[i];
    let key = `${each[0]}x${each[1]}x${each[2]}x${each[3]}`;
    if (!distinct.has(key)) {
      finalResult.push(each);
      distinct.add(key);
    }
  }

  return finalResult;

  function threeSum(nums, target) {
    if (nums.length < 3) {
      return null;
    }
    let results = [];
    for (let i = 0; i < nums.length - 2; i++) {
      let [l, r] = [i + 1, nums.length - 1];
      while (l < r) {
        let sum = nums[i] + nums[l] + nums[r];
        if (sum < target) {
          l++;
        } else if (sum == target) {
          results.push([nums[i], nums[l], nums[r]]);
          l++;
          r--;
        } else {
          r--;
        }
      }
    }
    return results;
  }

};