/**
 * Created by on 16/11/18.
 */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return "";
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url === null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}


/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) !== null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  })).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];

  return search && JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
   giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}


export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export const pickerOptions = [{
  text: '今天',
  onClick(picker) {
    const end = new Date();
    const start = new Date(new Date().toDateString());
    end.setTime(start.getTime());
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    picker.$emit('pick', [start, end]);
  }
}]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function validate(reg, value, callback, errorMsg) {
  if (value == "") {
    callback();
  }
  if (reg.test(value) == false) {
    callback(new Error(errorMsg));
  } else {
    callback();
  }
}
/**
 * 将json转为url参数
 */
export function serializeHttpParam(param, key) {
  var paramStr = "";
  if (!param) return paramStr;
  if (param instanceof String || param instanceof Number || param instanceof Boolean) {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else {
    $.each(param, function (i) {
      let k = !key ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += '&' + serializeHttpParam(new String(this), k);
    });
  }
  return paramStr.substr(1);
}

/**
 * date2Integer
 * @param dateStr: 'yyyy-MM-dd'
 * @param spliter
 * @returns {Number}
 */
export function date2Integer(dateStr, spliter) {
  if (!dateStr || !parseInt(dateStr)) return 0;
  spliter = spliter || '-';
  let date = dateStr.split(spliter).join('');
  return parseInt(date);
}

/**
 * array 2 treearray
 * @param strArray: 'yyyy-MM-dd'
 * @param idStr
 * @param pidStr '父节点'
 * @returns {Array}
 */
export function arrayToTreeArray(orginArray, idStr, pidStr, childrenStr) {
  let strArray = JSON.parse(JSON.stringify(orginArray));
  let destArray = [],
    hash = {},
    id = idStr,
    pid = pidStr,
    children = childrenStr,
    i = 0,
    j = 0,
    len = strArray.length;
  for (; i < len; i++) {
    hash[strArray[i][id]] = strArray[i];
  }
  for (; j < len; j++) {
    let aVal = strArray[j],
      hashVP = hash[aVal[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(aVal);
    } else {
      destArray.push(aVal);
    }
  }
  return destArray;
}

/**
 * html2pdf
 * @param dom
 * @param filename
 * @returns
 */
export function html2pdf(dom, filename) {
  html2canvas(dom).then(canvas => {
    var pageData = canvas.toDataURL("image/jpeg", 1.0);
    //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
    var pdf = new jsPDF("", "pt", "a4");
    //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
    pdf.addImage(
      pageData,
      "JPEG",
      0,
      0,
      595.28,
      592.28 / canvas.width * canvas.height
    );
    pdf.save(filename + ".pdf");
  });
}


/**
 * ip to number
 * @param ip
 * @returns
 */
export function ip2number(ip) {
  var arr = ip.split(".");
  return (
    256 * 256 * 256 * parseInt(arr[0]) +
    256 * 256 * parseInt(arr[1]) +
    256 * parseInt(arr[2]) +
    parseInt(arr[3])
  );
}
/**
 * ip to number
 * @param roleAuthority 
 * @param roleid
 * @returns Booleans
 */
export function checkPermission(roleAuthority,roleid) {
  let roleAuthorityArr=roleAuthority.split(",");
  let len=roleAuthorityArr.length;
  let flag;
  for(let i=0;i<len;i++) {
    if(roleAuthorityArr[i]===roleid) {
      flag = true;
      break;
    }
  }
  return flag;
}