/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    let n = nums.length;
    if (n == 0) {
        return false;
    } else if (n == 1) {
        return nums[0] == target;
    } else if (n == 2) {
        return nums[0] == target || nums[1] == target;
    }
    let mid = parseInt(n / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);
    if (nums[mid] == target) {
        return true;
    } else {
        return search(left, target) || search(right, target);
    }
};