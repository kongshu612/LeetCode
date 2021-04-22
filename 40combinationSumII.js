/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    function search(collec, sum) {
        let max = 0;
        let nextcollec = [];
        if (sum == 0) {
            return [
                []
            ];
        }
        for (let i = 0; i < collec.length; i++) {
            if (collec[i] <= sum) {
                nextcollec.push(collec[i]);
                if (max < collec[i]) {
                    max = collec[i];
                }
            }
        }
        if (nextcollec.length == 0) {
            return [null];
        }
        if (nextcollec.length == 1 && nextcollec[0] == sum) {
            return [
                [sum]
            ];
        }
        let result = [];
        let index = nextcollec.indexOf(max);
        result = search(nextcollec.filter((it, ind) => ind != index), sum - max).filter(it => it != null).map(it => [max, ...it]);
        result = [...result || [], ...search(nextcollec.filter((it, ind) => ind != index), sum).filter(it => it != null) || []];
        return result;
    }
    let tmp = search(candidates, target).filter(it => it != null);
    let distinct = new Set();
    let finalresult = [];
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].sort((a, b) => a - b);
        let key = tmp[i].join('x');
        if (!distinct.has(key)) {
            finalresult.push(tmp[i]);
            distinct.add(key);
        }
    }
    return finalresult;
};