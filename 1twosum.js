var twoSum = function (nums, target) {
  if (target % 2 == 0) {
    let split = target / 2;
    let res = [];
    nums.forEach((it, index) => {
      if (it == split) {
        res.push(index);
      }
    });
    if (res.length >= 2) {
      return [res[0], res[1]];
    }
  }
  let maps = new Map();
  nums.forEach((it, index) => {
    maps.set(it, index);
  })
  for (let key of maps.keys()) {
    let remaining = target - key;
    if (maps.has(remaining)) {
      let first = maps.get(key);
      let second = maps.get(remaining);
      if (first == second) {
        continue;
      }
      return [first, second];
    }
  }
  return [];
}