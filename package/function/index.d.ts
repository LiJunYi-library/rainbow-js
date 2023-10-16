declare type Overload = {
  addimpl: {
    (fun: Function): any;
    (type: string, fun: Function): any;
    (type: string[], fun: Function): any;
  };
};

declare type OverloadCB = (overload: Overload) => void;

export declare function createOverload(overloadCB: OverloadCB): Function;
