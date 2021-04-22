/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    // let cache = new Map();
    // return getParenthesis(n);

    // function getParenthesis(n) {
    //     if (cache.has(n)) {
    //         return cache.get(n);
    //     }
    //     if (n <= 0) {
    //         return [];
    //     } else if (n == 1) {
    //         return ['()'];
    //     } else if (n == 2) {
    //         return ['()()', '(())'];
    //     } else {
    //         let result = [];
    //         let p = getParenthesis(n - 1);
    //         p.forEach(it => {
    //             result.push(`()${it}`);
    //             result.push(`${it}()`);
    //             result.push(`(${it})`);
    //         });
    //         if (n == 3) {
    //             result = [...new Set(result)];
    //             cache.set(n, result);
    //             return result;
    //         }
    //         let i = 2;
    //         while (i <= parseInt(n / 2)) {
    //             let left = getParenthesis(i - 1);
    //             let right = getParenthesis(n - i - 1);
    //             for (let eachleft of left) {
    //                 for (let eachRight of right) {
    //                     result.push(`(${eachleft})(${eachRight})`);
    //                 }
    //             }
    //             i++;
    //         }
    //         result = [...new Set(result)];
    //         cache.set(n, result);
    //         return result;
    //     }
    // }
    let results = [];

    function pushparentheles(stack, remaingcount, s) {
        if (remaingcount == 0) {
            if (stack == 0) {
                results.push(s);
                return;
            } else {
                results.push(`${s}${')'.repeat(stack)}`);
                return;
            }
        } else {
            if (stack == 0) {
                pushparentheles(stack + 1, remaingcount - 1, `${s}(`);
                return;
            } else {
                pushparentheles(stack + 1, remaingcount - 1, `${s}(`);
                pushparentheles(stack - 1, remaingcount, `${s})`);
            }
        }
    }

    if (n <= 0) {
        return [];
    }
    pushparentheles(0, n, '');

    return [...new Set(results)];

};