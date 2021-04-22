/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // function isPatternOnlyChart(pattern){
    //     let i=0;
    //     while(i<pattern.length){
    //         if(pattern[i]!='*'){
    //             return false;
    //         }
    //         i++;
    //     }
    // }
    // if (!p || !p.length) {
    //     return !s || !s.length;
    // }
    // if (p.length == 1) {
    //     if (p[0] == '*') {
    //         return true;
    //     } else {
    //         return s && s.length == 1 && (s[0] == p[0] || p[0] == '?');
    //     }
    // }
    // if (!s || !s.length) {
    //     return false;
    // }
    // let [i, len, slen] = [0, p.length, s.length];
    // while (i < len && p[i] != '*' && i < slen) {
    //     if (s[i] != p[i] && p[i] != '?') {
    //         return false;
    //     }
    //     i++;
    // }
    // if (i >= len) {
    //     return slen == len;
    // }
    // if (i >= slen) {
    //     return isPatternOnlyChart(p.substr(i));
    // }
    // if (p[i] == '*') {
    //     if (i == len - 1) {
    //         return true;
    //     }
    //     let next = p[i + 1];
    //     let j = i;
    //     while (j < slen) {
    //         if (s[j] == next) {
    //             if (i + 2 >= len) {
    //                 return s[slen - 1] == next;
    //             }
    //             if (j + 1 == slen) {
    //                 let t = 0;
    //                 p = p.substring(i + 2);
    //                 while (t < p.length) {
    //                     if (p[t] != '*') {
    //                         return false;
    //                     }
    //                     t++;
    //                 }
    //                 return true;
    //             }
    //             s = s.substring(j + 1);
    //             p = p.substring(i + 2);
    //             return isMatch(s, p);
    //         }
    //         j++;
    //     }
    //     let t = 0;
    //     p = p.substring(i + 2);
    //     while (t < p.length) {
    //         if (p[t] != '*') {
    //             return false;
    //         }
    //         t++;
    //     }
    //     return true;
    // }
    // return true;
    let cache = new Map();

    function isAllStart(p) {
        if (!p || !p.length) {
            return false;
        }
        for (let i = 0; i < p.length; i++) {
            if (p[i] != '*') {
                return false;
            }
        }
        return true;
    }

    function dsf(x, s, y, p) {
        let key = `${x}x${y}`;
        if (cache.has(key)) {
            return cache.get(key) == 1;
        }
        if (x == s.length && y == p.length) {
            cache.set(key, 1);
            return true;
        } else if (x == s.length && y != p.length) {
            let result = isAllStart(p.substr(y));
            cache.set(key, result);
            return result;
        } else if (x != s.length && y == p.length) {
            cache.set(key, false);
            return false;
        }

        let result = null;
        if (p[y] == '*') {
            result = dsf(x, s, y + 1, p) || dsf(x + 1, s, y, p);
        } else if (p[y] == '?' || p[y] == s[x]) {
            result = dsf(x + 1, s, y + 1, p);
        } else {
            result = false;
        }

        cache.set(key, result);
        return result;
    }

    return dsf(0, s, 0, p);
};