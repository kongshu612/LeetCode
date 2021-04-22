/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    let subpathes = path.split('/').filter(it => it && it.length > 0 && it != '.');
    let finalfolder = [];
    for (let i = 0; i < subpathes.length; i++) {
        if (subpathes[i] != '..') {
            finalfolder.push(subpathes[i]);
        } else {
            if (finalfolder.length > 0) {
                finalfolder = finalfolder.slice(0, finalfolder.length - 1);
            }
        }
    }
    let result = '/';
    for (let i = 0; i < finalfolder.length; i++) {
        result = `${result}${finalfolder[i]}/`;
    }
    if (result.length > 1) {
        result = result.substr(0, result.length - 1);
    }
    return result;
};