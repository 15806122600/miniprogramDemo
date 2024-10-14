// 引入配置文件
const config = require('./Configuration.js');
const Crypto = require('crypto-js')

const GetObject = function (fileName) {
  return new Promise((resolve, reject) => {
    //签名字符串组合
    var contentMD5 = ""
    var contentType = "binary/octet-stream"
    var requesttime = new Date().toUTCString()
    var canonicalizedHeaders = ""
    var canonicalizedResource = "/" + config.Bucket + "/" + fileName
    var canonicalString = "GET" + "\n" + contentMD5 + "\n" + contentType + "\n" + requesttime + "\n" +
      canonicalizedHeaders + canonicalizedResource;
    var signature = signWithHmacSha1(canonicalString)
    var head = {
      'Content-Type': 'binary/octet-stream',
      'Date': new Date().toUTCString(),
      'Authorization': 'OBS ' + config.AccessKeyId + ':' + signature
    }

    wx.request({
      url: config.EndPoint + "/" + fileName,
      method: 'GET',
      header: head,
      responseType: "arraybuffer",
      success: (res) => {
        console.log(res)
        resolve(res)
      },
      fail: (error) => {
        console.log(error)
        reject(error)
      },
    })
  })
}

const signWithHmacSha1 = function (canonicalString, SecretKey = config.SecretKey) {
  console.log(canonicalString)
  console.log(SecretKey)
  const bytes = Crypto.HmacSHA1(canonicalString, SecretKey)
  const signature = Crypto.enc.Base64.stringify(bytes)
  return signature
}

const generateUUID = function() {
  var s = [];
  var hexDigits = "0123456789abcdef"
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-"
  var uuid = s.join("")
  return uuid
}

module.exports = {
  GetObject,signWithHmacSha1,generateUUID
};