
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

let OBJECT = Object;

export { OBJECT }