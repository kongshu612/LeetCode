/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let [maxrights, len, maxright, maxleft] = [
        [], height.length, 0, 0
    ];
    for (let i = len - 1; i > 0; i--) {
        if (height[i] < maxright) {
            maxrights[i] = maxright;
        } else {
            maxright = height[i];
            maxrights[i] = maxright;
        }
    }
    let totalArea = 0;
    for (let i = 0; i < len; i++) {
        let area = Math.min(maxleft, maxrights[i]) - height[i];
        if (area > 0) {
            totalArea += area;
        }
        if (height[i] > maxleft) {
            maxleft = height[i];
        }
    }
    return totalArea;
};