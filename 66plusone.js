/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    var plusAt = (index) => {
        if (index == 0) {
            if (digits[0] == 9) {
                digits[0] = 0;
                digits.splice(0, 0, 1);
            } else {
                digits[0]++;
            }
            return;
        }
        if (digits[index] == 9) {
            digits[index] = 0;
            plusAt(index - 1);
        } else {
            digits[index]++;
        }
    }
    plusAt(digits.length - 1);
    return digits;
};