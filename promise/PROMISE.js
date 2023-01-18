export class Queue {
  constructor(obj = {}) {
    this.callBack = obj.callBack;
    this.thenCallBack = obj.thenCallBack;
    this.catchCallBack = obj.catchCallBack;
    this.finalCallBack = obj.finalCallBack;
    this.abortCallBack = obj.finalCallBack;
    this.loading = true;
    this.callBack(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(...arg) {
    if (this.loading === false) return;
    if (this.thenCallBack) this.thenCallBack(...arg);
    if (this.finalCallBack) this.finalCallBack(...arg);
    this.loading = false;
  }
  reject(...arg) {
    if (this.loading === false) return;
    if (this.catchCallBack) this.catchCallBack(...arg);
    if (this.finalCallBack) this.finalCallBack(...arg);
    this.loading = false;
  }

  then(thenCallBack) {
    this.thenCallBack = thenCallBack;
    return this;
  }
  catch(catchCallBack) {
    this.catchCallBack = catchCallBack;
    return this;
  }
  finally(finalCallBack) {
    this.finalCallBack = finalCallBack;
    return this;
  }

  abort(abortCallBack, ...arg) {
    this.abortArg = [...arg];
    this.abortCallBack = abortCallBack;
    return this;
  }

  termination() {
    this.loading = false;
    if (this.abortCallBack) this.abortCallBack(...this.abortArg);
  }
}

export function QueuePromise(callBack) {
  var currentQueue, prveQueue;
  var callBack = callBack;

  Object.defineProperties(this, {
    then: {
      value: (thenCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          prveQueue.termination();
        }
        currentQueue = new Queue({ callBack, thenCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
    catch: {
      value: (catchCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          prveQueue.termination();
        }
        currentQueue = new Queue({ callBack, catchCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
    finally: {
      value: (finalCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          prveQueue.termination();
        }
        currentQueue = new Queue({ callBack, finalCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
  });

}

export function mergePageEvent(time = 0) {
  return new QueuePromise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
}

export function mergeEvent(time = 0) {
  return new QueuePromise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
}




export function AwaitPromise(callBack) {
  var currentQueue, prveQueue;
  var callBack = callBack;

  Object.defineProperties(this, {
    then: {
      value: (thenCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          return
        }
        currentQueue = new Queue({ callBack, thenCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
    catch: {
      value: (catchCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          return
        }
        currentQueue = new Queue({ callBack, catchCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
    finally: {
      value: (finalCallBack) => {
        if (prveQueue && prveQueue.loading === true) {
          return
        }
        currentQueue = new Queue({ callBack, finalCallBack });
        prveQueue = currentQueue;
        return currentQueue;
      }
    },
  });

}


