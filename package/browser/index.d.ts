
declare type ResizeObserverEntry = any
declare type ResizeObserver = any

export declare type R_resizeObserverProps = {
  isOnce?: boolean,
  isMerge?: boolean,
  mergeTime?: number,
}

// export declare interface ResizeObserver {
//   disconnect(): void;
//   observe(target: Element, options?: ResizeObserverOptions): void;
//   unobserve(target: Element): void;
// }

export declare type R_resizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void

export declare function r_resizeObserver(
  htmlNode: HTMLElement | undefined,
  callBack: R_resizeObserverCallback,
  props?: R_resizeObserverProps,
): ResizeObserver

export declare function r_onceResizeObserver(
  htmlNode: HTMLElement | undefined,
  callBack: R_resizeObserverCallback,
  props?: R_resizeObserverProps,
): ResizeObserver

export declare function r_mergeResizeObserver(
  htmlNode: HTMLElement | undefined,
  callBack: R_resizeObserverCallback,
  props?: R_resizeObserverProps,
): ResizeObserver

