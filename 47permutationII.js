/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    function search(nums) {
        if (nums.length <= 0) {
            return [];
        } else if (nums.length == 1) {
            return [nums];
        } else if (nums.length == 2) {
            return [nums, [nums[1], nums[0]]];
        }
        let result = [];
        for (let i = 0; i < nums.length; i++) {
            let subnums = nums.filter((v, index) => index != i);
            let subresult = permuteUnique(subnums).map(it => [nums[i], ...it]);
            result = [...result || [], ...subresult || []];
        }
        return result;
    }
    let hash = new Set();
    let finalresult = [];
    let result = search(nums);
    for (let i = 0; i < result.length; i++) {
        let key = result[i].join('x');
        if (!hash.has(key)) {
            finalresult.push(result[i]);
            hash.add(key);
        }
    }
    return finalresult;


};