/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    if (!nums || nums.length == 0) {
        return 0;
    }
    if (nums.length == 1) {
        return nums[0] == val ? 0 : 1;
    }
    let totallength = nums.length;
    let count = 0;
    for (let i = 0; i < totallength - count; i++) {
        if (nums[i] == val) {
            let index = totallength - count - 1;
            while (nums[index] === val && index > i) {
                count++;
                index--;
            }
            if (index <= i) {
                return totallength - count - 1;
            }
            let t = nums[i];
            nums[i] = nums[index];
            nums[index] = t;
            count++;
        }
    }
    return totallength - count;
};