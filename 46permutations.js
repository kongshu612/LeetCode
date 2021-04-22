/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    if (nums.length == 2) {
        return [nums, [nums[1], nums[0]]];
    } else if (nums.length == 1) {
        return [nums];
    } else if (nums.length <= 0) {
        return [];
    }
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        let subnums = nums.filter(it => it != nums[i]);
        let subresult = permute(subnums).map(it => [nums[i], ...it]);
        result = [...result || [], ...subresult || []];
    }
    return result;
};