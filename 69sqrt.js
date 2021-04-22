/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x == 0) {
        return 0;
    } else if (x == 1) {
        return 1;
    }
    let i = 1;
    while (i * i < x) {
        let next = (i + 1) * (i + 1);
        if (next == x) {
            return i + 1;
        } else if (next > x) {
            return i;
        }
        i++;
    }
};