/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // //Solution1
  // let maxcapacity = 0;
  // for (let i = 0; i < height.length; i++) {
  //   for (let j = height.length - 1; j > i; j--) {
  //     let capacity = Math.min(height[i], height[j]) * (j - i);
  //     if (capacity > maxcapacity) {
  //       maxcapacity = capacity;
  //     }
  //   }
  // }
  // return maxcapacity;


  //Solution2
  let maxcapacity = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    maxcapacity = Math.max(maxcapacity, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxcapacity;
};