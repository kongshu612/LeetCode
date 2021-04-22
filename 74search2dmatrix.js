/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    if (!matrix || !matrix.length) {
        return false;
    }
    let [r, c] = [0, 0];
    let [m, n] = [matrix.length, matrix[0].length];
    if (m == 0 || n == 0) {
        return false;
    }
    if (target > matrix[m - 1][n - 1]) {
        return false;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (i == matrix.length - 1) {
            r = i;
            break;
        }
        if (matrix[i][0] <= target && matrix[i + 1][0] > target) {
            r = i;
            if (matrix[i][0] == target) {
                return true;
            }
            break;
        }
    }
    for (let j = 0; j < matrix[r].length; j++) {
        if (matrix[r][j] == target) {
            return true;
        }
    }
    return false;
};