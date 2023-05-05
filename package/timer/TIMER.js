export function antiShake(callBack, t = 500) {
  let timer;
  let cb = (call) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("setTimeout...");
      call();
    }, t);
  };
  callBack(cb);
}