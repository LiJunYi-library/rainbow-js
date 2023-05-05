/**
 * 树形结构 递归 循环
 * @params fun  每次循环的方法 item ，index ，list递归时的数组，parent 父node，roote 根node
 * @params keys 需要遍历的属性名
 * @params list 需要遍历 树
 * @params recursive 递归时的方法 list，parent，layer 层数，roote
 * @return 返回 list树
 */
export function recursiveForEach(list, fun, keys = ["children"], recursive, layer = -1, parent) {
  let roote;
  roote = roote ? roote : list;
  layer++;
  if (recursive && recursive(list, parent, layer, roote)) return roote;
  for (let index = 0; index < list.length; index++) {
    let element = list[index];
    if (fun(element, index, list, parent, layer, roote)) return roote;
    keys.forEach(key => {
      if (element[key]) Array.recursiveForEach(fun, keys, [...element[key]], recursive, layer, element)
    });
  }
  return roote;
}

/***
 * 树形结构 递归  筛选
 * @params  fun  每次循环的方法 item ，index ，list
 * @params  keys 需要遍历的属性名
 * @params  list 需要递归遍历的 树
 * @return  返回  筛选后的树
 * 
 */
export function recursiveFilter(list, fun, keys = ["children"]) {
  let arr = list.filter(fun);
  arr.forEach(element => {
    keys.forEach(key => {
      if (element[key]) element[key] = Array.recursiveFilter(fun, keys, [...element[key]])
    });
  });
  return arr
}

/**
 * 树形结构 递归 在每一个node前加入
 * @params  keys     需要遍历的属性名
 * @params  list     需要递归遍历的 树
 * @params  ...vals  要加入的node
 * @return  返回     加入后的树
 */
export function recursiveUnshift(list, keys = ["children"], ...vals) {
  let arr = [...list];
  list.unshift(...vals);
  arr.forEach(element => {
    keys.forEach(key => {
      if (element[key]) element[key] = Array.recursiveUnshift(keys, [...element[key]], ...vals)
    });
  });
  return list;
}


/**
 * 树形结构 递归 找到第一个符合要求的 树
 * @params  fun     
 * @params  keys     需要遍历的属性名
 * @params  list     需要递归遍历的 树
 * @return  返回     找到第一个符合要求的 树
 */
export function recursiveFindTree(list, fun, keys = ["children"], tree = {}, KK) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (KK) { tree.__child__ = { ...element }; }
    else tree = { ...element };
    const tree__child__ = KK ? tree.__child__ : tree;
    tree__child__.__index__ = index;
    if (fun(tree__child__, index, list)) return tree;
    for (let nth = 0; nth < keys.length; nth++) {
      const key = keys[nth];
      if (tree__child__[key]) if (Array.recursiveFindTree(fun, keys, [...tree__child__[key]], tree__child__, key)) return tree;
    }
  }
  return undefined;
}

export function recursiveFindTree2(list, fun, keys = ["children"], tree = {}, KK) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (KK) tree[KK] = { ...element };
    else tree = { ...element };
    if (fun(element, index, list)) return tree;
    for (let nth = 0; nth < keys.length; nth++) {
      const key = keys[nth];
      if (element[key]) if (Array.recursiveFindTree2(fun, keys, [...element[key]], tree[KK] || tree, key)) return tree;
    }
  }
  return undefined;
}


export function recursiveFind(list, fun, keys = ["children"]) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (fun(element, index, list)) return element;
    for (let nth = 0; nth < keys.length; nth++) {
      const key = keys[nth];
      if (element[key]) {
        let node = Array.recursiveFind(fun, keys, [...element[key]]);
        if (node) return node;
      }
    }
  }
  return undefined;
}

export function recursiveFindIndex(list, fun, keys = ["children"], tree = []) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    tree[0] = index;
    if (fun(element, index, list)) return tree;
    for (let nth = 0; nth < keys.length; nth++) {
      const key = keys[nth];
      if (element[key]) {
        tree[1] = [];
        if (Array.recursiveFindIndex(fun, keys, [...element[key]], tree[1])) return tree;
      }
    }
  }
  return undefined;
}


