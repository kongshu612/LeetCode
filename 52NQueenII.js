/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
    var check = (positions, p) => {
        for (let row = 0; row < positions.length; row++) {
            if (positions.length - row == Math.abs(positions[row] - p)) {
                return false;
            }
        }
        return true;
    }
    let colused = new Array(n).fill(false);
    let solution = 0;
    var dsf = (positions) => {
        if (positions.length == n) {
            solution++;
        }
        for (let p = 0; p < n; p++) {
            if (colused[p]) {
                continue;
            }
            if (!check(positions, p)) {
                continue;
            }
            colused[p] = true;
            dsf([...positions, p]);
            colused[p] = false;
        }
    }
    dsf([]);
    return solution;
};