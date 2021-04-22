/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    let div = [1];
    for (let i = 1; i < n; i++) {
        div.push(div[i - 1] * i);
    }
    let result = '';
    let character = [];
    for (let i = 1; i <= n; i++) {
        character.push(i);
    }
    for (let i = n - 1; i >= 1; i--) {
        let index = parseInt((k - 1) / div[i]);
        let c = character[index];
        result = `${result}${c}`;
        character = character.filter(it => it != c);
        k = k - index * div[i];
    }
    result = `${result}${character[0]}`;
    return result;
};