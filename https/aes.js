
import CryptoJS from './crypto-js.js';
const app = getApp();
 //aes加密
 const aesEncrypt = function(str) {
  
  var srcs = CryptoJS.enc.Utf8.parse(str);
  var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(app.globalData.key), { iv: CryptoJS.enc.Utf8.parse(app.globalData.iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();   //这个是基础的16位16进制的加密返回值
 }
function Decrypt(str){
  // console.log("key:"+ wx.getStorageSync('key'))
  // console.log("iv:"+ wx.getStorageSync('iv'))
  var key = wx.getStorageSync('key');
  var iv =  wx.getStorageSync('iv');
  var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, CryptoJS.enc.Utf8.parse(key), { iv:CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
   console.log(decryptedStr)
  return decryptedStr.toString();
}
 module.exports={
  aesEncrypt: aesEncrypt,
  Decrypt:Decrypt
 }
