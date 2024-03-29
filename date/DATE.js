
const year29 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const year28 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/**
 * 
 * format = '{y}{m}{d}{h}{i}{s}{c}'
 * y年
 * m月
 * d日
 * d天
 * h时
 * i分
 * s秒
 * c毫秒
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

let isUseDate = false

function useDate() {
  if (isUseDate) return;
  isUseDate = true;

  Date.prototype.isLeapYear = isLeapYear;

  Date.prototype.getMaxDayOfMonth = function (month) {
    const years = isLeapYear(this.getFullYear()) ? year29 : year28;
    let m = month || this.getMonth()
    return years[m]
  }

  Date.prototype.setEndMilliseconds = function () {
    this.setMilliseconds(999)
    return this;
  }


  Date.prototype.setEndSeconds = function () {
    this.setSeconds(59)
    return this;
  }

  Date.prototype.setEndMinutes = function () {
    this.setMinutes(59)
    return this;
  }

  Date.prototype.setEndHours = function () {
    this.setHours(23)
    return this;
  }

  Date.prototype.setEndDate = function () {
    const years = isLeapYear(this.getFullYear()) ? year29 : year28;
    const month = this.getMonth();
    this.setDate(years[month]);
    return this;
  }

  Date.prototype.setEndDay = function () {
    let day = this.getDay();
    day = day === 0 ? 7 : day;
    this.setAgo({ Date: 7 - day })
    return this;
  }

  Date.prototype.setEndMonth = function () {
    this.setMonth(11)
    return this;
  }

  Date.prototype.setEnd = function (format = '{m}{d}{h}{i}{s}{c}') {
    const arr = format.match(/{(y|m|d|h|i|s|a|c)+}/g).map(val => val.replace(/{|}/g, ''));
    const obj = {};
    arr.forEach((key) => obj[key] = true);
    if (obj.m) this.setEndMonth();
    if (obj.d) this.setEndDate();
    if (obj.h) this.setEndHours();
    if (obj.i) this.setEndMinutes();
    if (obj.s) this.setEndSeconds();
    if (obj.c) this.setEndMilliseconds();
    if (obj.a) this.setEndDay();
    return this;
  }

  Date.prototype.setStartMilliseconds = function () {
    this.setMilliseconds(0)
    return this;
  }

  Date.prototype.setStartSeconds = function () {
    this.setSeconds(0)
    return this;
  }

  Date.prototype.setStartMinutes = function () {
    this.setMinutes(0)
    return this;
  }

  Date.prototype.setStartHours = function () {
    this.setHours(0)
    return this;
  }

  Date.prototype.setStartDate = function () {
    this.setDate(1);
    return this;
  }

  Date.prototype.setStartDay = function () {
    let day = this.getDay();
    day = day === 0 ? 7 : day;
    day = day - 1;
    this.setAgo({ Date: -  day })
    return this;
  }

  Date.prototype.setStartMonth = function () {
    this.setMonth(0)
    return this;
  }

  Date.prototype.setStart = function (format = '{m}{d}{h}{i}{s}{c}') {
    const arr = format.match(/{(y|m|d|h|i|s|a|c)+}/g).map(val => val.replace(/{|}/g, ''));
    const obj = {};
    arr.forEach((key) => obj[key] = true);
    if (obj.m) this.setStartMonth();
    if (obj.d) this.setStartDate();
    if (obj.h) this.setStartHours();
    if (obj.i) this.setStartMinutes();
    if (obj.s) this.setStartSeconds();
    if (obj.c) this.setStartMilliseconds();
    if (obj.a) this.setStartDay();
    return this;
  }

  Date.prototype.setAgo = function (parms = {}) {

    let options = {
      FullYear: 0,
      Month: 0,
      Date: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
      Time: 0,
      Milliseconds: 0,
      Day: 0,
    };
    options = Object.assign(options, parms);
    const MothDay = isLeapYear(this.getFullYear()) ? year29 : year28;
    const currentDay = this.getDate();
    const optionMaxDay = MothDay[this.getMonth() + options.Month];
    if (optionMaxDay < currentDay) {
      this.setDate(optionMaxDay);
    } else this.setDate(this.getDate() + options.Date)
    for (const key in options) {
      if (Object.hasOwnProperty.call(options, key) && key !== 'Day' && key !== 'Date') {
        this[`set${key}`](this[`get${key}`]() + options[key]);
      }
    }
    if (options.Day) {
      this.setDate(currentDay - 7)
    }
    return this;
  }

  Date.prototype.formatter = function (cFormat = '{y}-{m}-{d} {h}:{i}:{s}:{c}') {
    const formatObj = {
      y: this.getFullYear(),
      m: this.getMonth() + 1,
      d: this.getDate(),
      h: this.getHours(),
      i: this.getMinutes(),
      s: this.getSeconds(),
      a: this.getDay(),
      c: this.getMilliseconds(),
      w: this.getWeek(),
    };
    const timeStr = cFormat.replace(/{(y|m|d|h|i|s|a|c|w)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
    return timeStr;
  }

  Date.prototype.fomatter = Date.prototype.formatter;

  Date.prototype.format = function (cFormat = '{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}:{c}') {
    const formatObj = {
      yyyy: this.getFullYear(),
      mm: this.getMonth() + 1,
      dd: this.getDate(),
      hh: this.getHours(),
      ii: this.getMinutes(),
      ss: this.getSeconds(),
      a: this.getDay(),
      c: this.getMilliseconds(),
      w: this.getWeek(),
    };
    const timeStr = cFormat.replace(/{(yyyy|mm|dd|hh|ii|ss|a|c|w)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
    return timeStr;
  }

  Date.surplusTime = function (endTime, option) {
    const end = new Date(endTime);
    const now = Date.now();
    const time = endTime - now;
    const days = parseInt(time / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
    let hours = parseInt(time / 1000 / 60 / 60, 10); // 计算剩余的小时
    let minutes = parseInt((time / 1000 / 60) % 60, 10); // 计算剩余的分钟
    let seconds = parseInt((time / 1000) % 60, 10); // 计算剩余的秒数
    // const y = end.getFullYear() - now.getFullYear();
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    return `${hours}时${minutes}分${seconds}秒`;
  }

  Date.formatterDate = function (stringTime, format = '{y}/{m}/{d} {h}:{i}:{s}:{c}') {
    const date = new Date();
    if (!stringTime) return date
    let timeObj = {
      Year: date.getFullYear(),
      Date: date.getDate(),
      Hours: date.getHours(),
      Minutes: date.getMinutes(),
      Seconds: date.getSeconds(),
      Day: date.getDay(),
      Milliseconds: date.getMilliseconds(),
      Month: date.getMonth(),
      Week: null,
    };
    let regExp = [
      { format: 'y', type: 'Year', def: 0 },
      { format: 'm', type: 'Month', def: 0 },
      { format: 'd', type: 'Date', def: 1 },
      { format: 'h', type: 'Hours', def: 0 },
      { format: 'i', type: 'Minutes', def: 0 },
      { format: 's', type: 'Seconds', def: 0 },
      { format: 'c', type: 'Milliseconds', def: 0 },
      { format: 'a', type: 'Day', def: 0 },
      { format: 'w', type: 'Week', def: 0 },
    ]
    let nth = 0;
    let arr = [];
    let current = {};
    for (let index = 0; index < format.length; index++) {
      const str = format[index];
      if (str === '{') {
        arr[0] = index - nth
        nth++;
      }
      if (arr.length && regExp.some(v => v.format === str)) {
        let reg = regExp.find(v => v.format === str)
        current.type = reg.type;
        current.def = reg.def;
      }
      if (str === '}') {
        arr[1] = index - nth;
        nth++;
        current.value = stringTime.slice(...arr) || current.def;
        current.slice = arr;
        if (current.type === 'Month') timeObj[current.type] = current.value * 1 - 1;
        else timeObj[current.type] = current.value * 1;
        arr = [];
        current = {};
      }
    }
    let maxDate = date.getMaxDayOfMonth(timeObj.Month)
    if (timeObj.Date > maxDate) timeObj.Date = maxDate
    for (const key in timeObj) {
      if (Object.hasOwnProperty.call(timeObj, key)) {
        try {
          date['set' + key](timeObj[key]);
        } catch (error) {

        }
      }
    }
    return date;
  }

  Date.fomatterDate = Date.formatterDate;

  Date.prototype.getChineseDay = function () {
    let d = this.getDay();
    if (d === 0) d = 7;
    return d;
  }

  // TODO 各框架算法不同
  Date.prototype.setWeek = function (num) {
    if (typeof num !== "number") return this;
    this.setStart();
    let day = this.getChineseDay();
    let repairDay = 7 - day;
    if (day === 1) repairDay = 0;
    let time = this.getTime();
    let weekTime = num * 7 * 24 * 60 * 60 * 1000 -1;
    let t = time + weekTime;
    this.setTime(t);
    return this
  };

  // TODO 各框架算法不同
  Date.prototype.getWeek = function () {
    let ct = this.getTime();
    let cy = this.getFullYear();

    let da = new Date();
    da.setFullYear(cy);
    da.setStart();
    let tt = da.getTime();
    let day = da.getChineseDay();
    let repairDay = 7 - day;
    if (day === 1) repairDay = 0;
    let repairT = repairDay * 24 * 60 * 60 * 1000;

    let nth = Math.abs(ct - tt) / 1000 / 60 / 60 / 24 / 7;
    return Math.ceil(nth)
  };

  Date.formatTime = function formatTime(time, format = '{y}/{m}/{d} {h}:{i}:{s}:{c}') {
    const formatObj = {
      // y: this.getFullYear(),
      // m: this.getMonth() + 1,
      d: 0,
      h: 0,
      i: 0,
      s: 0,
      // c: this.getMilliseconds(),
      // a: this.getDay(),
      // w: this.getWeek(),
      setd() {
        formatObj.d = Math.floor(time / (24 * 60 * 60 * 1000));
      },
      seth() {
        formatObj.h = Math.floor(time / (60 * 60 * 1000) - formatObj.d * 24);
      },
      seti() {
        formatObj.i = Math.floor(time / (60 * 1000) - formatObj.d * 24 * 60 - formatObj.h * 60);
      },
      sets() {
        formatObj.s = Math.floor(time / 1000 - formatObj.d * 86400 - formatObj.h * 3600 - formatObj.i * 60);
      },
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a|c|w)+}/g, (result, key) => {
      let fun = formatObj[`set${key}`];
      if (fun) fun();
      let val = formatObj[key];
      return val || 0;
    });
    return timeStr;
  };


}

let DATE = Date;
export { useDate, DATE }




