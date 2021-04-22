/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    // Solution1
    // if (n == 1) {
    //     return [
    //         ["Q"]
    //     ];
    // } else if (n == 2) {
    //     return [];
    // }

    // let finalresult = [];

    // function choosequee(s, board) {
    //     if (s == n - 1) {
    //         let target = board[s].findIndex(it => it == null);
    //         if (target < 0) {
    //             return {
    //                 result: false,
    //                 boards: null
    //             };
    //         } else {
    //             board[s][target] = "Q";
    //             return {
    //                 result: true,
    //                 boards: [
    //                     [...board]
    //                 ],
    //             }
    //         }
    //     }
    //     let blocks = [];
    //     for (let i = 0; i < n; i++) {
    //         if (board[s][i] == null) {
    //             blocks.push(i);
    //         }
    //     }
    //     if (blocks.length == 0) {
    //         return {
    //             result: false,
    //             boards: null
    //         }
    //     }
    //     let allboards = [];
    //     for (let i = 0; i < blocks.length; i++) {
    //         let y = blocks[i];
    //         let originalboard = [...board.map(it => [...it])];
    //         originalboard[s][y] = "Q";
    //         let black = findblackblocks(s, y, originalboard);
    //         filldot(black, originalboard);
    //         let searchresult = choosequee(s + 1, originalboard);
    //         if (searchresult.result) {
    //             allboards.push(...searchresult.boards);
    //         }
    //     }
    //     if (allboards.length > 0) {
    //         return {
    //             result: true,
    //             boards: allboards
    //         }
    //     } else {
    //         return {
    //             result: false,
    //             boards: null,
    //         }
    //     }

    // }

    // function findblackblocks(x, y, board) {
    //     let black = [];
    //     for (let i = 0; i < n; i++) {
    //         if (board[x][i] == null) {
    //             black.push({
    //                 x: x,
    //                 y: i
    //             });
    //         }
    //         if (board[i][y] == null) {
    //             black.push({
    //                 x: i,
    //                 y: y
    //             });
    //         }
    //         let [xp, yp, xm, ym, xpm, ypm, xmp, ymp] = [x + i, y + i, x - i, y - i, x + i, y - i, x - i, y + i];
    //         if (xp >= 0 && xp < n && yp >= 0 && yp < n && board[xp][yp] == null) {
    //             black.push({
    //                 x: xp,
    //                 y: yp
    //             });
    //         }
    //         if (xm >= 0 && xm < n && ym >= 0 && ym < n && board[xm][ym] == null) {
    //             black.push({
    //                 x: xm,
    //                 y: ym
    //             });
    //         }
    //         if (xpm >= 0 && xpm < n && ypm >= 0 && ypm < n && board[xpm][ypm] == null) {
    //             black.push({
    //                 x: xpm,
    //                 y: ypm
    //             });
    //         }
    //         if (xmp >= 0 && xmp < n && ymp >= 0 && ymp < n && board[xmp][ymp] == null) {
    //             black.push({
    //                 x: xmp,
    //                 y: ymp
    //             });
    //         }
    //     }
    //     return black;
    // }

    // function filldot(blocks, board) {
    //     for (let it of blocks) {
    //         board[it.x][it.y] = ".";
    //     }
    // }

    // function makeemptyboard() {
    //     let board = [];
    //     for (let i = 0; i < n; i++) {
    //         let row = [];
    //         for (let j = 0; j < n; j++) {
    //             row.push(null);
    //         }
    //         board.push(row);
    //     }
    //     return board;
    // }

    // let board = makeemptyboard();
    // let res = choosequee(0, board);
    // if (res.result) {
    //     finalresult.push(...res.boards);
    // }

    // return finalresult.map(it => it.map(subit => subit.join('')));


    //Solution2
    var paint = (positions) => {
        let result = [];
        for (let i = 0; i < n; i++) {
            let row = '';
            for (let j = 0; j < n; j++) {
                if (j == positions[i]) {
                    row += 'Q';
                } else {
                    row += '.';
                }
            }
            result.push(row);
        }
        return result;
    }

    var check = (positions, p) => {
        for (let row = 0; row < positions.length; row++) {
            if (positions.length - row == Math.abs(positions[row] - p)) {
                return false;
            }
        }
        return true;
    }
    let colused = new Array(n).fill(false);
    let result = [];
    var dsf = (positions) => {
        if (positions.length == n) {
            result.push(paint(positions));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (colused[col]) {
                continue;
            }
            if (!check(positions, col)) {
                continue;
            }
            colused[col] = true;
            dsf([...positions, col]);
            colused[col] = false;
        }
    }
    dsf([]);
    return result;
};