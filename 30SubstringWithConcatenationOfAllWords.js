/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const wordDic = new Map();
    let results = [];
    if (!s || !s.length) {
        return [];
    }
    if (!words || !words.length || !words[0] || !words[0].length) {
        return [];
    }
    words.forEach(word => {
        if (!wordDic.has(word)) {
            wordDic.set(word, 1);
        } else {
            wordDic.set(word, wordDic.get(word) + 1);
        }
    });
    const wordlen = words[0].length;
    const len = words[0].length * words.length;
    if (s.length < len) {
        return [];
    }
    for (let i = 0; i <= s.length - len; i++) {
        let substring = s.substr(i, len);
        if (isSubstringMatch(substring, wordlen)) {
            results.push(i);
        }
    }
    return results;

    function isSubstringMatch(sub, len) {
        let i = 0;
        let count = new Map();
        while (i < sub.length) {
            let word = sub.substr(i, len);
            if (!wordDic.has(word)) {
                return false;
            } else {
                if (count.has(word) && count.get(word) == wordDic.get(word)) {
                    return false;
                } else if (!count.has(word)) {
                    count.set(word, 1);
                } else {
                    count.set(word, count.get(word) + 1);
                }
            }
            i += len;
        }
        return true;
    }
};