/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let [result, sum] = [nums[0], 0];
    for (let i = 0; i < nums.length; i++) {
        let cur = nums[i];
        if (cur + sum < cur) {
            sum = cur;
        } else {
            sum += cur;
        }
        if (result < sum) {
            result = sum;
        }
    }
    return result;
};