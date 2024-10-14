// pages/live/live.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveID: 'sphxxrhsGTvDBY0',    //悠扬云视频号ID
    noticeId: '111111',           //视频号直播ID
    reserveNoticeId: '2222222222' //预约直播ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  
  live: function() {
    //获取视频号直播信息
    wx.getChannelsLiveInfo({
      finderUserName: this.data.liveID,
      success: res => {
        if (res.errMsg === "getChannelsLiveInfo:ok") {
          console.log(res)
          // 返回内容
          // feedId:直播 feedId
          // nonceId:直播 nonceId
          // description:直播主题
          // status:直播状态，2直播中，3直播结束
          // headUrl:直播封面
          // nickname:视频号昵称
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  liveNotice: function() {
    //获取视频号直播预告信息
    wx.getChannelsLiveNoticeInfo({
      finderUserName: this.data.liveID,
      success: res => {
        if (res.errMsg === "getChannelsLiveNoticeInfo:ok") {
          console.log(res)
          // 返回内容
          // noticeId:预告 id
          // status:预告状态：0可用 1取消 2已用
          // startTime:开始时间(时间戳)
          // headUrl:直播封面
          // nickname:视频号昵称
          // reservable:是否可预约
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  openLive: function() {
    //打开视频号直播（必须通过用户点击触发）
    wx.openChannelsLive({
      finderUserName: this.data.noticeId,
      success: res => {
        console.log(res)
      }
    })
  },
  reserveLive: function() {
    //预约视频号直播（必须通过用户点击触发）
    wx.reserveChannelsLive({
      noticeId: this.data.reserveNoticeId,
      success: res => {
        console.log(res)
      }
    })
  }

})