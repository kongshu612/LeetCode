/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let tdic = new Map();
    if (!t || !t.length) {
        return "";
    }
    if (!s || s.length < t.length) {
        return "";
    }
    for (let i = 0; i < t.length; i++) {
        if (!tdic.has(t[i])) {
            tdic.set(t[i], 1);
        } else {
            tdic.set(t[i], tdic.get(t[i]) + 1);
        }
    }
    let [i, j, n] = [0, 0, s.length];
    let sdic = new Map();
    let minlength = s.length + 1;
    let result = "";
    while (j < n) {
        let jc = s[j];
        if (tdic.has(jc)) {
            if (!sdic.has(jc)) {
                sdic.set(jc, 1);
            } else {
                sdic.set(jc, sdic.get(jc) + 1);
            }
            if (isSCoverT(sdic, tdic)) {
                while (i <= j) {
                    let ic = s[i];
                    if (sdic.has(ic)) {
                        if (isSCoverT(sdic, tdic)) {
                            if (minlength > j - i + 1) {
                                minlength = j - i + 1;
                                result = s.substr(i, j - i + 1);
                            }
                            i++;
                            sdic.set(ic, sdic.get(ic) - 1);
                        } else {
                            break;
                        }
                    } else {
                        i++;
                    }
                }
            }
        }
        j++;
    }
    if (minlength == s.length + 1) {
        return "";
    }
    return result;

    function isSCoverT(sdic, tdic) {
        for (let it of tdic.keys()) {
            if (!sdic.has(it) || sdic.get(it) < tdic.get(it)) {
                return false;
            }
        }
        return true;
    }
};