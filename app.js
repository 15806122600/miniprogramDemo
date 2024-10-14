const util = require("./utils/util");

App({
  onLaunch: function () {
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        // true说明已经授权，如果还拿不到定位信息，说明用户的手机没开启定位功能
        if (res.authSetting['scope.userLocation'] === true) {
          console.log('已经授权，非第一次')
          //授权后默认加载，直接获取定位

        }
        // scope.userLocation === undefined代表用户未授权且第一次登陆
        else if (res.authSetting['scope.userLocation'] === undefined) {
          // 如果用户是第一次登陆且未授权的情况，会直接弹窗请求授权
          // 使用 getlocation 获取用户 经纬度位置
          console.log('第一次登陆且未授权')

        }
        // 小程序检测到用户不是第一次进入该页面,且未授权
        else if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) {
          console.log('不是第一次进入该页面,且未授权')
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法相关功能！',
            success: res => {
              //如果点击取消则显示授权失败
              if (res.cancel) {
                wx.toast('您已拒绝授权!')
              }
              //如果点击确定会打开授权页请求二次授权
              else if (res.confirm) {
                wx.openSetting({
                  success: dataAu => {
                    if (dataAu.authSetting['scope.userLocation'] === true) {
                      wx.toast('授权成功!')
                      //再次授权，调用getLocationt的API

                    } else {
                      // this.isLocation = false
                      wx.toast('授权失败!')
                    }
                  }
                })
              }
            }
          })
        }

      },
      fail: (res) => {},
      complete: (res) => {},
    })
    this.checkPlatform()

   // 如果存在相关信息，连接websocket
    if (this.globalData.socketStatus === 'closed') {
      var url = "ws://192.168.1.15:8088/webSocket/"
      this.openScoket(url);
    }
  },

  globalData: {
    systemInfo: {
      ...wx.getSystemInfoSync(),
    },
    SessionID: '',
    key: '',
    iv: '',
    ProdCode: '27',
    CustGuid: '352ff4f5-17b4-4a13-b274-f85ac23ecc74',
    wsUrl: null,
    socketStatus: 'closed',
    callback: function () {}
  },

  BLEInformation: {
    platform: "",
    deviceId: "",
    writeCharaterId: "",
    writeServiceId: "",
    notifyCharaterId: "",
    notifyServiceId: "",
    readCharaterId: "",
    readServiceId: "",
  },

  getPlatform: function () {
    var sysInfo = wx.getSystemInfoSync();
    return sysInfo.platform;
  },

  checkPlatform() {
    const sys = wx.getSystemInfoSync()
    this.globalData.platform = sys.platform
    if (sys && sys.platform != 'android' && sys.platform != 'devtools') {
      this.globalData.nfcIsAvailable = false
      // wx.showModal({
      //   title: '当前设备暂不支持NFC功能，请使用Android设备进行体验',
      //   showCancel: false
      // })
    }
  },

  // 打开websocket连接
  openScoket(url) {
    const token = "";
    const uuid = this.wxuuid();
    this.globalData.wsUrl = url
    // 打开信道(通过 WebSocket 连接发送数据。需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。)
    wx.connectSocket({
      url: url+ uuid,
      header: { //请求头
        'content-type': 'application/json',
        'Access-Token': token, //携带token认证字段
      },
      timeout: 1000*60*60*24,
      success: () => {
        console.log("websocke连接成功");
      },
      fail: (err) => {
        if (err) {
          console.log("wx.connectSocket连接失败", err)
        }
      },
      complete: () => {
        // console.log("websocke连接完成")
      }
    });

    //监听 WebSocket 连接打开
    wx.onSocketOpen(() => {
      console.log('WebSocket 已打开连接,并且连接成功');
      this.globalData.socketStatus = 'connected';
    })

    //断开时的动作
    wx.onSocketClose(() => {
      console.log('WebSocket 已断开');
      this.globalData.socketStatus = 'closed';
      //断线重连
      this.reconnect();
    })

    //报错时的动作
    wx.onSocketError(error => {
      console.error('socket error出错了:', error);
      util.toast("websocket连接失败")
      // this.globalData.socketStatus = 'closed';
      //  this.reconnect();
    })

    // 监听服务器推送的消息
    wx.onSocketMessage(message => {
      console.log("message", message)
      //把JSONStr转为JSON
      message = message.data.replace(" ", "");
      if (typeof message != 'object') {
        message = message.replace(/\ufeff/g, ""); //重点
        const msg = JSON.parse(message);
        message = msg;
      }

      //callback函数对服务端发送的消息进行处理
      this.globalData.callback(message);
      // console.log("监听到如下数据发送变化：", message);
    })
  },

  //关闭websocket连接
  closeSocket() {
    if (this.globalData.socketStatus === 'connected') {
      wx.closeSocket({
        success: () => {
          this.globalData.socketStatus = 'closed';
          console.log("websocket连接已关闭")
        }
      })
    }
  },

  //发送消息函数
  sendMessage(data) {
    if (this.globalData.socketStatus === 'connected') {
      const msg = JSON.stringify(data)
      wx.sendSocketMessage({
        data: msg
      })
    }
  },

  // 断线重连
  reconnect() {
    let timer = null;
    if (this.globalData.socketStatus === 'closed') {
      console.log("断线重连中......");
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.openScoket(this.globalData.wsUrl);
      }, 500)
    } else {
      this.closeSocket();
    }
  },

  onHide() {
    // 断开websocket连接
    this.closeSocket();
  },

  wxuuid() {
    if(wx.getStorageSync('uuid')!='') {
      return wx.getStorageSync('uuid')
    } else {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("").replace("-","");
      wx.setStorageSync('uuid', uuid)
      return uuid
   }
  },

});