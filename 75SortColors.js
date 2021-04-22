/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let [l, r] = [0, nums.length - 1];
    let t = null;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 2 && i < r) {
            while (nums[r] == 2 && i < r) {
                r--;
            }
            if (i < r) {
                [t, nums[i], nums[r] = t] = [nums[i], nums[r]];
                r--;
                if (nums[i] == 0) {
                    i--;
                }
            }
        } else if (nums[i] == 0 && i > l) {
            while (nums[l] == 0 && l < i) {
                l++;
            }
            if (l < i) {
                [t, nums[i], nums[l] = t] = [nums[i], nums[l]];
                l++;
            }
        }
    }
};