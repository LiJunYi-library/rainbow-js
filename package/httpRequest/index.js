var request;
export { mFetch, request };

function parseParams(object) {
  if (!object) return "";
  if (typeof object !== "object") return object;
  if (!Object.keys(object).length) return "";
  let str = "";
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      let element = object[key];
      if (typeof element === "object") {
        if (element instanceof Array) element = element.toString();
        else element = JSON.stringify(element);
      }
      if (element === undefined) continue;
      if (element + "" === "NaN") element = null;
      str += `${key}=${element}&`;
    }
  }
  str = str.slice(0, -1);
  return `?${str}`;
}

function mergeRequestInit(source = {}, target = {}) {
  let propertys = [
    "body",
    "cache",
    "credentials",
    "headers",
    "integrity",
    "keepalive",
    "method",
    "mode",
    "redirect",
    "referrer",
    "referrerPolicy",
    "signal",
    "window",
  ];
  let newObj = {};
  propertys.forEach((key) => {
    const val = source[key] || target[key];
    if (val !== undefined) newObj[key] = val;
  });
  return newObj;
}

function getFetchProps(...args) {
  let options = {
    method: "get",
    contentType: "application/json",
  };
  let propertys = ["url", "body", "method", "contentType", "headers"];
  if (args && args.length === 1 && typeof args[0] === "object") {
    options = { options, ...args[0] };
  } else {
    propertys.forEach((key, index) => {
      if (args[index] !== undefined) options[key] = args[index];
    });
  }
  //
  //
  //
  let config = {
    interceptRequest: () => undefined,
    interceptResponse: () => undefined,
    formatterResponse: async (response) => {
      return await response.json();
    },
    formatterStatus: () => [200],
    ...options,
    headers: {
      "Content-Type": options.contentType,
      ...options.headers,
    },
  };

  return config;
}

function resolveRequestInit(options = {}) {
  const methods = ["get", "head"];
  if (methods.includes(options.method)) {
    options.urlParams = { ...options.body };
    options.body = undefined;
  }

  const urlParams = parseParams(options.urlParams);
  if (options.url && urlParams !== "") {
    options.url = options.url + urlParams;
  }

  const jsonContentType = ["application/json"];
  if (
    options.body !== undefined &&
    jsonContentType.includes(options.contentType) &&
    typeof options.body !== "string"
  ) {
    options.body = JSON.stringify(options.body);
  }
}

function baseFetch(...args) {
  const props = getFetchProps(...args);
  // console.log("baseFetch props", props);
  let controller = new AbortController();
  let loading = false;
  let proxy = {
    send,
    awaitSend,
    nextSend,
    abort,
  };

  function send(...argumentS) {
    controller = new AbortController();
    const config = {
      ...props,
      ...getFetchProps(...argumentS),
    };
    resolveRequestInit(config);
    // console.log("baseFetch config", config);
    const requestInit = mergeRequestInit(config, {
      signal: controller.signal,
    });
    // console.log("baseFetch requestInit", requestInit);

    return new Promise((resolve, reject) => {
      config.interceptRequest({ config, requestInit, resolve, reject });
      fetch(config.url, requestInit)
        .then(async (response) => {
          let data;
          if (config.formatterStatus().includes(response.status)) {
            try {
              data = await config.formatterResponse(response);
              resolve(data);
            } catch (error) {
              console.error(error);
            }
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          // console.log(error.code  20);
          reject(error);
        });
    });
  }

  function abort() {
    if (!controller) return proxy;
    controller.abort();
    return proxy;
  }

  function awaitSend(...arg) {
    if (loading === true) {
      console.error("正在请求");
      return;
    }
    loading = true;
    return send(...arg).finally(() => {
      loading = false;
    });
  }

  function nextSend(...arg) {
    abort();
    return send(...arg);
  }

  return proxy;
}

function mFetch(...props) {
  return baseFetch(...props);
}

function createHttpRequest(){
  
}

const get = (...arg) => mFetch(...arg).send();

const nextGet = (...arg) => mFetch(...arg).nextSend();
const awaitGet = (...arg) => mFetch(...arg).awaitSend();
request = { get, nextGet, awaitGet };
