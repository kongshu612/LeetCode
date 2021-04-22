/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    if (!nums || !nums.length) {
        return [-1, -1];
    }
    if (nums.length == 1) {
        return nums[0] == target ? [0, 0] : [-1, -1];
    }
    if (nums[0] > target || nums[nums.length - 1] < target) {
        return [-1, -1];
    }
    let [l, r] = [0, nums.length - 1];
    let pos = -1;
    while (true) {
        if (l > r) {
            pos = -1;
            break;
        }
        if (l == r) {
            if (nums[l] == target) {
                pos = l;
            } else {
                pos = -1;
            }
            break;
        }
        let mid = parseInt((l + r) / 2);
        if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }
    if (pos == -1) {
        return [-1, -1];
    }
    [l, r] = [pos, pos];
    while (l >= 0 && nums[l] == target) {
        l--;
    }
    while (r < nums.length && nums[r] == target) {
        r++;
    }
    if (l < 0) {
        l = 0;
    } else if (nums[l] != target) {
        l++;
    }

    if (r >= nums.length) {
        r = nums.length - 1;
    } else if (nums[r] != target) {
        r--;
    }

    return [l, r];
};