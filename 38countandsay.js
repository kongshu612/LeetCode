/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    function generatenext(str) {
        let [i, len] = [0, str.length];
        let output = '';
        while (i < len) {
            let c = str[i];
            let count = 1;
            while (i < len && str[i + 1] == c) {
                i++;
                count++;
            }
            output = `${output}${count}${c}`;
            if (i >= len) {
                return output;
            }
            i++;
        }
        return output;
    }
    let [seed, index] = ['1', 1];
    index++;
    while (index <= n) {
        seed = generatenext(seed);
        index++;
    }
    return seed;
};