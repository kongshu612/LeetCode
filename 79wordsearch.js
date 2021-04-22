/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let [m, n] = [board.length, board[0].length];
    let visited = new Array(m);
    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n).fill(0);
    }
    var dsf = (i, j, index) => {
        if (index >= word.length) {
            return true;
        }
        if (i >= m || j >= n || i < 0 || j < 0) {
            return false;
        }
        if (board[i][j] != word[index] || visited[i][j] == 1) {
            return false;
        }
        visited[i][j] = 1;
        let result = dsf(i - 1, j, index + 1) ||
            dsf(i, j + 1, index + 1) ||
            dsf(i + 1, j, index + 1) ||
            dsf(i, j - 1, index + 1);
        visited[i][j] = 0;
        return result;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dsf(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
};