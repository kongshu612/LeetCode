/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    let [INT_MIN, INT_MIN_MID, INT_MAX] = [-Math.pow(2, 31), -Math.pow(2, 31) >> 1, Math.pow(2, 31) - 1];
    if (dividend == INT_MIN && divisor == -1) return INT_MAX;
    let ispositive = dividend > 0 == divisor > 0;
    dividend = dividend > 0 ? -dividend : dividend;
    divisor = divisor > 0 ? -divisor : divisor;
    let count = 0;
    while (dividend <= divisor) {
        let [x, accurm] = [1, divisor];
        while (accurm > INT_MIN_MID && dividend <= accurm + accurm) {
            x += x;
            accurm += accurm;
        }
        count += x;
        dividend -= accurm;
    }
    return ispositive ? count : -count;

};