/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    let cache = new Map();
    var dsf = (n, k) => {
        let key = `${n}x${k}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        if (k == 1) {
            let result = [];
            for (let i = 1; i <= n; i++) {
                result.push([i]);
            }
            cache.set(key, result);
            return result;
        }

        let result = dsf(n - 1, k - 1).map(it => [...it, n]);
        if (n - 1 >= k) {
            let sub2 = dsf(n - 1, k).map(it => [...it]);
            result = [...result, ...sub2 || []];
        }
        cache.set(key, result);
        return result;
    }
    return dsf(n, k);
};