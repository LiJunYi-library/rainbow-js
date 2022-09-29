declare function useArray(): void

declare function useConstructor(): void

declare class ARRAY extends Array {
  removeIndex(num: number): ARRAY[];
  remove(item: any): ARRAY;
  wipeRepetition(): ARRAY;
  splitIndex(num: number): number[];
  split(num: number): ARRAY[];

  static randomList<T>(list: T[]): T[];

  static recursiveFilter(fun: () => Boolean, keys: string[], list: []): ARRAY[];
  recursiveFilter(fun: () => Boolean, keys: string[],): ARRAY[];

  static recursiveFindIndex(fun: () => Boolean, keys: string[], list: [], tree: []): ARRAY[];
  recursiveFindIndex(fun: () => Boolean, keys: string[],): ARRAY[];

  static recursiveForEach(
    fun: (item: any, index: number, list: any[], parent: any, layer: number, roote: any[]) => any,
    keys: string[],
    recursive: () => any,
    list: []
  ): ARRAY[];
  recursiveForEach(
    fun: (item: any, index: number, list: any[], parent: any, layer: number, roote: any[]) => any,
    keys: string[],
    recursive: () => any
  ): ARRAY[];
}
export { ARRAY, useArray, useConstructor };