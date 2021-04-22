/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
    function runner(rn, cn) {
        for (let i = 0; i < rn; i++) {
            for (let j = 0; j < cn; j++) {
                if (board[i][j] === '.') {
                    for (let v = 1; v < 10; v++) {
                        board[i][j] = v.toString();
                        if (isMatch(i, j)) {
                            if (runner(rn, cn)) {
                                return true;
                            }
                        }
                        board[i][j] = '.';
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function isMatch(r, c) {
        let [rc, cc] = [new Set(), new Set()];
        for (let i = 0; i < 9; i++) {
            if (board[r][i] != '.') {
                if (rc.has(board[r][i])) {
                    return false;
                } else {
                    rc.add(board[r][i]);
                }
            }
            if (board[i][c] != '.') {
                if (cc.has(board[i][c])) {
                    return false;
                } else {
                    cc.add(board[i][c])
                }
            }


        }
        let [ri, ci] = [parseInt(r / 3) * 3, parseInt(c / 3) * 3];
        let subC = new Set();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[ri + i][ci + j] != '.') {
                    if (subC.has(board[ri + i][ci + j])) {
                        return false;
                    } else {
                        subC.add(board[ri + i][ci + j]);
                    }
                }

            }
        }
        return true;
    }
    runner(board.length, board[0].length);
};