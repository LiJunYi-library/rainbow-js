let testArr = [
  { num: 33, tt: "奇" },
  { num: 44, tt: "偶" },
  { num: 11, tt: "奇" },
  { num: 22, tt: "偶" },
  { num: 77, tt: "奇" },
  { num: 88, tt: "偶" },
  { num: 99, tt: "奇" },
  { num: 55, tt: "奇" },
  { num: 66, tt: "偶" },
];

//find
//findLast

//findIndex
//findLastIndex

function obtain(list, formatter, verdict) {
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

export function findMin(list, formatter) {
  return obtain(list, formatter, (value, item, index, list) => {
    return formatter(item, index, list) < value;
  });
}

console.log("*********** array **************");
console.log(
  "findMin",
  findMin(testArr, (item) => item.num)
);
console.log("*********** array **************");
