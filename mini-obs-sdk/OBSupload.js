// 引入配置文件
const config = require('./Configuration.js');
// 引入policy编码计算方法
const getPolicyEncode = require('./GetPolicy.js');
// 引入签名计算方法
const getSignature = require('./GetSignature.js');

const OBSupload = function (filePath, fileName = 'testMiniprogram.jpg') {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      wx.showToast({
        title: '文件地址无效',
        icon: 'Please re-select path',
      });
    } else {
      // 设定policy内容，默认5分钟后失效
      var expireTime = new Date(new Date().getTime() + 5 * 60 * 1000)
      const OBSPolicy = {
        //时间格式"2021-12-31T12:00:00.000Z"
        "expiration": expireTime.toISOString(),
        "conditions": [
          // 桶名要和配置文件中endpoint中的桶名保持一致
          {
            "bucket": config.Bucket
          },
          // 如果是临时访问秘钥鉴权，必须设置该值
          // { "x-obs-security-token": config.SecurityToken } 
          {
            'key': fileName
          }
        ]
      }

      const policyEncoded = getPolicyEncode(OBSPolicy); // 计算base64编码后的policy
      const signature = getSignature(policyEncoded, config.SecretKey); // 计算signature

      wx.uploadFile({
        url: config.EndPoint,
        filePath: filePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data;',
        },
        formData: {
          // 从配置文件中获取到的AK信息、计算得到的编码后policy及signature信息
          'AccessKeyID': config.AccessKeyId,
          'policy': policyEncoded,
          'signature': signature,
          'key': fileName,
          // "x-obs-security-token": config.SecurityToken, // 如果是临时访问秘钥鉴权，必须设置该值
        },
        success: function (res) {
          console.log(res.statusCode); //打印响应状态码
          if (res.statusCode == '204') {
            console.log('Uploaded successfully', res)
            wx.showToast({
              title: '上传成功',
              icon: 'Success'
            });
          } else {
            console.log('Uploaded failed', res)
            wx.showToast({
              title: '上传失败',
              icon: 'Fail'
            });
          }
          resolve(res)
        },
        fail: function (e) {
          console.log(e);
          reject(e)
        }
      })
    }
  })
}

module.exports = OBSupload;