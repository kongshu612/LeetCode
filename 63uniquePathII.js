/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    let [m, n] = [obstacleGrid.length, obstacleGrid[0].length];
    let cache = new Map();
    var dsf = (r, c) => {
        let key = `${r}x${c}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        if (obstacleGrid[r][c] == 1) {
            cache.set(key, 0)
            return 0;
        }
        if (r == 0) {
            for (let i = 0; i <= c; i++) {
                if (obstacleGrid[0][i] == 1) {
                    cache.set(key, 0);
                    return 0;
                }
            }
            cache.set(key, 1);
            return 1;
        }
        if (c == 0) {
            for (let i = 0; i <= r; i++) {
                if (obstacleGrid[i][0] == 1) {
                    cache.set(key, 0);
                    return 0;
                }
            }
            cache.set(key, 1);
            return 1;
        }
        let result = 0;
        if (obstacleGrid[r - 1][c] == 0) {
            result += dsf(r - 1, c);
        }
        if (obstacleGrid[r][c - 1] == 0) {
            result += dsf(r, c - 1);
        }
        cache.set(key, result);
        return result;
    }
    return dsf(m - 1, n - 1);
};