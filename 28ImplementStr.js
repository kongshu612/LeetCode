/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (!needle || !needle.length || haystack == needle) {
        return 0;
    }
    if (!haystack || !haystack.length) {
        return -1;
    }
    let len = needle.length;
    for (let i = 0; i < haystack.length + 1 - len; i++) {
        let sub = haystack.substr(i, len);
        if (sub == needle) {
            return i;
        }
    }
    return -1;
};