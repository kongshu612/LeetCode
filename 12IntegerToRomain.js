/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  function getdigital(digital, first, second, third) {
    if (digital <= 3) {
      return first.repeat(digital);
    } else if (digital == 4) {
      return `${first}${second}`;
    } else if (digital == 5) {
      return second;
    } else if (digital <= 8) {
      return `${second}${first.repeat(digital-5)}`;
    } else {
      return `${first}${third}`;
    }
  }
  let res = '';
  res = `${res}${getdigital(parseInt(num/1000),'M','','')}`;
  num = num % 1000;
  res = `${res}${getdigital(parseInt(num/100),'C','D','M')}`;
  num = num % 100;
  res = `${res}${getdigital(parseInt(num/10),'X','L','C')}`;
  num = num % 10;
  res = `${res}${getdigital(parseInt(num),'I','V','X')}`;
  return res;
};