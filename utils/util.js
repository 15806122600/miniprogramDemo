const app = getApp();
let Code = '';

const formatTime = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeTwo = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let arr = [year, month, day, hour, minute, second]
  return arr;
}
const formatDate = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
const yearmonth = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  return year * 100 + month;
}
const year = date => {
  let year = date.getFullYear()
  return year;
}
const format2NewDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 3) {
    month = month + 12 - 3;
    year = year - 1;
  } else {
    month = month - 3;
  }
  console.log(year + "-" + month + "-" + day)
  return [year, month, day].map(formatNumber).join('/')
}
const formatDateT = (date, value) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = value
  return [year, month, day].map(formatNumber).join('/')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const js_date_time = unixtime => {
  var date = new Date(unixtime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute;

}

const alert = (msg, callBack) => {
  wx.showModal({
    content: msg,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        if (callBack) {
          callBack();
        }
      }
    }
  });
}

const toast = (msg, icon) => {
  if (!icon) {
    icon = 'none';
  }
  wx.showToast({
    title: msg,
    icon: icon,
    duration: 3000
  });
}
const showToast = (msg, icon = 'none', url, time = 2000) => {
  if (!icon) {
    icon = 'none';
  }
  wx.showToast({
    title: msg,
    icon: icon,
    duration: 2000,
    success: function () {
      setTimeout(function () {
        wx.switchTab({
          url: url,
        })
      }, time);
    }
  })
}
  
const showLoading = (msg) => {
  wx.showLoading({
    title: msg,
    mask: true
  });
}

const hideLoading = () => {
  wx.hideLoading();
}

const confirm = function (content, yes, no) {
  wx.showModal({
    title: '提示',
    content: content,
    confirmText: '确定',
    cancelText: '取消',
    success: function (res) {
      if (res.confirm) {
        if (yes) {
          yes();
        }
      } else {
        if (no) {
          no();
        }
      }
    }
  });
}

const trim = function (str) {
  // if (str && typeof(str) == 'string') {
  //   return str.replace(/(^\s+)|(\s+$)/g, '');
  // } else {
  //   return '';
  // }
  if (str != null) {
    return str.toString().replace(/(^\s+)|(\s+$)/g, '');
  } else {
    return '';
  }
}

