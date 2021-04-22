/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!p || !p.length) {
    return !s || !s.length;
  }
  if (p.length == 1) {
    return s && s.length == 1 && (s[0] == p[0] || p[0] == '.');
  }

  if (p[1] != '*') {
    if (!s || !s.length) return false;
    return (s[0] == p[0] || p[0] == '.') && isMatch(s.substring(1), p.substring(1));
  }
  while (s && s.length > 0 && (s[0] == p[0] || p[0] == '.')) {
    if (isMatch(s, p.substring(2))) {
      return true;
    }
    s = s.substring(1);
  }
  return isMatch(s, p.substring(2));
};