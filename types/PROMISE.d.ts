

declare class QueuePromise {
  constructor(callBack: (
    resolve: (res: any) => void,
    reject: (res: any) => void,
  ) => void)
  then(res: any): QueuePromise
  catch(res: any): QueuePromise
  finally(res: any): QueuePromise
}

declare class Queue {

}

export { QueuePromise, Queue };