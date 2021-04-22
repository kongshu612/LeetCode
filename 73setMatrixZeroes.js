/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let [m, n] = [matrix.length, matrix[0].length];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                for (let t = 0; t < m; t++) {
                    if (matrix[t][j] != 0) {
                        matrix[t][j] = null;
                    }
                }
                for (let t = 0; t < n; t++) {
                    if (matrix[i][t] != 0) {
                        matrix[i][t] = null;
                    }
                }
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == null) {
                matrix[i][j] = 0;
            }
        }
    }
};