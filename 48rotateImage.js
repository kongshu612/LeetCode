/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    function rotateN(s, n, matrix) {
        if (n == 1) {
            return;
        }
        for (let i = 0; i < n - 1; i++) {
            let [xt, yt, xr, yr, xb, yb, xl, yl] = [s, s + i, s + i, s + n - 1, s + n - 1, s + n - 1 - i, s + n - 1 - i, s];
            let temp = matrix[xt][yt];
            [matrix[xt][yt], matrix[xl][yl], matrix[xb][yb], matrix[xr][yr]] = [matrix[xl][yl], matrix[xb][yb], matrix[xr][yr], temp];
        }
    }
    for (let i = 0; i < parseInt((matrix.length + 1) / 2); i++) {
        rotateN(i, matrix.length - i * 2, matrix);
    }
};