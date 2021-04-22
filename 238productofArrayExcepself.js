/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    let res = [1];
    let product = 1;
    for (let i = 1; i < nums.length; i++) {
        product *= nums[i - 1];
        res.push(product);
    }
    product = 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        product *= nums[i + 1];
        res[i] = res[i] * product;
    }
    return res;
};