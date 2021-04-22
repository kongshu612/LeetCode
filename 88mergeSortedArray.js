/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let nums = [];
  let [i, j] = [0, 0];
  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      nums.push(nums1[i]);
      i++;
    } else {
      nums.push(nums2[j]);
      j++;
    }
  }
  if (i < m) {
    nums = [...nums, ...nums1.slice(i, m)];
  } else if (j < n) {
    nums = [...nums, ...nums2.slice(j, n)];
  };
  for (let i = 0; i < m + n; i++) {
    nums1[i] = nums[i];
  }
};