/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    var movetoend = (index) => {
        for (let i = index + 1; i < nums.length; i++) {
            nums[i - 1] = nums[i];
        }
    }
    if (!nums || !nums.length) {
        return 0;
    }
    let finalLength = nums.length;
    let cur = nums[0];
    let count = 1;
    for (let i = 1; i < finalLength; i++) {
        if (nums[i] == cur && count < 2) {
            count++;
        } else if (nums[i] == cur && count == 2) {
            movetoend(i);
            finalLength--;
            i--;
        } else {
            cur = nums[i];
            count = 1;
        }
    }
    return finalLength;
};