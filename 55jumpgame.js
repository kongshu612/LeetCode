/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    // //Solution1
    // let cache = new Set();
    // var dsf = (s) => {
    //     if (cache.has(s)) {
    //         return false;
    //     }
    //     if (s == nums.length - 1) {
    //         return true;
    //     }
    //     let max = nums[s];
    //     if (max == 0) {
    //         cache.add(s);
    //         return false;
    //     }
    //     for (let i = 1; i <= max && s + i < nums.length; i++) {
    //         if (dsf(s + i)) {
    //             return true;
    //         }
    //     }
    //     cache.add(s);
    //     return false;
    // }
    // return dsf(0);
};