// pages/report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let reportList = [
      {reportName: "汇总报表1", reportUrl: "../reportDetail/index?id=1"},
      {reportName: "汇总报表2", reportUrl: "../reportDetail/index?id=2"},
      {reportName: "汇总报表3", reportUrl: "../reportDetail/index?id=3"},
      {reportName: "测试自定义组件页面", reportUrl: "../testComponents/index"}
    ]
    this.setData({ reportList })
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