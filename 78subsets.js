/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let cache = new Map();
    var dsf = (end) => {
        if (cache.has(end)) {
            return cache.get(end);
        }
        if (end == -1) {

            cache.set(end, [
                []
            ]);
            return [
                []
            ];
        }
        let sub = dsf(end - 1).map(it => [...it]);
        let sub2 = sub.map(it => [...it, nums[end]]);
        result = [...sub || [], ...sub2 || []];
        cache.set(end, result);
        return result;
    }
    return dsf(nums.length - 1);
};