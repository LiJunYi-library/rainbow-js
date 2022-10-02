export function apply(func, target) {
  const method = function (...params) {
    if (!target) return func(...params);
    return func.call(target, ...params);
  };
  method.lock = false;
  method.onApplyListener = [];
  method.afterApplyListener = [];
  method.addOnApplyListener = (fun) => {
    if (!method.onApplyListener) return;
    method.onApplyListener.push(fun);
  };
  method.removeOnApplyListener = (fun) => {
    if (!method.onApplyListener) return;
    const index = method.onApplyListener.findIndex(el => el === fun);
    if (index !== -1) method.onApplyListener.splice(index, 1);
  };
  method.addAfterApplyListener = (fun) => {
    if (!method.afterApplyListener) return;
    method.afterApplyListener.push(fun);
  };
  method.removeAfterApplyListener = (fun) => {
    if (!method.afterApplyListener) return;
    const index = method.afterApplyListener.findIndex(el => el === fun);
    if (index !== -1) method.afterApplyListener.splice(index, 1);
  };
  return new Proxy(method, {
    apply(thisTarget, thisArg, argumentsList = []) {
      if (thisTarget.onApply) thisTarget.onApply(thisArg, argumentsList);
      if (thisTarget.onApplyListener) {
        thisTarget.onApplyListener.forEach((fun) => {
          fun(thisTarget, thisArg, argumentsList);
        });
      }
      if (thisTarget.lock === true) return;
      const res = thisTarget.apply(thisArg, argumentsList);
      if (thisTarget.afterApply) thisTarget.afterApply(res, thisArg, argumentsList);
      if (thisTarget.afterApplyListener) {
        thisTarget.afterApplyListener.forEach((fun) => {
          fun(res, thisTarget, thisArg, argumentsList);
        });
      }
      return res;
    },
  });
}

let applay = apply;

export { applay }








