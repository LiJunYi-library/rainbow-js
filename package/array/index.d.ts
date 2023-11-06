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

export declare function arrayRemoveIndex<T>(list: T[], num: number): T[];

/**
 * 删除数组中第一个找到的item 改变数组
 */
export declare function arrayRemove<T>(list: T[], item: T): T[];

export declare function arrayRemoveLast<T>(list: T[], item: T): T[];

export declare function arrayRemoves<T>(list: T[], item: T): T[];

export declare function arraySplitIndex<T>(list: T[], num: number): number[][];

export declare function arraySplit<T>(list: T[], num: number): T[][];

export declare function arrayWipeRepetition<T>(
  list: T[],
  formatter: (item: T, index: number) => unknown
): T[];

export declare function arrayWipeRepetitionLast<T>(
  list: T[],
  formatter: (item: T, index: number) => unknown
): T[];

export declare function arrayWipeRepetitionLast<T>(
  list: T[],
  formatter: (item: T, index: number) => unknown
): T[];

export declare function arrayExtractSame<T>(
  list: T[],
  formatter: (item: T, index: number) => unknown
): T[];

export declare function arraySortByList<T, H>(
  list: T[],
  arr: H[],
  formatter: (item: T, ele: H) => boolean
): T[];

export declare function arrayRandom<T>(list: T[]): T[];
