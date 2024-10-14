const app = getApp();

// 指定OBS服务相关信息：AK，SK，SecurityToken，EndPoint
var Configuration = {
  //桶名
  Bucket: "yy29",
  //AK
  AccessKeyId: '4BCGXOHXJQDVLSFQV7FB', 
  //SK
  SecretKey: 'I0qD6N0nKABWDZiqfBHAx8hVib6OId4K3Pwy5fFL',     
  //临时访问秘钥必填，永久访问秘钥不填   
  //SecurityToken: 'your SecurityToken',        
  //完整的桶访问域名
  EndPoint: 'https://yy29.obs.cn-sh1.ctyun.cn',         
};

var ConfigurationList = [
  {
    ProdCode: "29",
    //桶名
    Bucket: "yy29",
    //AK
    AccessKeyId: '4BCGXOHXJQDVLSFQV7FB', 
    //SK
    SecretKey: 'I0qD6N0nKABWDZiqfBHAx8hVib6OId4K3Pwy5fFL',     
    //临时访问秘钥必填，永久访问秘钥不填   
    //SecurityToken: 'your SecurityToken',        
    //完整的桶访问域名
    EndPoint: 'https://yy29.obs.cn-sh1.ctyun.cn',   
  },
  {
    ProdCode: "27",
    //桶名
    Bucket: "yy27",
    //AK
    AccessKeyId: '4BCGXOHXJQDVLSFQV7FB', 
    //SK
    SecretKey: 'I0qD6N0nKABWDZiqfBHAx8hVib6OId4K3Pwy5fFL',     
    //临时访问秘钥必填，永久访问秘钥不填   
    //SecurityToken: 'your SecurityToken',        
    //完整的桶访问域名
    EndPoint: 'https://yy27.obs.cn-sh1.ctyun.cn',   
  },
  {
    ProdCode: "26",
    //桶名
    Bucket: "yy26",
    //AK
    AccessKeyId: '4BCGXOHXJQDVLSFQV7FB', 
    //SK
    SecretKey: 'I0qD6N0nKABWDZiqfBHAx8hVib6OId4K3Pwy5fFL',     
    //临时访问秘钥必填，永久访问秘钥不填   
    //SecurityToken: 'your SecurityToken',        
    //完整的桶访问域名
    EndPoint: 'https://yy26.obs.cn-ahwh1.ctyun.cn',   
  },
  {
    ProdCode: "09",
    //桶名
    Bucket: "yy09",
    //AK
    AccessKeyId: '4BCGXOHXJQDVLSFQV7FB', 
    //SK
    SecretKey: 'I0qD6N0nKABWDZiqfBHAx8hVib6OId4K3Pwy5fFL',     
    //临时访问秘钥必填，永久访问秘钥不填   
    //SecurityToken: 'your SecurityToken',        
    //完整的桶访问域名
    EndPoint: 'https://yy09.obs.cn-ahwh1.ctyun.cn',   
  }
]
module.exports = Configuration;