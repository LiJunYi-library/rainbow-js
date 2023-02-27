

export declare class QueuePromise {
  constructor(callBack: (
    resolve: (res: any) => void,
    reject: (res: any) => void,
  ) => void)
  then(res: any): QueuePromise
  catch(res: any): QueuePromise
  finally(res: any): QueuePromise
}

export declare class Queue {

}

export declare function mergeEvent(time?: number): QueuePromise

/**
 * 废弃
 */
export declare function mergePageEvent(time?: number): QueuePromise
