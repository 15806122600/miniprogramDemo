/**
 * 此文件管理项目所有接口
 */
import {get, post} from './network';

/**
 * 服务器根域名
 * 试玩更多接口看这里
 * @type {string}
 */
export const API_ROOT = '';

//获取请求SessionID
export const getSession = function() {
  var ran =  Math.floor(Math.random()*10) % 9+1;
  var timestamp1 = Date.parse(new Date());
  timestamp1 = timestamp1 / 1000*ran;
  var a = ran.toString()+timestamp1;
  var session =wx.getStorageSync('SessionID');
  var newStr = session.slice(0,5)+'-'+a+'-'+session.slice(5);
  return newStr;
}

//业务请求方法列表
export const getToken = (code) => get(`${API_ROOT}/Token/?${code}`,'','',false);
export const getWorkSpec = (pcode, params) => get(`${API_ROOT}/${pcode}/?module=${params}`);