/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    let cache = new Map();
    var dsf = (m, n) => {
        let key = `${m}x${n}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = 0;
        if (m == 0) {
            for (let i = n; i >= 0; i--) {
                result += grid[0][i];
            }
            cache.set(key, result);
            return result;
        } else if (n == 0) {
            for (let i = m; i >= 0; i--) {
                result += grid[i][0];
            }
            cache.set(key, result);
            return result;
        }
        result = grid[m][n] + Math.min(dsf(m - 1, n), dsf(m, n - 1));
        cache.set(key, result);
        return result;
    }
    if (!grid || !grid.length) {
        return 0;
    }
    let [m, n] = [grid.length, grid[0].length];
    if (n == 0) {
        return 0;
    }
    return dsf(m - 1, n - 1);
};