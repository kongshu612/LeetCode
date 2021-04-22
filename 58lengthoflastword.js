/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    let n = s.length;
    if (n == 0) {
        return 0;
    }
    let count = 0;
    let start = n - 1;
    while (start >= 0 && s[start] == ' ') {
        start--;
    }
    if (start < 0) {
        return 0;
    }
    for (let i = start; i >= 0; i--) {
        if (s[i] != ' ') {
            count++;
        } else {
            return count;
        }
    }
    return count;
};