// pages/index/echarts/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSystemInfo();
    this.getServerData();
  },

  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        　console.log(res);
      　　// 可使用窗口宽度、高度
          var second_height_auto = res.windowHeight
          var second_width_auto = res.windowWidth
      　　// 计算主体部分高度,单位为px
          this.setData({
      　　  // second部分高度 = 利用窗口可使用高度 - first部分高度(这里的高度单位为px，所有利用比例将300rpx转换为px)
      　　   second_height: second_height_auto,
             second_width: second_width_auto
      　　})
      }
    })
  },

  getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let chartData = {
            categories:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            series: [
              {
                name: "机台速度",
                data: [35, 36, 31, 33, 13, 34, 34, 34, 34, 34, 34, 37, 34, 34, 37, 34, 34, 34, 34, 39, 34, 31, 34, 32]
              }
            ]
          };

      let opts = {
        "extra": {
          "line": {
            "type": "curve",
            "width": 2
          },
        }
      }

      this.setData({ chartData,opts });
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})