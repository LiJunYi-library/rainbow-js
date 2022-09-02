function useObject() {

  Object.prototype.isEmpty = function () {
    return !Object.keys(this).length
  }
}

let OBJECT = Object;
export { useObject, OBJECT }
