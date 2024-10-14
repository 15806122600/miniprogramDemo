const app = getApp();
import util from '../../utils/util'
Page({
  wacthWebsocket() {
    const that = this;//这里需要注意this指向问题
    app.globalData.callback = function (msg) {
       //这里写对msg进行处理的业务逻辑
       console.log("发送消息=>",msg)
       if(app.globalData.socketStatus === 'closed') {
        that.setData({ linked: false })
      } else {
        that.setData({ linked: true })
      }
    }
 },

  /**
   * 页面的初始数据
   */
  data: {
    wsAddr: "ws://192.168.1.15:8088/webSocket/",
    clientID: null,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    }]
  },

  open() {
    if (app.globalData.socketStatus === 'closed') {
      app.openScoket(this.data.wsAddr)
    }
  },

  close() {
    app.closeSocket()
    this.setData({
      linked: false,
      clientID: null
    })
  },

  selectColor(e) {
    var item = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item)
    var massage = JSON.stringify({color:item.color, text:item.title})
    this.setData({
      massage
    })
  },

  scanQRcode() {
    var _this = this
    util.showLoading("正在操作")
    wx.scanCode({
      scanType:['qrCode'],
      success:function(e) {
        util.hideLoading()
        console.log(e.result)
        _this.setData({
          clientID: e.result 
        })
      },
      fail:function(e) {
        util.hideLoading()
        console.log("扫描失败了哦")
        if(e.errMsg!= 'scanCode:fail cancel'){
          util.toast("扫描失败")
        }
      }
    })
  },

  sendMessage() {
    var linked = this.data.linked
    var clientID = this.data.clientID
    if(linked && clientID != null) {
      var msg = {msg:this.data.massage,to:clientID}
      this.setData({msg:JSON.stringify(msg)})
      app.sendMessage(msg)
    } else {
      util.toast("未建立连接或者发送端clientId为空")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var uuid = wx.getStorageSync('uuid')
    var socketStatus = app.globalData.socketStatus
    this.setData({
      uuid: uuid,
    })
    if(app.globalData.socketStatus === 'connected') {
      this.setData({
        linked: true
      })
    }
  },

  inputChange(e) {
    var inputValue = e.detail.value;
    console.log(inputValue);
    this.setData({
      wsAddr: inputValue
    })
  },

  inputChange2(e) {
    var inputValue = e.detail.value;
    console.log(inputValue);
    this.setData({
      clientID: inputValue
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
    this.wacthWebsocket();
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

})