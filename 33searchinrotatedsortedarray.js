/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    function searchbydiv(nums, target, f, l) {
        if (f > l) return -1;
        if (f == l) {
            if (nums[f] == target) return f;
            return -1;
        }
        let mid = parseInt((f + l) / 2);
        if (nums[mid] >= target && nums[f] <= target) {
            return searchbydiv(nums, target, f, mid);
        }
        if (nums[mid + 1] <= target && target <= target[l]) {
            return searchbydiv(nums, target, mid + 1, l);
        }
        let op = searchbydiv(nums, target, f, mid);
        if (op != -1) {
            return op;
        }
        return searchbydiv(nums, target, mid + 1, l);
    }

    return searchbydiv(nums, target, 0, nums.length - 1);
};