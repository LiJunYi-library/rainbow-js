import { stringUpperFirstCase } from "../string";

export function createObserve(keys = [], obse = {}) {
  const obj = {};

  keys.forEach((key) => {
    obj[key] = {
      set: undefined,
      get: undefined,
    };
  });

  const observe = {
    ...obj,
    ...obse,
  };

  const cache = {};
  const defineData = {};
  for (const key in observe) {
    if (Object.hasOwnProperty.call(observe, key)) {
      const observeEl = observe[key];
      cache[key] = undefined;
      defineData[key] = {
        set(v) {
          cache[key] = v;
          if (observeEl.set) observeEl.set(v);
        },
        get() {
          if (observeEl.get) return observeEl.get();
          return cache[key];
        },
        configurable: true,
      };
    }
  }

  Object.defineProperties(this, {
    ...defineData,
  });
  return { observe, cache, defineData };
}

export function setConfig(config) {
  return Object.defineProperties(this, {
    config: {
      value: config,
      writable: true,
    },
  });
}

class Promise {
  constructor(props = Promise.defaultProps) {
    setConfig.call(this, { ...Promise.defaultProps, ...props });
    createObserve.call(this, ["data", "loading", "error"], props.observe);
  }
}
Promise.defaultProps = {};
console.log(new Promise());
console.log("");
console.log("");

const selectProps = {
  selectType: "radio", //'multi' 'radio'
  cancelSame: false, // 是否取消相同的
  data: [],
  list: [],
  formatterValue: (el) => el && el.id,
  formatterLabel: (el) => el && el.label,
  formatterList: (data) => {
    if (!data) return [];
    if (data instanceof Array) return data;
    return data.list;
  },
};

class Radio {
  constructor(props = selectProps) {
    // setConfig.call(this, { ...selectProps, ...props });
    // createObserve.call(
    //   this,
    //   ["select", "index", "value", "label", "list"],
    //   props.observe
    // );

    this.list = props.list;
  }

  same(item) {
    return this.select === item;
  }

  onSelect(item, index) {
    const { formatterLabel, formatterValue } = this.config;
    this.select = item;
    this.index = index;
    this.label = formatterLabel(item);
    this.value = formatterValue(item);
    // console.log("radioPrototype onSelect", this);
  }

  setValue() {
    //
  }

  setList() {
    //
  }

  setLabel() {
    //
  }

  setIndex() {
    //
  }

  setSelect() {
    //
  }
}

console.log(new Radio());
console.log("");
console.log("");

export class List extends Radio {
  constructor(props = List.defaultProps) {
    const config = { ...List.defaultProps, ...props };

    const obsData = {
      select: undefined,
      index: undefined,
      value: undefined,
      label: undefined,
      list: undefined,
      data: undefined,
    };
    config.init({});
    super(config);

    // createObserve.call(
    //   this,
    //   ["list", "currentPage", "pageSize", "total", "finished"],
    //   props.observe
    // );

    // this.data = props.data;
    // this.list = this.data;
    console.log(props.data, this);
    // Object.defineProperties(this.constructor.prototype, {
    //   config: {
    //     value: config,
    //   },
    //   selectType: {
    //     value: config.selectType,
    //   },
    //   data: {
    //     value: config.data,
    //     writable: true,
    //   },
    //   select: {
    //     // value: config.select,
    //     set(v) {
    //       //   select = v;
    //       config?.setSelect?.(v);
    //     },
    //     get() {
    //       if (config.getSelect) return config.getSelect();
    //       return "select";
    //     },
    //   },
    //   value: {
    //     value: config.value,
    //     writable: true,
    //   },
    //   formatterValue: {
    //     value: config.formatterValue,
    //   },
    //   label: {
    //     value: config.label,
    //     writable: true,
    //   },
    //   formatterLabel: {
    //     value: config.formatterLabel,
    //   },
    //   list: {
    //     value: config.list || config.formatterList(config.data),
    //     writable: true,
    //   },
    //   formatterList: {
    //     value: config.formatterList,
    //   },
    // });

    // eslint-disable-next-line
    // const self = this;

    // const radioPrototype = {
    //   onSelect: (item, index) => {
    //     const { formatterLabel, formatterValue } = this.config;
    //     this.select = item;
    //     this.index = index;
    //     this.label = formatterLabel(item);
    //     this.value = formatterValue(item);
    //     // console.log("radioPrototype onSelect", this);
    //   },
    //   same: (item) => {
    //     // console.log("radioPrototype same", this.select === item);
    //     return this.select === item;
    //   },
    // };

    // Object.defineProperties(this.constructor.prototype, {
    //   radio: {
    //     value: radioPrototype,
    //     writable: true,
    //   },
    // });
  }

  empty() {
    console.log("empty", this);

    this.list.splice(0, 5);
    // new this.constructor(this.config);
  }

  // same(...arg) {
  //   return this[this.selectType].same(...arg);
  // }

  // onSelect(...arg) {
  //   return this[this.selectType].onSelect(...arg);
  // }

  // MultiSame(item) {
  //   return this.select === item;
  // }

  // onMultiSelect(item, index) {
  //   console.log("onMultiSelect");
  //   //
  // }

  // radioSame(item) {
  //   console.log("radioSame", this.select === item);
  //   return this.select === item;
  // }

  // onRadioSelect(item, index) {
  //   const { formatterLabel, formatterValue } = this.config;
  //   this.select = item;
  //   this.index = index;
  //   this.label = formatterLabel(item);
  //   this.value = formatterValue(item);
  // }
}

List.defaultProps = {
  selectType: "radio", //'multi' 'radio'
  cancelSame: false, // 是否取消相同的
  data: [],
  list: [],
  formatterValue: (el) => el && el.id,
  formatterLabel: (el) => el && el.label,
  formatterList: (data) => {
    if (!data) return [];
    if (data instanceof Array) return data;
    return data.list;
  },
};
/**
 * data
 * id
 * formatterId
 * label
 * formatterLabel
 * list
 * formatterList
 * selectList
 *
 */
