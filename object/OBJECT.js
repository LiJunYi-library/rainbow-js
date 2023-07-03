
let OBJECT = Object;

export { OBJECT }


//TODO  这个方法没用到过
export function objectFilter(object = {}, regExp, isDelete) {
  let o = {};
  for (const key in object) {
    if (object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (regExp.test(key)) {
        let pro = key.replace(regExp, "");
        o[pro] = element;
        if (isDelete) delete object[key];
      }
    }
  }
  return o;
}

// export function useConstructor() {
//   Object.filter = objectFilter
// }

// export function usePrototype() {
//   Object.prototype.objectFilter = function (regExp, isDelete) {
//     objectFilter(this, regExp, isDelete)
//   }
// }

export function useObject() {
  Object.prototype.isEmpty = function () {
    return !Object.keys(this).length
  }
}




export function merge(target = {}, source = {}) {
  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      const targetEle = target[key];
      const sourceEle = source[key];
      // console.log('key', key);
      // console.log('targetEle', targetEle);
      // console.log('sourceEle', sourceEle);
      // if (key === 'series') {
      //   console.log('key', key);
      //   console.log('targetEle', targetEle);
      //   console.log('sourceEle', sourceEle);
      // }
      (() => {
        if (!sourceEle) {
          target[key] = sourceEle
          return
        }

        if (typeof sourceEle !== 'object') {
          target[key] = sourceEle
          return
        }

        if (typeof sourceEle === 'object' && !targetEle) {
          target[key] = sourceEle
          return
        }

        if (typeof targetEle === 'object' && typeof sourceEle === 'object') {
          merge(targetEle, sourceEle)
        }

      })()

    }
  }
  return target
}