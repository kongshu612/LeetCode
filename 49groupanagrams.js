/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    function getkey(str) {
        if (!str || !str.length) {
            return 'x';
        }
        let code = [];
        for (let i = 0; i < str.length; i++) {
            code.push(str.charCodeAt(i));
        }
        code = code.sort((a, b) => a - b);
        return code.join('x');
    }
    if (!strs || !strs.length) {
        return [];
    }

    let group = new Map();
    for (let i = 0; i < strs.length; i++) {
        let key = getkey(strs[i]);
        if (group.has(key)) {
            group.set(key, [...group.get(key) || [], strs[i]]);
        } else {
            group.set(key, [strs[i]]);
        }
    }
    let result = [];
    for (let val of group.values()) {
        result.push(val);
    }
    return result;
};