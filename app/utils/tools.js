/**
 * tools.js
 */
import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import constants from "../resources/constants";
import Toast from "react-native-root-toast";

export function isObject(obj) {
  return typeof obj === 'object';
}

export function isEmptyObject(obj) {
  return (obj === null) || (obj === undefined) || (obj === "") || (Object.keys(obj).length === 0 && obj.constructor === Object);
}

export function isTheSameOfKeys(obj, objToCompare, keys: [string]) {
  let result : boolean = true;
  keys.forEach((key) => {
    if (obj[key] !== objToCompare[key]) {
      result = false;
    }
  });
  return result;
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function separateNumber(string: string) {
  const isNum = (char: string) => (numbers.includes(char) || char === '+');

  for (let i = 0; i < string.length - 1; i++) {
    const char = string.charAt(i);
    const chatNext = string.charAt(i + 1);
    const same = isNum(char) === isNum(chatNext);
    if (!same) {
      return [string.substr(0, i + 1), ...separateNumber(string.substring(i + 1, string.length))];
    }
  }
  return [string];
}

export function px2rw(width: number) {
  return Math.round(width / 375 * SCREEN_WIDTH);
}

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export function isWordEqual(word, spilted) {
  if (!spilted) {
    return false;
  }

  spilted = spilted.toLowerCase();
  if (spilted.includes(word)) {
    const wordLength = word.length;
    const spiltedLength = spilted.length;
    if (wordLength > spiltedLength - 2) {
      return true;
    }
  }
  return false;
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function isPropShadowEqual(preProps, props, propNameList = []) {
  let result = true;
  propNameList.forEach((name) => {
    if (preProps[name] !== props[name]) {
      result = false;
    }
  });
  return result;
}

export function getPronounceUrl(baseUrl: String, config): String {
  const gender = config.voiceType === 'woman'
    ? 'FEMALE'
    : config.voiceType === 'man'
      ? 'MALE'
      : Math.random() > 0.5 ? 'FEMALE' : 'MALE';
  const languageCode = config.accent === 'American' ? 'en-US' : 'en-GB';
  return `${baseUrl}?text=${config.word}&languageCode=${languageCode}&gender=${gender}&speed=${config.speed || 1}`;
}

export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';

export const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height += DeviceInfo.isIPhoneX_deprecated && orientation === PORTRAIT ? 24 : 0;

  return height;
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
export const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 32;
  }
  return Header.HEIGHT;
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};

export const getTabBarHeight = () => {
  return Platform.OS === 'ios' ? 65 : 70;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function filterIllegalCharactor(value) {
  return value.replace(/ |　/, '');
}

export function isTextChinese(value) {
  return !(/^[a-zA-Z]/.test(value));
}

// 计算百分比
export function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
}

//数组 计算百分比
export function GetPercentList(dataList) {

  var total = 0;
  var percentList = [];
  for(var i=0;i<dataList.length;i++)total += dataList[i];
  for(var i=0;i<dataList.length;i++){
    percentList.push(GetPercent(dataList[i],total));
  }
  return percentList;
}

// 将类型id转换为类型名称
export function _switchrubroIdxTorubro(rubroIdx){
  switch (rubroIdx) {
    case 1:return constants.TYPE_1;
    case 2:return constants.TYPE_2;
    case 3:return constants.TYPE_3;
    case 4:return constants.TYPE_4;
  }
}

export function removeItemFromList(list,item) {
  var index=-1;
  list.map((listItem, i) => {
    if(listItem.id==item.id){
      index = i;
    }
  });
  if(index!==-1){
    list.splice(index, 1);
    return list;
  }
}

export function addMember(list,item) {
  list = [...list,item];
  return list;
}

export function replaceMember(list,item,idx) {
  // idx 删除起始位置
  // n 删除元素个数
  // item 替换元素
  list = list.splice(idx,1,item);
  return list;
}

export function  updateCartInfo(cartInfo, cartInfoItem){
  var idx = -1;
  var updateCartInfo;
  cartInfo.map((item,i)=>{
    if(item.itemId === cartInfoItem.itemId){
      idx = i;
    }
  });
  if(idx === -1)updateCartInfo = [...cartInfo,cartInfoItem];
  else if(cartInfoItem.amount > 0){
    cartInfo.splice(idx,1,cartInfoItem);
    updateCartInfo = cartInfo;
  }else{
    cartInfo.splice(idx,1);
    updateCartInfo = cartInfo;
  }
  return updateCartInfo;
}

export function getNow() {
  var date = new Date();

  var year = date.getFullYear().toString();
  var month = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  var hour =  date.getHours().toString();
  var minute = date.getMinutes().toString();

  return year+'-'+month+'-'+day+' '+hour+':'+minute;
};

export function showCenterToast(message){
  Toast.show(message, {duration: Toast.durations.SHORT,position: Toast.positions.CENTER,});
}

export function showBottomToast(message){
  Toast.show(message, {duration: Toast.durations.SHORT,position: Toast.positions.BOTTOM,});
}

export function transFromOrderItemToArray(orderItem) {
  var array = [];
  array.push(orderItem.nombre);
  array.push(orderItem.amount);
  array.push(toDecimal2(orderItem.price));
  array.push(toDecimal2(orderItem.total));
  return array;
}

export function transFromDiscountItemToArray(discountItem) {
  var array = [];
  array.push(discountItem.nombre);
  array.push(discountItem.amount);
  array.push(toDecimal2(discountItem.discount));
  return array;
}

export function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