const getDelphiColor = function (colorState) {
  if (colorState == '' || isNaN(colorState)) {
    return 'transparent';
  }

  colorState = parseInt(colorState);
  if (colorState < 0 || colorState > 4294967295) {
    return 'transparent';
  }

  colorState = colorState.toString(16).padStart(8, '0');
  let c = parseInt(colorState.substring(0, 2), 16);

  if (c == 1 || c == 255) {
    return 'transparent';
  }

  if (c == 128) {
    let r = colorState.substring(6, 8);
    let g = colorState.substring(4, 6);
    let b = colorState.substring(2, 4);
    return `#${r}${g}${b}`;
  } else {
    let r = parseInt(colorState.substring(6, 8), 16);
    let g = parseInt(colorState.substring(4, 6), 16);
    let b = parseInt(colorState.substring(2, 4), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

const checkInt = function (value) {
  if (!value) {
    return false;
  }
  value = trim(value);

  if (value == '' || isNaN(value) || value.indexOf('.') >= 0) {
    return false;
  } else {
    return true;
  }
}

const replace = function (str) {
  return str.replace('T', ' ')
}

//判断是否为正整数（>0）
const checkIntegerPositive = function (str) {
  return str.match(/^\s*0*[1-9]\d*\s*$/);
}

//判断是否为正整数（>=0）
const checkIntegerZero = function (str) {
  return str.match(/^\s*\d+\s*$/);
}

//判断是否为大于等于0的小数
const checkFloatZero = function (str, precision) {
  if (str.match(/^\s*\.\s*$/)) {
    return false;
  } else {
    let reg = new RegExp('^(\\s*\\d+\\s*)$|^(\\s*\\d*\\.\\d{0,' + precision + '}\\s*)$');
    return reg.test(str);
  }
}

const timeFormat = function (time) {
  var d = new Date(time); //加入substr(0, 19)处理兼容ios报错NAN
  var year = d.getFullYear(); //年  
  var month = d.getMonth() + 1; //月  
  var day = d.getDate(); //日  

  var hh = d.getHours(); //时  
  var mm = d.getMinutes(); //分  
  var ss = d.getSeconds(); //秒  

  var clock = year + "-";

  if (month < 10)
    clock += "0";

  clock += month + "-";

  if (day < 10)
    clock += "0";

  clock += day + " ";

  if (hh < 10)
    clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += '0';
  clock += mm + ":";

  if (ss < 10) clock += '0';
  clock += ss;
  return (clock);
};
/**
 * 获取本周周一的日期
 */
function getFirstDayOfWeek(date) {
  var day = date.getDay() || 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
};
/**
 * 获取当月第一天
 */
function getFirstDayOfMonth(date) {
  date.setDate(1);
  return timeFormat(date);
}

/**
 * 解析自定义二维码
 */
let getQueryString = function (url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

function getCode() {
  console.log("getCodesession:" + app.globalData.SessionID)
  wx.removeStorageSync('code');
  var self = this;
  return new Promise((resolve, reject) => {
    wx.login({
      complete: (res) => {
        app.globalData.code = res.code
        wx.setStorageSync('code', res.code)
        self.login(res.code)
        console.log(res)
      },
    })

  })
}

function deteleObject(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.sort(function (a, b) {
      return (Number(a) - Number(b));
    });
    var str = '';
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  uniques = uniques;
  return uniques;
}

function MergeArray(arr1, arr2) {
  var _arr = new Array();
  for (var i = 0; i < arr1.length; i++) {
    _arr.push(arr1[i]);
  }
  for (var i = 0; i < arr2.length; i++) {
    var flag = true;
    for (var j = 0; j < arr1.length; j++) {
      if (arr2[i].id == arr1[j].id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      _arr.push(arr2[i]);
    }
  }
  return _arr;
}

function removeArr(array, val) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == val) {
      array.splice(i, 1);
    }
  }
  return -1;
}

/*
 *获取指定日期的前一天，后一天
 *date 代表指定的日期，格式：2018-09-27
 *day 传-1表始前一天，传1表始后一天
 */
function getNextPreDate(date, day) {
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
};

const FibonacciOld = (n) => {
  if (n <= 1) return 1;
  return FibonacciOld(n - 1) + FibonacciOld(n - 2);
}

const Fibonacci = (n, sum1 = 1, sum2 = 1) => {
  if (n <= 1) return sum2;
  return Fibonacci(n - 1, sum2, sum1 + sum2)
}

module.exports = {
  FibonacciOld: FibonacciOld,
  Fibonacci: Fibonacci,
  getNextPreDate: getNextPreDate,
  timeFormat: timeFormat,
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  formatDate: formatDate,
  yearmonth: yearmonth,
  year: year,
  format2NewDate: format2NewDate,
  toast: toast,
  showToast: showToast,
  showLoading: showLoading,
  hideLoading: hideLoading,
  trim: trim,
  formatNumber: formatNumber,
  getDelphiColor: getDelphiColor,
  checkInt: checkInt,
  replace: replace,
  checkIntegerPositive: checkIntegerPositive, //判断是否为>0的整数
  checkIntegerZero: checkIntegerZero, //判断是否为>=0的整数
  checkFloatZero: checkFloatZero, //判断是否为>=0的小数
  confirm: confirm,
  formatDateT: formatDateT,
  js_date_time: js_date_time, //时间戳转日期，
  getFirstDayOfWeek: getFirstDayOfWeek,
  getFirstDayOfMonth: getFirstDayOfMonth,
  getQueryString: getQueryString,
  deteleObject: deteleObject,
  MergeArray: MergeArray,
  removeArr: removeArr
}