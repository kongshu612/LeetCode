/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let [m, n] = [a.length, b.length];
    if (m > n) {
        a = `0${a}`;
        b = `${'0'.repeat(m - n + 1)}${b}`;
    } else {
        a = `${'0'.repeat(n - m + 1)}${a}`;
        b = `0${b}`;
    }
    len = Math.max(m, n) + 1;
    let [pop, result] = [0, ''];
    for (let i = len - 1; i >= 0; i--) {
        let sum = parseInt(a[i]) + parseInt(b[i]) + pop;
        pop = parseInt(sum / 2);
        sum = sum % 2;
        result = `${sum}${result}`;
    }
    if (result[0] == '0') {
        result = result.substr(1);
    }
    return result;
};