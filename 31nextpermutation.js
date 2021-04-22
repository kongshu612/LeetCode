/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let t;
    if (!nums || nums.length <= 1) {
        return;
    }
    if (nums.length == 2) {
        [t, nums[0], nums[1] = t] = [nums[0], nums[1]];
        return;
    }
    let len = nums.length;
    let j = len - 2;
    while (j >= 0) {
        let i = len - 1;
        while (i > j && nums[j] >= nums[i]) {
            i--;
        }
        if (i > j && nums[j] < nums[i]) {
            [t, nums[j], nums[i] = t] = [nums[j], nums[i]];
            let [l, r] = [j + 1, len - 1];
            while (l < r) {
                [t, nums[l], nums[r] = t] = [nums[l], nums[r]];
                l++;
                r--;
            }
            return;
        }
        j--;
    }
    if (j < 0) {
        let [l, r, t = 0] = [0, len - 1];
        while (l < r) {
            [t, nums[l], nums[r] = t] = [nums[l], nums[r]];
            l++;
            r--;
        }
    }
};