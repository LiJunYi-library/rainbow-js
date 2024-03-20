import { mergeEvent } from "../promise";
export * from './utils'
export * from './download'

export function r_resizeObserver(htmlNode, callBack, props = {}) {
  const { isOnce = false, isMerge = false, mergeTime = 60 } = props;
  if (!htmlNode) return console.error("htmlNode is necessary");
  let timer;
  if (isMerge) timer = mergeEvent(mergeTime);
  const resizeObserver = new ResizeObserver(async (...arg) => {
    if (timer) await timer;
    callBack(...arg);
    if (isOnce) resizeObserver.disconnect();
  });
  resizeObserver.observe(htmlNode);
  return resizeObserver;
}

export function r_onceResizeObserver(htmlNode, callBack, props = {}) {
  return r_resizeObserver(htmlNode, callBack, { isOnce: true, ...props });
}

export function r_mergeResizeObserver(htmlNode, callBack, props = {}) {
  return r_resizeObserver(htmlNode, callBack, { isMerge: true, ...props });
}

