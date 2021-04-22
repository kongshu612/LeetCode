/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    if (intervals.length == 0) {
        return [newInterval];
    }
    let result = [];
    var isoverlay = (a, b) => {
        return (a[0] <= b[0] && a[1] >= b[0]) || (a[0] >= b[0] && a[0] <= b[1]);
    }
    let current = [...newInterval];
    for (let i = 0; i < intervals.length; i++) {
        if (intervals[i][1] < newInterval[0]) {
            result.push([...intervals[i]]);
            if (i == intervals.length - 1) {
                result.push([...current]);
                return result;
            }
        } else if (current != null && isoverlay(intervals[i], current)) {
            current[0] = Math.min(intervals[i][0], current[0]);
            current[1] = Math.max(intervals[i][1], current[1]);
            if (i == intervals.length - 1) {
                result.push([...current]);
                return result;
            }
        } else if (current != null && !isoverlay(intervals[i], current)) {
            result.push([...current]);
            result.push([...intervals[i]]);
            current = null;
        } else {
            result.push([...intervals[i]]);
        }
    }
    return result;
};