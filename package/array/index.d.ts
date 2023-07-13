export declare function arrayLoop(
  num: number,
  cb: (index: number) => boolean
): void;

export declare function arrayLoopMap<T>(
  num: number,
  cb: (index: number) => T
): T[];

export declare function arrayBubble<T>(
  list: T[],
  formatter: (item: T, index: number, list: T[]) => unknown,
  verdict: (value: unknown, item: T, index: number, list: T[]) => boolean
): T;

export declare function arrayBubbleMin<T>(
  list: T[],
  formatter: (item: T, index: number, list: T[]) => unknown
): T;

export declare function arrayBubbleLastMin<T>(
  list: T[],
  formatter: (item: T, index: number, list: T[]) => unknown
): T;

export declare function arrayBubbleMax<T>(
  list: T[],
  formatter: (item: T, index: number, list: T[]) => unknown
): T;

export declare function arrayBubbleLastMax<T>(
  list: T[],
  formatter: (item: T, index: number, list: T[]) => unknown
): T;



// export declare function findMin<T>(
//   list: T[],
//   formatter: (item: T, index: number, list: T[]) => any
// ): T;
