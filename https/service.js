/**
 * 此文件管理项目所有接口
 */
import {get, post} from './network';
const app = getApp();
/**
 * 服务器根域名
 * 试玩更多接口看这里
 * https://www.yoyangyun.com
 * @type {string}
 */
export const API_ROOT = 'https://www.yoyangyun.com';
export const WXPay_API_ROOT = 'http://192.168.1.46:9802';
//export const API_ROOT_JBTest = 'https://www.yoyangyun.com/JBTest'; //测试
export const API_ROOT_JB = 'https://www.yoyangyun.com/JB'; //正式
export const API_UPLOAD_IMAGE = 'https://www.csgss.com/WXGetData/WX_MPUpload';
export const API_ROOT_DTY_TEST = "http://192.168.1.46:9802";
//export const API_ROOT_DTY = "https://www.yoyangyun.com";

export const checkToken = function() { 
  var token = wx.getStorageSync("Token");
  if(token) {
    var ExpiredTime = Date.parse(token.ExpiredTime);
    var nowTime = Date.parse(new Date());
    var diffTime = ExpiredTime- nowTime
    //console.log(diffTime> 1000 *1000) //1000s
    if(diffTime > 1000 *1000) {
      console.log("未过期")
    } else {
      console.log("已过期")
      getTokenInfo();
    }
  } else {
    console.log("无token")
    getTokenInfo();
  }
}

var getTokenInfo = function() {
  var ran = Math.floor(Math.random() * 10) % 9 + 1;
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000 * ran;
  var code = ran.toString() + timestamp;
  getToken(code).then(
    res => {
      var token = JSON.parse(res);
      wx.setStorageSync('Token', token);
      wx.setStorageSync('SessionID', token.AppID);
      wx.setStorageSync('key', JSON.stringify(token.AppSecret).substring(1, 17));
      wx.setStorageSync('iv', JSON.stringify(token.AppSecretIV).substring(1, 17));
      // app.globalData.SessionID = token.AppID;
      // app.globalData.key = JSON.stringify(token.AppSecret).substring(1, 17);
      // app.globalData.iv = JSON.stringify(token.AppSecretIV).substring(1, 17);
    }
  )
}

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

//通用参数拼接(新)
export const new_modules = function (CustGuid, ProdCode, AccountNo,
  ModuleName, MethodName, CommandType, CommandText, SQLParam,
  PageSize, PageIndex, PagingMode, DataSetNums) {
    let ParamList = {}
    ParamList.SessionID = getSession()
    ParamList.CustGuid = CustGuid
    ParamList.ProdCode = ProdCode
    if(AccountNo != '') {
      ParamList.AccountNo = AccountNo
    }
    ParamList.ModuleName = ModuleName
    ParamList.MethodName = MethodName
    if(CommandType>0) {
      ParamList.CommandType = CommandType
    }
    if(CommandText != '') {
      ParamList.CommandText = CommandText
    }
    ParamList.OtherParam = SQLParam
    if(PageSize>0) {
      ParamList.PageSize = PageSize
      ParamList.PageIndex = PageIndex
    }
    if(PagingMode != '') {
      ParamList.PagingMode = PagingMode
    }
    if(DataSetNums>0) {
      ParamList.DataSetNums = DataSetNums
    }
    return ParamList
}

//业务请求方法列表
export const getToken = (code) => get(`${API_ROOT}/Token/?${code}`,'','',false);
export const getLoginTest = (params) => get(`${API_ROOT_JB}/?module=${params}`,'','',false);
export const getUserSession = (pcode, params) => get(`${API_ROOT_JB}/?module=${params}`,'','',false);
export const getInfo = (params) => get(`${API_ROOT_JB}/?module=${params}`,'','', true);
export const saveUser = (params) => get(`${API_ROOT_JB}/?module=${params}`,'','', true);
export const saveInfo = (params,data) => post(`${API_ROOT_JB}/?module=${params}`,`${data}`,'', false);

//API测试方法
export const TestGet = (pcode, params) => get(`${API_ROOT}/${pcode}/?module=${params}`, '', '', false);
export const TestPost = (pcode, params, data) => post(`${API_ROOT}/${pcode}/?module=${params}`, `${data}`, '', false);
export const TestGet2 = (pcode, params) => get(`${API_ROOT}/${pcode}/?module=${params}`, '', '', false);

export const _get = (url) => get(`${url}`,'','',false);
export const _post = (pcode, params, data) => post(`${WXPay_API_ROOT}/${pcode}/?module=${params}`, `${data}`, '', false);

//加弹通用正式Get
export const Get = (pcode, params) => get(`${API_ROOT_DTY}/${pcode}/?module=${params}`, '', '', false);
export const Get_Dty_Test = (pcode, params) => get(`${API_ROOT_DTY_TEST}/${pcode}/?module=${params}`, '', '', false);
