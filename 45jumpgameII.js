/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // if (!nums || !nums.length) {
    //     return 0;
    // }
    // let cache = new Map();

    // function search(s, nums) {
    //     if (cache.has(s)) {
    //         return cache.get(s);
    //     }
    //     if (s == nums.length - 1) {
    //         cache.set(s, 0);
    //         return 0;
    //     }
    //     let limit = nums[s];
    //     let totallen = nums.length;
    //     let subresults = [];
    //     for (let i = limit; i > 0; i--) {
    //         if (s + i < totallen) {
    //             subresults.push(search(s + i, nums));
    //         } else {
    //             continue;
    //         }
    //     }
    //     subresults = subresults.filter(it => it != null);
    //     if (subresults.length == 0) {
    //         cache.set(s, null);
    //         return null;
    //     }
    //     let min = subresults[0];
    //     for (let i = 1; i < subresults.length; i++) {
    //         if (min > subresults[i]) {
    //             min = subresults[i];
    //         }
    //     }
    //     let result = min + 1;
    //     cache.set(s, result);
    //     return result;
    // }
    // for (let i = nums.length - 1; i >= 0; i--) {
    //     search(i, nums);
    // }
    // return search(0, nums);
    let [stack, dp] = [
        [],
        []
    ];
    let n = nums.length;
    stack.push(n - 1);
    dp[n - 1] = 0;
    for (let i = n - 2; i >= 0; i--) {
        let temp = i + 1;
        while (stack.length > 0) {
            let pos = stack[stack.length - 1];
            if (i + nums[i] < pos) break;
            temp = pos;
            stack.pop();
        }
        dp[i] = dp[temp] + 1;
        stack.push(temp);
        stack.push(i);
    }
    return dp[0];
};