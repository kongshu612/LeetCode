/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    var isoverlay = (a, b) => {
        return a[0] <= b[0] && a[1] >= b[0];
    }
    if (intervals.length == 0 || intervals.length == 1) {
        return intervals;
    }
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    let result = [];
    let pre = [...intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let cur = intervals[i];
        if (isoverlay(pre, cur)) {
            pre[0] = Math.min(pre[0], cur[0]);
            pre[1] = Math.max(pre[1], cur[1]);
        } else {
            result.push([...pre]);
            pre = [...cur];
        }
    }
    result.push([...pre]);
    return result;


};