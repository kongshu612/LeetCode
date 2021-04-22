/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
    var group = () => {
        let groups = [];
        let len = 0;
        let result = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (len + word.length > maxWidth) {
                groups.push([...result]);
                result = [word];
                len = Math.min(word.length + 1, maxWidth);
            } else if (len + word.length == maxWidth) {
                result.push(word);
                groups.push(result);
                result = [];
                len = 0;
            } else {
                result.push(word);
                len = Math.min(len + word.length + 1, maxWidth);
            }
        }
        if (result.length > 0) {
            groups.push(result);
        }
        return groups;
    }
    var justification = (group, isjustfy) => {
        if (!isjustfy) {
            let result = group.join(' ');
            let remaing = maxWidth - result.length;
            return `${result}${' '.repeat(remaing)}`;
        }
        let wordlen = group.reduce((last, word) => last + word.length, 0);
        // for (let i = 0; i < group.length; i++) {
        //     wordlen += group[i].length;
        // }
        let spaceCapacity = maxWidth - wordlen;
        let divde = group.length - 1;
        if (divde > 0) {
            let eachSpace = parseInt(spaceCapacity / divde);
            let remaing = spaceCapacity % divde;
            let result = '';
            for (let i = 0; i < group.length - 1; i++) {
                let empty = eachSpace;
                if (i < remaing) {
                    empty++;
                }
                result = `${result}${group[i]}${' '.repeat(empty)}`;
            }
            result = `${result}${group[group.length-1]}`;
            return result;
        } else {
            return `${group[0]}${' '.repeat(spaceCapacity)}`;
        }
    }
    let groups = group();
    if (groups.length == 1) {
        return [justification(groups[0], false)];
    }
    let result = [];
    for (let i = 0; i < groups.length - 1; i++) {
        result.push(justification(groups[i], true));
    }
    result.push(justification(groups[groups.length - 1], false));
    return result;
};