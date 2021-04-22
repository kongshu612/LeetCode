/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let totalLength = nums1.length + nums2.length;
  let merged = [];
  let i = 0;
  let j = 0;
  while (i < nums1.length || j < nums2.length) {
    if (i >= nums1.length) {
      merged.push(nums2[j++]);
    } else if (j >= nums2.length) {
      merged.push(nums1[i++]);
    } else {
      if (nums1[i] <= nums2[j]) {
        merged.push(nums1[i++]);
      } else {
        merged.push(nums2[j++]);
      }
    }
  };
  //odd
  if (totalLength % 2 == 1) {
    let target = (totalLength - 1) / 2;
    return merged[target];
  }
  //even
  else {
    let [second, first = second - 1] = [totalLength / 2];
    return (merged[first] + merged[second]) / 2;
  }
};