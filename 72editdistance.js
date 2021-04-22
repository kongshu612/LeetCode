/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    let [m, n] = [word1.length, word2.length];
    let dic = new Array(m + 1);
    for (let i = 0; i <= m; i++) {
        dic[i] = new Array(n + 1);
    }
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i == 0) {
                dic[i][j] = j;
            } else if (j == 0) {
                dic[i][j] = i;
            } else if (word1[i - 1] == word2[j - 1]) {
                dic[i][j] = dic[i - 1][j - 1];
            } else {
                dic[i][j] = 1 + Math.min(dic[i - 1][j], dic[i - 1][j - 1], dic[i][j - 1]);
            }
        }
    }
    return dic[m][n];
};