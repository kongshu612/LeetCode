/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    if (n == 1) {
        return [
            [1]
        ];
    }
    let result = new Array(n).fill([]);
    for (let i = 0; i < n; i++) {
        result[i] = new Array(n).fill(0);
    }
    let limit = parseInt((n + 1) / 2);
    let count = 1;
    for (let i = 0; i < limit; i++) {
        if (i == n - 1 - i) {
            result[i][i] = count++;
            break;
        }
        for (let j = i; j < n - 1 - i; j++) {
            result[i][j] = count++;
        }
        for (let j = i; j < n - 1 - i; j++) {
            result[j][n - 1 - i] = count++;
        }
        for (let j = n - 1 - i; j > i; j--) {
            result[n - 1 - i][j] = count++;
        }
        for (let j = n - 1 - i; j > i; j--) {
            result[j][i] = count++;
        }
    }
    return result;
};