export function sortByList(list, arr, fun) {
  list.forEach((item) => {
    let sortIndex = arr.findIndex(ele => fun(item, ele));
    item.sortIndex = sortIndex === -1 ? list.length : sortIndex
  });
  list.sort(function (a, b) {
    return a.sortIndex - b.sortIndex;
  });
  return list
}

export function randomList(list) {
  let random = []
  let length = list.length
  for (let nth = 0; nth < length; nth++) {
    const index = Math.floor(Math.random() * (list.length - 1));
    random.push(list[index]);
    list.splice(index, 1);
  }
  return random;
}

export function remove(list, item) {
  let index = list.findIndex(item);
  if (~index) list.splice(index, 1,);
  return list;
}

export function removeIndex(list, num) {
  list.splice(num, 1,);
  return list;
}

export function wipeRepetition(list) {
  return [...new Set(list)];
}

export function splitIndex(list, num) {
  let arr = []
  for (let index = 0; index < list.length; index += num) {
    let ar = []
    let max = index + num > list.length ? list.length : index + num;
    for (let j = index; j < max; j++) {
      ar.push(j)
    }
    arr.push(ar)
  }
  return arr;
}

export function split(list, num) {
  let arr = []
  for (let index = 0; index < list.length; index += num) {
    let max = index + num > list.length ? list.length : index + num;
    let ar = list.slice(index, max)
    arr.push(ar)
  }
  return arr;
}

export function at(list, index) {
  let nth = index < 0 ? list.length + index : index;
  return list[nth]
}

export function classification(list, prop) {
  let obj = {};
  list.forEach(element => {
    let prototype = element[prop];
    if (!obj[prototype]) {
      obj[prototype].children = [];
      obj[prototype][prop] = prototype;
      element.parent = obj[prototype];
    }
    obj[prototype].children.push(element);
  });

  let arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const el = obj[key];
      arr.push(el);
    }
  }
  
  return arr;
}


export function useConstructor() {
  Array.recursiveForEach = recursiveForEach;
  Array.recursiveFilter = recursiveFilter;
  Array.recursiveUnshift = recursiveUnshift;
  Array.recursiveFindTree = recursiveFindTree;
  Array.recursiveFindTree2 = recursiveFindTree2;
  Array.recursiveFind = recursiveFind;
  Array.recursiveFindIndex = recursiveFindIndex;
  Array.sortByList = sortByList;
  Array.randomList = randomList;
  Array.remove = remove;
  Array.removeIndex = removeIndex;
  Array.wipeRepetition = wipeRepetition;
  Array.splitIndex = splitIndex;
  Array.split = split;
  Array.at = at;
}

export function usePrototype() {
  Array.prototype.recursiveForEach = function (...arg) {
    return recursiveForEach(this, ...arg);
  }
  Array.prototype.recursiveFilter = function (...arg) {
    return recursiveFilter(this, ...arg);
  }
  Array.prototype.recursiveUnshift = function (...arg) {
    return recursiveUnshift(this, ...arg);
  }
  Array.prototype.recursiveFindTree = function (...arg) {
    return recursiveFindTree(this, ...arg);
  }
  Array.prototype.recursiveFindTree2 = function (...arg) {
    return recursiveFindTree2(this, ...arg);
  }
  Array.prototype.recursiveFind = function (...arg) {
    return recursiveFind(this, ...arg);
  }
  Array.prototype.recursiveFindIndex = function (...arg) {
    return recursiveFindIndex(this, ...arg);
  }
  Array.prototype.sortByList = function (...arg) {
    return sortByList(this, ...arg);
  }
  Array.prototype.randomList = function (...arg) {
    return randomList(this, ...arg);
  }
  Array.prototype.remove = function (...arg) {
    return remove(this, ...arg);
  }
  Array.prototype.removeIndex = function (...arg) {
    return removeIndex(this, ...arg);
  }
  Array.prototype.wipeRepetition = function (...arg) {
    return wipeRepetition(this, ...arg);
  }
  Array.prototype.splitIndex = function (...arg) {
    return splitIndex(this, ...arg);
  }
  Array.prototype.split = function (...arg) {
    return split(this, ...arg);
  }
  if (!Array.prototype.at) {
    Array.prototype.at = function (...arg) {
      return at(this, ...arg)
    }
  }
  /////////////////////////////////
}

export let ARRAY = Array;

