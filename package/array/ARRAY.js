function useConstructor() {
  Array.recursiveForEach = function (
    fun,
    keys = ["children"],
    list,
    recursive,
    layer = -1,
    parent
  ) {
    let roote;
    roote = roote ? roote : list;
    layer++;
    if (recursive && recursive(list, parent, layer, roote)) return roote;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (fun)
        if (fun(element, index, list, parent, layer, roote)) return roote;
      keys.forEach((key) => {
        const actArr = element[key];
        if (element[key])
          Array.recursiveForEach(fun, keys, actArr, recursive, layer, element);
      });
    }
    return roote;
  };
  /**
   *
   * @param {*} fun
   * @param {*} keys
   * @param {*} list
   * @returns
   */
  Array.recursiveFilter = function (
    fun,
    keys = ["children"],
    list,
    layer = -1
  ) {
    layer++;
    const arr = list.filter((...arg) => fun(...arg, layer));
    arr.forEach((element) => {
      keys.forEach((key) => {
        if (element[key]) {
          element[key] = Array.recursiveFilter(
            fun,
            keys,
            [...element[key]],
            layer
          );
        }
      });
    });
    return arr;
  };

  Array.recursiveMap = function (fun, keys = ["children"], list, layer = -1) {
    layer++;
    const arr = list.map((...arg) => fun(...arg, layer));
    arr.forEach((element) => {
      keys.forEach((key) => {
        if (element[key]) {
          element[key] = Array.recursiveMap(
            fun,
            keys,
            [...element[key]],
            layer
          );
        }
      });
    });
    return arr;
  };

  Array.recursiveUnshift = function (
    keys = ["children"],
    list,
    layer = -1,
    ...vals
  ) {
    layer++;
    const arr = [...list];
    list.unshift(...vals);
    arr.forEach((element) => {
      keys.forEach((key) => {
        if (element[key])
          element[key] = Array.recursiveUnshift(
            keys,
            [...element[key]],
            layer,
            ...vals
          );
      });
    });

    return list;
  };

  Array.recursiveFindTree = function (
    fun,
    keys = ["children"],
    list,
    tree = {},
    KK
  ) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (KK) {
        tree.__child__ = { ...element };
      } else tree = { ...element };
      const tree__child__ = KK ? tree.__child__ : tree;
      tree__child__.__index__ = index;
      if (fun(tree__child__, index, list)) return tree;
      for (let nth = 0; nth < keys.length; nth++) {
        const key = keys[nth];
        if (tree__child__[key])
          if (
            Array.recursiveFindTree(
              fun,
              keys,
              [...tree__child__[key]],
              tree__child__,
              key
            )
          )
            return tree;
      }
    }
    return undefined;
  };

  Array.recursiveFindTree2 = function (
    fun,
    keys = ["children"],
    list,
    tree = {},
    KK
  ) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (KK) tree[KK] = { ...element };
      else tree = { ...element };
      if (fun(element, index, list)) return tree;
      for (let nth = 0; nth < keys.length; nth++) {
        const key = keys[nth];
        if (element[key])
          if (
            Array.recursiveFindTree2(
              fun,
              keys,
              [...element[key]],
              tree[KK] || tree,
              key
            )
          )
            return tree;
      }
    }
    return undefined;
  };

  Array.recursiveFind = function (fun, keys = ["children"], list) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (fun(element, index, list)) return element;
      for (let nth = 0; nth < keys.length; nth++) {
        const key = keys[nth];
        if (element[key]) {
          const node = Array.recursiveFind(fun, keys, [...element[key]]);
          if (node) return node;
        }
      }
    }
    return undefined;
  };

  Array.recursiveFindIndex = function (
    fun,
    keys = ["children"],
    list,
    tree = []
  ) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      tree[0] = index;
      if (fun(element, index, list)) return tree;
      for (let nth = 0; nth < keys.length; nth++) {
        const key = keys[nth];
        if (element[key]) {
          tree[1] = [];
          if (Array.recursiveFindIndex(fun, keys, [...element[key]], tree[1]))
            return tree;
        }
      }
    }
    return undefined;
  };

  Array.sortByList = function (list, arr, fun) {
    list.forEach((item) => {
      const sortIndex = arr.findIndex((ele) => fun(item, ele));
      item.sortIndex = sortIndex === -1 ? list.length : sortIndex;
    });
    list.sort(function (a, b) {
      return a.sortIndex - b.sortIndex;
    });
    return list;
  };

  Array.randomList = function (list) {
    const random = [];
    const length = list.length;
    for (let nth = 0; nth < length; nth++) {
      const index = Math.floor(Math.random() * (list.length - 1));
      random.push(list[index]);
      list.splice(index, 1);
    }
    return random;
  };

  Array.obtain = function (list, formatter, verdict) {
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
  };

  Array.obtainMin = function (list, formatter) {
    return Array.obtain(list, formatter, (value, item, index, list) => {
      return formatter(item, index, list) < value;
    });
  };

  Array.obtainMinLast = function (list, formatter) {
    return Array.obtain(list, formatter, (value, item, index, list) => {
      return formatter(item, index, list) <= value;
    });
  };

  Array.obtainMax = function (list, formatter) {
    return Array.obtain(list, formatter, (value, item, index, list) => {
      return formatter(item, index, list) > value;
    });
  };

  Array.obtainMaxLast = function (list, formatter) {
    return Array.obtain(list, formatter, (value, item, index, list) => {
      return formatter(item, index, list) >= value;
    });
  };
}
