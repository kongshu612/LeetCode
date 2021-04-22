/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (!nums || !nums.length) {
        return 0;
    } else if (nums.length == 1) {
        return 1;
    }
    let count = 1;
    let cur = nums[0];
    let movingForward = 0;
    let totallength = nums.length;
    for (let i = 1; i < totallength; i++) {
        if (nums[i] <= cur) {
            movingForward++;
        } else {
            cur = nums[i];
            nums[i - movingForward] = nums[i];
            count++;
        }
    }
    return count;
};