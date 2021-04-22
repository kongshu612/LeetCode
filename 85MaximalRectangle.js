/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    if (matrix.length == 0) {
        return 0;
    }
    let [r, c] = [matrix.length, matrix[0].length];
    let cache = new Map();
    var dsf = (x, y) => {
        if (x >= r || y >= c) {
            return 0;
        }
        let key = `${x}x${y}`;
        if (cache.has(key)) {
            return cache.get(key);
        }

        let res1 = getmax(x, y);
        let res2 = dsf(x + 1, y);
        let res3 = dsf(x, y + 1);
        let res = Math.max(res1, res2, res3);
        cache.set(key, res);
        return res;
    }

    var getmax = (x, y) => {
        let [maxwidth, maxheight] = [c, 0];
        for (let i = 0; x + i < r; i++) {
            if (matrix[x + i][y] == '0') {
                break;
            }
            maxheight++;
        }
        if (maxheight == 0) {
            return 0;
        }
        let result = 0;
        for (let i = 0; i < maxheight; i++) {
            let eachColumn = 0;
            for (let j = 0; y + j < c; j++) {
                if (matrix[x + i][y + j] == '0') {
                    break;
                }
                eachColumn++;
            }
            if (eachColumn < maxwidth) {
                maxwidth = eachColumn;
            }
            let tempResult = (i + 1) * maxwidth;
            if (tempResult > result) {
                result = tempResult;
            }
        }
        return result;
    }

    return dsf(0, 0);
};