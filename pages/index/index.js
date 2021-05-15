import * as echarts from '../../components/ec-canvas/echarts.js';
const WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp();
//引入接口
import {getToken, getSession, getWorkSpec} from "../../https/service";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceData1:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    sourceData2:[820, 932, 901, 934, 1290, 1330, 1320],
    ec: {
      lazyLoad: true,
    },
    ModelList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var article = `<div><span style='color:red;font-size:40px;'>中文</span></div><img style='width:40px;height:40px;' src='../../images/1.png'/>`;

    //参数1:标签类型，参数2
    // WxParse.wxParse('article', 'html', article, this, 5);
    // var data1 = this.data.sourceData1;
    // var data2 = this.data.sourceData2;
    // this.echartsComponents = this.selectComponent("#mychart");
    // this.echartsComponents.init((canvas, width, height, devicePixelRatio) => {
    //     const chart = echarts.init(canvas, null, {
    //       width:width, 
    //       height:height, 
    //       devicePixelRatio:devicePixelRatio
    //     });
    //     chart.clear();
    //     chart.setOption(this.getOption(data1, data2));
    // });

    //this.getToken();
    this.getWorkSpec();
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
  getOption(data1, data2){
    var option = {
      title: {
        left: 'center',
        top: '10%',
        text: '标题'
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data1
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: data2,
          type: 'line',
          areaStyle: {}
      }]
  };
  return option;
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

  getWorkSpec() {
    let obj = {}, params = {}, _this = this;
    params.FactoryID = 1;
    params.SelectType = 1;
    params.BeginDate = "2021.05.15";
    params.EndDate = "2021.05.15";
    obj.CommandWay = 1;
    obj.CommandText = "MakePlan_QueryData";
    obj.RequestType = 1;
    obj.SystemID = 1;
    obj.PageName = "pages/index/index.wxml";
    obj.ProdCode = 10;
    obj.CustGuid = "352ff4f5-17b4-4a13-b274-f85ac23ecc74";
    obj.SQLParam = params;
    //获取SessionID
    obj.SessionID = getSession();

    wx.showLoading({title: '加载中'});
    getWorkSpec(obj.ProdCode, JSON.stringify(obj)).then(res => {
        //console.log(res)
        _this.setData({
          ModelList: JSON.parse(res)
        })
        wx.hideLoading();
      }).catch(e => {
        wx.showToast({title: '请求失败'});
    })
  },


})