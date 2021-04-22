/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    if (!s || s.length < 2) {
        return 0;
    }
    let [len, result = 0, i = 0] = [s.length];
    while (i < len) {
        if (s[i] == '(') {
            let [j, count, stack] = [i + 1, 0, 1];

            let total = 0;
            while (j < len && stack >= 0) {
                if (s[j] == '(') {
                    stack++;
                } else {
                    if (stack == 0) {
                        break;
                    }
                    stack--;
                    count++;
                }
                if (stack == 0) {
                    total += count;
                    count = 0;
                }
                j++;
            }
            if (result < total) {
                result = total;
            }
        }
        i++;
    }
    return result * 2;

};