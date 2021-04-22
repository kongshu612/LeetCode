/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    function checkeachrow(r) {
        let count = new Set();
        for (let i = 0; i < 9; i++) {
            let charac = board[r][i];
            if (charac == '.') {
                continue;
            }
            if (count.has(charac)) {
                return false;
            } else {
                count.add(charac);
            }
        }
        return true;
    }

    function checkeachcolumn(c) {
        let count = new Set();
        for (let i = 0; i < 9; i++) {
            let charac = board[i][c];
            if (charac == '.') {
                continue;
            }
            if (count.has(charac)) {
                return false;
            } else {
                count.add(charac);
            }
        }
        return true;
    }

    function checkeachSubbox(x, y) {
        let count = new Set();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let [xpos, ypos] = [i + x * 3, j + y * 3];
                let charac = board[xpos][ypos];
                if (charac == '.') {
                    continue;
                }
                if (count.has(charac)) {
                    return false;
                } else {
                    count.add(charac);
                }
            }
        }
        return true;
    }
    for (let i = 0; i < 9; i++) {
        if (!checkeachrow(i) || !checkeachcolumn(i)) {
            return false;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!checkeachSubbox(i, j)) {
                return false;
            }
        }
    }
    return true;

};