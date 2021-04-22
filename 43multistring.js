/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if ((num1.length == 1 && num1[0] == '0') || (num2.length == 1 && num2[0] == '0')) {
        return '0';
    }
    let [dig1, dig2, len1, len2] = [
        [],
        [], num1.length, num2.length
    ];
    for (let i = len1 - 1; i >= 0; i--) {
        dig1.push(parseInt(num1[i]));
    }
    for (let i = len2 - 1; i >= 0; i--) {
        dig2.push(parseInt(num2[i]));
    }
    let totallevel = [

    ];
    for (let i = 0; i < len2; i++) {
        let popup = 0;
        let level = [];
        let t = 0;
        while (t < i) {
            level.push(0);
            t++;
        }
        for (let j = 0; j < len1; j++) {
            let sum = 0;
            sum = dig1[j] * dig2[i];
            sum += popup;
            level.push(sum % 10);
            popup = parseInt(sum / 10);
        }
        if (popup > 0) {
            level.push(popup);
        }
        totallevel.push(level);
    }
    let totallen = totallevel.length;
    let maxlength = 0;
    totallevel.forEach(it => {
        if (maxlength < it.length) {
            maxlength = it.length;
        }
    })
    let [sum, popup, result] = [0, 0, []];
    for (let i = 0; i < maxlength; i++) {
        sum = 0;
        for (let j = 0; j < totallen; j++) {
            if (i < totallevel[j].length) {
                sum += totallevel[j][i];
            }
        }
        sum += popup;
        result.push(sum % 10);
        popup = parseInt(sum / 10);
    }
    if (popup > 0) {
        result.push(popup);
    }
    let finalstring = '';
    for (let i = result.length - 1; i >= 0; i--) {
        finalstring = `${finalstring}${result[i]}`;
    }
    return finalstring;
};