const testArr = [
  { num: 33, tt: "奇" },
  { num: 44, tt: "偶" },
  { num: 11, tt: "奇***" },
  { num: 99, tt: "奇***" },
  { num: 22, tt: "偶" },
  { num: 77, tt: "奇" },
  { num: 88, tt: "偶" },
  { num: 99, tt: "奇----" },
  { num: 55, tt: "奇" },
  { num: 11, tt: "奇----" },
  { num: 66, tt: "偶" },
];

export function arrayLoop(num, cb) {
  for (let index = 0; index < num; index++) {
    if (cb(index) === false) return;
  }
}

export function arrayLoopMap(num, cb) {
  const arr = [];
  for (let index = 0; index < num; index++) {
    arr.push(cb(index));
  }
  return arr;
}

export function arrayBubble(list = [], formatter, verdict) {
  let value = null;
  let index;
  let item;
  list.forEach((ele, nth) => {
    if (value === null) {
      item = ele;
      index = nth;
      value = formatter(ele, nth, list);
      return;
    }

    if (verdict(value, ele, nth, list)) {
      item = ele;
      index = nth;
      value = formatter(ele, nth, list);
    }
  });
  return item;
}

export function arrayBubbleMin(list = [], formatter) {
  return arrayBubble(
    list,
    formatter,
    (value, item, index, list) => formatter(item, index, list) < value
  );
}

export function arrayBubbleLastMin(list = [], formatter) {
  return arrayBubble(
    list,
    formatter,
    (value, item, index, list) => formatter(item, index, list) <= value
  );
}

export function arrayBubbleMax(list = [], formatter) {
  return arrayBubble(
    list,
    formatter,
    (value, item, index, list) => formatter(item, index, list) > value
  );
}

export function arrayBubbleLastMax(list = [], formatter) {
  return arrayBubble(
    list,
    formatter,
    (value, item, index, list) => formatter(item, index, list) >= value
  );
}

// 删除数组中的第n个 改变数组
export function arrayRemoveIndex(list = [], num) {
  list.splice(num, 1);
  return list;
}

// 删除数组中第一个找到的item 改变数组
export function arrayRemove(list = [], item) {
  const index = list.findIndex((el) => el === item);
  if (~index) list.splice(index, 1);
  return list;
}

// 删除数组中最后一个找到的item  改变数组
export function arrayRemoveLast(list = [], item) {
  const index = list.findLastIndex((el) => el === item);
  if (~index) list.splice(index, 1);
  return list;
}

// 删除数组中的所有item 改变数组
export function arrayRemoves(list = [], item) {
  const sames = list.filter((el) => el === item);
  sames.forEach((el) => {
    arrayRemove(list, el);
  });
  return list;
}

export function arraySplitIndex(list = [], num) {
  const arr = [];
  for (let index = 0; index < list.length; index += num) {
    const ar = [];
    const max = index + num > list.length ? list.length : index + num;
    for (let j = index; j < max; j++) {
      ar.push(j);
    }
    arr.push(ar);
  }
  return arr;
}

export function arraySplit(list = [], num) {
  const arr = [];
  for (let index = 0; index < list.length; index += num) {
    const max = index + num > list.length ? list.length : index + num;
    const ar = list.slice(index, max);
    arr.push(ar);
  }
  return arr;
}

export function arrayWipeRepetition(list = [], formatter) {
  if (!formatter) return [...new Set(list)];
  const map = new Map();
  return list.filter(
    (item) =>
      !map.has(formatter(item).toString()) &&
      map.set(formatter(item).toString())
  );
}

export function arrayWipeRepetitionLast(list = [], formatter) {
  if (!formatter) return [...new Set(list)];
  const map = {};
  list.forEach((item) => (map[formatter(item)] = item));
  const arr = [];
  for (const key in map) {
    if (Object.hasOwnProperty.call(map, key)) {
      const element = map[key];
      arr.push(element);
    }
  }
  return arr;
}

export function arrayExtractSame(list = [], formatter) {
  const map = {};
  list.forEach((item) => {
    if (!map[formatter(item)]) map[formatter(item)] = [];
    map[formatter(item)].push(item);
  });
  const arr = [];
  for (const key in map) {
    if (Object.hasOwnProperty.call(map, key)) {
      const element = map[key];
      if (element.length > 1) arr.push(element);
    }
  }
  return arr.flat();
}

export function sortByList(list, arr, formatter) {
  list.forEach((item) => {
    const sortIndex = arr.findIndex((ele) => formatter(item, ele));
    item.sortIndex = sortIndex === -1 ? list.length : sortIndex;
  });
  list.sort(function (a, b) {
    return a.sortIndex - b.sortIndex;
  });
  return list;
}
