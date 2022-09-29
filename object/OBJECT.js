
//TODO  这个方法没用到过
function objectFilter(object = {}, regExp, isDelete) {
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

function useConstructor() {
  Object.filter = objectFilter
}

function usePrototype() {
  Object.prototype.objectFilter = function (regExp, isDelete) {
    objectFilter(this, regExp, isDelete)
  }
}




function useObject() {
  Object.prototype.isEmpty = function () {
    return !Object.keys(this).length
  }
}





let OBJECT = Object;
export { useObject, OBJECT, objectFilter }
