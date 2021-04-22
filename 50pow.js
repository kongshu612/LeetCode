/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    let cache = new Map();

    function calculate(x, n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        } else if (n > 0) {
            if (n == 1) {
                return x;
            } else if (n == 2) {
                return x * x;
            }
            if (cache.has(n)) {
                return cache.get(n);
            }
            let left = parseInt(n / 2);
            let right = n - left;
            let res = calculate(x, left) * calculate(x, right);
            cache.set(n, res);
            return res;
        } else {
            return calculate(1 / x, -n);
        }
    }

    return calculate(x, n);

};