/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let corner = [];
    let i = 0;
    let [m, n] = [0, 0];
    if (!matrix || matrix.length <= 0) {
        return [];
    }
    m = matrix.length;
    n = matrix[0].length;
    if (n == 0) {
        return [];
    }
    while (true) {
        let point = {
            lt: {
                x: 0 + i,
                y: 0 + i
            },
            rt: {
                x: 0 + i,
                y: n - 1 - i
            },
            lb: {
                x: m - 1 - i,
                y: 0 + i
            },
            rb: {
                x: m - 1 - i,
                y: n - 1 - i
            }
        };
        if (point.lt.y <= point.rt.y && point.lt.x <= point.lb.x) {
            corner.push(point);
        } else {
            break;
        }
        i++;
    }
    let result = [];
    for (let i = 0; i < corner.length; i++) {
        let [lt, rt, rb, lb] = [corner[i].lt, corner[i].rt, corner[i].rb, corner[i].lb];
        if (lt.x == lb.x && lt.y == rt.y) {
            result.push(matrix[lt.x][lt.y]);
            return result;
        } else if (lt.x == lb.x && lt.y != rt.y) {
            let [x, y] = [lt.x, lt.y];
            for (let i = 0; y + i <= rt.y; i++) {
                result.push(matrix[x][y + i]);
            }
            return result;
        } else if (lt.x != lb.x && lt.y == rt.y) {
            let [x, y] = [lt.x, lt.y];
            for (let i = 0; x + i <= lb.x; i++) {
                result.push(matrix[x + i][y]);
            }
            return result;
        }
        let [x, y] = [lt.x, lt.y];
        for (let i = 0; y + i <= rt.y; i++) {
            result.push(matrix[x][y + i]);
        }
        [x, y] = [rt.x, rt.y];
        for (let i = 1; x + i <= rb.x; i++) {
            result.push(matrix[x + i][y]);
        }
        [x, y] = [rb.x, rb.y];
        for (let i = 1; y - i >= lb.y; i++) {
            result.push(matrix[x][y - i]);
        }
        [x, y] = [lb.x, lb.y];
        for (let i = 1; x - i > lt.x; i++) {
            result.push(matrix[x - i][y]);
        }
    }
    return result;
};