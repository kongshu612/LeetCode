/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {

    function search(collec, sum) {
        if (sum == 0) {
            return [
                []
            ];
        }
        let max = 0;
        let nextcollec = [];
        for (let i = 0; i < collec.length; i++) {
            if (collec[i] <= sum) {
                nextcollec = [...nextcollec, collec[i]];
                if (max < collec[i]) {
                    max = collec[i];
                }
            }
        }
        if (nextcollec.length == 0) {
            return [null];
        }
        if (nextcollec.length == 1 && nextcollec[0] == sum) {
            let tmp = [
                [nextcollec[0]]
            ];
            return tmp;
        }
        let tmpresult = search(nextcollec, sum - max).filter(it => it != null).map(it => [max, ...it]);
        tmpresult = [...tmpresult || [], ...search(nextcollec.filter(it => it != max), sum).filter(it => it != null) || []];


        return tmpresult;
    }
    let tmp = search(candidates, target).filter(it => it != null);
    let finalresult = [];
    let distinct = new Set();
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].sort((a, b) => a - b);
        let key = tmp[i].join('x');
        if (!distinct.has(key)) {
            distinct.add(key);
            finalresult = [...finalresult, tmp[i]];
        }
    }
    return finalresult;
};