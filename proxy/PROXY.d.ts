

type BaseVue = any;

type Fun = (...arg: any) => any;

export declare type ApplayInstance = {
  (...params: any | undefined): any;
  onApply?: Fun;
  afterApply?: Fun;
  onApplyListener?: Fun[];
  afterApplyListener?: Fun[];
  addOnApplyListener: (fun: Fun) => void;
  removeOnApplyListener: (fun: Fun) => void;
  addAfterApplyListener: (fun: Fun) => void;
  removeAfterApplyListener: (fun: Fun) => void;
};

export declare function applay(func: Fun, target?: any,): ApplayInstance


export declare type ApplyInstance = {
  (...params: any | undefined): any;
  onApply?: Fun;
  afterApply?: Fun;
  onApplyListener?: Fun[];
  afterApplyListener?: Fun[];
  addOnApplyListener: (fun: Fun) => void;
  removeOnApplyListener: (fun: Fun) => void;
  addAfterApplyListener: (fun: Fun) => void;
  removeAfterApplyListener: (fun: Fun) => void;
};

export declare function apply(func: Fun, target?: any,): ApplyInstance


