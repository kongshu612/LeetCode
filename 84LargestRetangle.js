/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    let len = heights.length;
    if (len == 0) {
        return 0;
    }
    var dsf = (s) => {
        if (s == len - 1) {
            return heights[s];
        }
        let [maxheight, bottom] = [heights[s], heights[s]];
        for (let i = 1; i < len - s; i++) {
            if (heights[s + i] < bottom) {
                bottom = heights[s + i];
            }
            let sum = bottom * (i + 1);
            if (sum > maxheight) {
                maxheight = sum;
            }
        }
        let submax = dsf(s + 1);
        return Math.max(maxheight, submax);
    }
    return dsf(0);
};