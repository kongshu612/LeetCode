/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    let [s, dic, len] = [null, new Set(), 0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0 && !dic.has(nums[i])) {
            dic.add(nums[i]);
            len++;
            if (s == null || s > nums[i]) {
                s = nums[i];
            }
        }
    }
    let i = 0;
    let accur = s;
    if (s > 1 || s == null) {
        return 1;
    }
    while (i < len) {
        accur++;
        if (!dic.has(accur)) {
            return accur;
        } else {
            i++;
        }
    }
    return accur;

};