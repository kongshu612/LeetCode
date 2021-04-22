/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (!nums || !nums.length) {
        return 0;
    }
    if (nums.length == 1) {
        return nums[0] < target ? 1 : 0;
    }
    if (nums[0] > target) {
        return 0;
    }
    if (nums[nums.length - 1] < target) {
        return nums.length;
    }
    let [l, r] = [0, nums.length - 1];
    while (true) {
        if (l > r) return nums[r] < target ? r + 1 : r;
        if (l == r) {
            return nums[l] < target ? l + 1 : l;
        }
        let mid = parseInt((l + r) / 2);
        if (nums[mid] < target) {
            if (l == mid) {
                return l + 1;
            }
            l = mid;
        } else if (nums[mid] == target) {
            return mid;
        } else {
            r = mid;
        }
    }
};