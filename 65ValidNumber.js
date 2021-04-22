/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
    s = s.trim();
    if (!s || !s.length) {
        return false;
    }
    let dic = new Set();
    for (let i = 0; i < 10; i++) {
        dic.add(`${i}`);
    }
    var isSimpleDecimial = (s, isOnlyInt) => {
        let dotCount = 0;
        let digCount = 0;
        if (!s || !s.length) {
            return false;
        }
        for (let i = 0; i < s.length; i++) {
            if (s[i] == '+' || s[i] == '-') {
                if (i != 0) {
                    return false;
                } else {
                    continue;
                }
            }
            if (s[i] == '.') {
                if (dotCount == 0 && s.length > 1 && !isOnlyInt) {
                    dotCount++;
                    continue;
                } else {
                    return false;
                }
            }
            if (!dic.has(s[i])) {
                return false;
            } else {
                digCount++;
            }
        }
        return digCount > 0;
    }

    if (s.indexOf('e') > 0) {
        let partal = s.split('e');
        if (partal.length > 2) {
            return false;
        }
        return isSimpleDecimial(partal[0], false) && isSimpleDecimial(partal[1], true);
    } else {
        return isSimpleDecimial(s, false);
    }
};