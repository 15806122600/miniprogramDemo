var QQMapWX = require('../../qqmap/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'OUQBZ-3Y56F-F2GJ3-JSIZP-JNJAJ-L6FBX'
    });
    this.getLocation().then(()=>{
      this.reverseLocation();
    });
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

  onHnadwritingComplete: function(event) {
    console.log("得到临时文件路径："+event.detail)
  },

  // 获取经纬度
	getLocation() {
		return new Promise((resolve, reject) => {
			const _this = this
			wx.getLocation({
				success(res) {
					if (res.latitude && res.longitude) {
						_this.setData({
							latitude: res.latitude,
							longitude: res.longitude
						})
						resolve(true)
					}
				},
				fail(err) {
					reject(err)
				}
			})
		})
  },
  
  //解析经纬坐标
  	// 逆地址解析
	reverseLocation() {
    const _this = this;
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: _this.data.latitude,
				longitude: _this.data.longitude
			},
			success(res) {
        console.log(res)
				_this.setData({
					addressContent: res.result.address,//地址内容
				})
			},
			fail(err) {
				console.debug(err)
			}
		})
	},

})