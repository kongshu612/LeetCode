/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  function parseNum(str, first, second, third, level) {
    let length = str.length;
    if (length == 1) {
      return str == first ? 1 * level : 5 * level;
    } else if (length == 2) {
      if (str == `${first}${first}`) {
        return 2 * level;
      } else if (str == `${first}${second}`) {
        return 4 * level;
      } else if (str == `${second}${first}`) {
        return 6 * level;
      } else {
        return 9 * level;
      }
    } else if (length == 3) {
      return str[0] == first ? 3 * level : 7 * level;
    } else {
      return 8 * level;
    }
  }

  function getdigitalPart(str) {
    let combination = [{
        start: ['I', 'V'],
        collection: ['I', 'V', 'X'],
        level: 1,
      },
      {
        start: ['X', 'L'],
        collection: ['X', 'L', 'C'],
        level: 10,
      },
      {
        start: ['C', 'D'],
        collection: ['C', 'D', 'M'],
        level: 100,
      },
      {
        start: ['M'],
        collection: ['M', 'M', 'M'],
        level: 1000,
      }
    ];
    if (!str || !str.length) {
      return null;
    }
    let target = combination.find(it => it.start.indexOf(str[0]) >= 0);
    let i = 0;
    while (i < str.length && target.collection.indexOf(str[i]) >= 0) {
      i++;
    }
    return {
      start: str.substring(0, i),
      remaining: i == str.length ? '' : str.substring(i),
      level: target.level,
      collection: target.collection,
    };
  }

  let result = 0;
  let part = getdigitalPart(s);
  while (part != null) {
    result += parseNum(part.start, ...part.collection, part.level);
    part = getdigitalPart(part.remaining);
  }
  return result;
};