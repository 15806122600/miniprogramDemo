Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxHeight: "500px",
    nodes: [
      {id:11, label:'集团', parentId: 0},
      {id:1, label:'悠扬科技', parentId: 0},
      {id:2, label:'S管理委员会', parentId: 1},
      {id:3, label:'A苏州悠扬', parentId: 1},
      {id:4, label:'B临沂悠扬', parentId: 1},
      {id:5, label:'C安徽悠扬', parentId: 1},
      {id:6, label:'01行政人事部', parentId: 3},
      {id:7, label:'02销售部', parentId: 3},
      {id:8, label:'03软件开发部', parentId: 3},
      {id:9, label:'04电控开发部', parentId: 3},
      {id:10, label:'05系统实施部', parentId: 3},
    ],
    checkeds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSystemInfo()
  },

  checkDept(e) {
    //console.log(e.detail)
    this.setData({
      checkeds: e.detail.checkeds
    })
  },

  confirmDept() {
    var labels = ""
    var nodes = this.data.nodes
    var checkeds = this.data.checkeds
    for(var item in nodes) {
      var id = nodes[item].id
      for(var ids in checkeds) {
        var ckid = checkeds[ids]
        if(id == ckid) {
          labels += nodes[item].label + ","
        }
      }
    }
    this.setData({
      labels: labels
    })
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

  getSystemInfo() {
    var that = this
    var second_height_auto = 0
    wx.getSystemInfo({
      success: (res) => {
        　//console.log(res);
      　　// 可使用窗口宽度、高度
          second_height_auto = res.windowHeight - res.windowWidth / 750 * 126
      　　// 计算主体部分高度,单位为px
      　　that.setData({
      　　  // second部分高度 = 利用窗口可使用高度 - first部分高度(这里的高度单位为px，所有利用比例将300rpx转换为px)
      　　  maxHeight: second_height_auto + 'px'
      　　})
      }
    })
  },
})