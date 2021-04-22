/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    let cache = new Map();
    var dsf = (r, c) => {
        let key = `${r}x${c}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        if (r == 1 || c == 1) {
            return 1;
        }
        let total = dsf(r - 1, c) + dsf(r, c - 1);
        cache.set(key, total);
        return total;
    }
    return dsf(m, n);
};