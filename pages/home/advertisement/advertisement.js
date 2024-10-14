const app = getApp();
//引入接口
import {getToken, getSession, getAdvInfo} from "../../../https/service";
import {getLucky, getRand} from "../../../utils/lucky"

Page({

  data: {
  　miao: 0,
    setInter:'',
    adImage:'',
    advList:[
        {
          "adImage":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fac-q.static.booking.cn%2Fimages%2Fhotel%2Fmax1024x768%2F111%2F111145520.jpg&refer=http%3A%2F%2Fac-q.static.booking.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624689005&t=552b3ff6194ea327c632e7d95c1e859a",
          "prob":10.8
        },
        {
          "adImage":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F754601d80986bd88e7ee18d14dbd17aa3b78897b27565-YPQ5qp_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624690437&t=70cf7b184524d27001e93f6aece09192",
          "prob":44.2
        },
        {
          "adImage":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.krabiandamantour.com%2Fimages%2Fkrabitour%2F4islands-koh-hong-by-speedboat%2Fkoh-tup-%28tup-Island%29-talay-waek-krabi-Islands-2.jpg&refer=http%3A%2F%2Fwww.krabiandamantour.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624689005&t=c35e536f7079af145771bfc07b1ff14f",
          "prob":20.5
        },
        {
          "adImage":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs.hougarden.com%2Fimage%2F89%2F02%2F890210803b28c0fb443892fd9b1e4686.jpg%3Fx-oss-process%3Dimage%2Fquality%2Cq_80%2Fresize%2Cw_1100&refer=http%3A%2F%2Fs.hougarden.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624689005&t=39853b32023825cfdf3879d2772ca649",
          "prob":24.5
      },

    ]
  },

  onLoad: function(options) {
    var that = this;
    //this.getAdvInfo();

    that.data.setInter = setInterval(function(){
      var gifts = that.data.advList;
      // method 1
      // var gArr = [];
      // for(var i=0; i<gifts.length; i++){
      //   gArr.push(gifts[i]['prob'])
      // }
      // var randImg = gifts[getLucky(gArr)];
      // that.setData({
      //   adImage: randImg['adImage'],
      //   prob: randImg['prob'],
      //   miao: 3
      // })
      // console.log(randImg)  

      //method 2
      var record = [];
      var result = new getRand(gifts);
			for(var j in record){
				if(record[j].adImage==result['adImage']){
					index = j;
					break;
				}
			}
      record.push({adImage:result['adImage'],prob:result['prob']});
      that.setData({
        adImage: record[0]['adImage'],
        prob: record[0]['prob'],
        miao: 3
      })
      console.log(record[0]);

      clearInterval(that.data.setInter);
      that.getTime();
    },500);
    
  },

  getTime(){
    let that = this;
  　　// 在进入页面时开始执行定时器，每秒执行一次miao-1操作。
  　　that.time = setInterval(function() {
        if (that.data.miao != 0) {
          that.setData({
  　　　　  miao: that.data.miao - 1
  　　　　 })
        }else{
        　clearInterval(that.time);
          wx.navigateTo({
            url: '../index/index',
          })
        }
  　}, 1000);
  },

  cliadv: function() {
　　clearInterval(this.time)
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAdvInfo: function() {
    let obj = {}, params = {}, _this = this;
    _this.getToken();
    params.Upstr = 4;
    params.CategoryID = "";
    params.DisplayPlace = "Appload";
    params.InfoID = "";
    params.ProdCode = "YYShow";
    obj.ModuleName = "WXAdv";
    obj.RequestType = 2;
    obj.CommandWay = 1;
    obj.CommandName = "GetAdImageByCategoryInfo";
    obj.SystemID = 1;
    obj.ProdCode = "YYShow";
    obj.CustGuid = "352ff4f5-17b4-4a13-b274-f85ac23ecc74";
    obj.SQLParam = params;
    //获取SessionID
    obj.SessionID = getSession();
    wx.showLoading({title: '加载中'});
    getAdvInfo(obj.ProdCode, JSON.stringify(obj)).then(res => {
        console.log(res)
        var adv = JSON.parse(res);       
        wx.setStorageSync('adv', adv)
        wx.hideLoading();
      }).catch(e => {
        wx.showToast({title: '请求失败'});
    })
  },

  getToken() {
    var ran = Math.floor(Math.random() * 10) % 9 + 1;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 * ran;
    var code = ran.toString() + timestamp;
    getToken(code).then(
      res => {
        var token = JSON.parse(res);
        wx.setStorageSync('SessionID', token.AppID);
        wx.setStorageSync('key', JSON.stringify(token.AppSecret).substring(1, 17));
        wx.setStorageSync('iv', JSON.stringify(token.AppSecretIV).substring(1, 17));
        app.globalData.SessionID = token.AppID;
        app.globalData.key = JSON.stringify(token.AppSecret).substring(1, 17);
        app.globalData.iv = JSON.stringify(token.AppSecretIV).substring(1, 17);
      }
    )
  },

})