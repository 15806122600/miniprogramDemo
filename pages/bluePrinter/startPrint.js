const app = getApp();
var tsc = require('../../gprint/tsc.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sendContent: "",
    looptime: 0,
    currentTime: 1,
    lastData: 0,
    oneTimeData: 20,
    returnResult: "returnResult",
    canvasWidth: 80,
    canvasHeight: 80,
    buffSize: [],
    buffIndex: 0,
    printNum: [],
    printNumIndex: 0,
    printerNum: 1,
    currentPrint: 1,
    isReceiptSend: false,
    isLabelSend: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.notifyServiceId,
      characteristicId: app.BLEInformation.notifyCharaterId,
      state: true,
      success: function(res) {
        wx.onBLECharacteristicValueChange(function(r) {
          console.log(`characteristic ${r.characteristicId} has changed, now is ${r}`)
        })
      },
      fail: function(e) {
        console.log('fail', e)
      },
      complete: function(e) {
        console.log('complete', e)
      }
    })
  },

  inputEvent: function(e) { 
    this.setData({
      sendContent: e.detail.value
    })
    console.log('sendContent: ', this.data.sendContent)
  },

  inputNumsEvent: function(e) { 
    this.setData({
      printerNum: e.detail.value
    })
    console.log('printerNum: ', this.data.printerNum)
  },

  sendData: function() { 
    var that = this;
    var data = this.data.sendContent; //+ "\n"
    var jsonObj = JSON.parse(data);
    console.log("发送打印数据明细=>")
    console.log(jsonObj)
    var command = tsc.jpPrinter.createNew()
    var left = 30;
    command.setSize(57, 120)
    command.setGap(0)
    command.setCls()
    //打印内容
    command.setText(1, 30, "TSS24.BF2", 1, 1, jsonObj.value)
    command.setText(left, 90, "TSS24.BF2", 1, 1, "合同产品：")
    var count = 120;
    for(var i=0,len = jsonObj.value2.length; i<len; i++) {
      command.setText(left, count, "TSS24.BF2", 1, 1, "    " + jsonObj.value2[i].name)
      count = count+30;
    }
    command.setText(left, count, "TSS24.BF2", 1, 1, "安装组件清单：")
    var count2 = count+30;
    for(var i=0,len = jsonObj.value3.length; i<len; i++) {
      command.setText(left, count2, "TSS24.BF2", 1, 1, "    " + jsonObj.value3[i].name+ " x "+  jsonObj.value3[i].num)
      count2 = count2+30;
    }
    command.setText(left, count2+30, "TSS24.BF2", 1, 1, "于______年___月___日安装完成")
    command.setText(left, count2+120, "TSS24.BF2", 1, 1, "客户签名：")
    command.setText(left, count2+210, "TSS24.BF2", 1, 1, "              年   月   日")
    command.setPagePrint()
    that.prepareSend(command.getData())
  },

  sendListData: function() { 
    var that = this;
    var data = this.data.sendContent; //+ "\n"
    var jsonObj = JSON.parse(data);
    console.log("发送打印数据明细=>")
    console.log(jsonObj)
    var command = tsc.jpPrinter.createNew()
    var left = 30;
    command.setSize(57, 100)
    command.setGap(0)
    command.setCls()
    //打印内容
    command.setText(1, 30, "TSS24.BF2", 1, 1, jsonObj.value)
    command.setText(left, 90, "TSS24.BF2", 1, 1, "合同产品：")
    var count = 120;
    for(var i=0,len = jsonObj.value2.length; i<len; i++) {
      command.setText(left, count, "TSS24.BF2", 1, 1, "    " + jsonObj.value2[i].name)
      count = count+30;
    }
    command.setText(left, count, "TSS24.BF2", 1, 1, "安装组件清单：")
    var count2 = count+30;
    for(var i=0,len = jsonObj.value3.length; i<len; i++) {
      command.setText(left, count2, "TSS24.BF2", 1, 1, "    " + jsonObj.value3[i].name+ " x "+  jsonObj.value3[i].num)
      count2 = count2+30;
    }
    command.setPagePrint()
    that.prepareSend(command.getData())
  },

  labelTest: function() { 
    var that = this;
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight
    var command = tsc.jpPrinter.createNew()
    command.setSize(48, 40)
    command.setGap(0)
    command.setCls() //需要设置这个，不然内容和上一次重复
    command.setQR(1, 120, "L", 5, "A", "airenao.com")
    command.setText(60, 90, "TSS24.BF2", 1, 1, "成都爱热闹")
    command.setText(170, 50, "TSS24.BF2", 1, 1, "小程序测试")
    command.setText(170, 90, "TSS24.BF2", 1, 1, "测试数字12345678")
    command.setText(170, 120, "TSS24.BF2", 1, 1, "测试英文abcdefg")
    command.setText(170, 150, "TSS24.BF2", 1, 1, "测试符号/*-+!@#$")
    wx.canvasGetImageData({
      canvasId: 'edit_area_canvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: function(res) {
        command.setBitmap(60, 0, 0, res)
      },
      complete: function() {
        command.setPagePrint()
        that.setData({
          isLabelSend: true
        })
        that.prepareSend(command.getData())
      }
    })

  },

  prepareSend: function(buff) { 
    console.log('buff', buff)
    var that = this
    var time = that.data.oneTimeData
    var looptime = parseInt(buff.length / time);
    var lastData = parseInt(buff.length % time);
    console.log(looptime + "---" + lastData)
    that.setData({
      looptime: looptime + 1,
      lastData: lastData,
      currentTime: 1,
    })
    that.Send(buff)
  },

  queryStatus: function() { //查询打印机状态
    var command = esc.jpPrinter.Query();
    command.getRealtimeStatusTransmission(1);
    this.setData({
      returnResult: "查询成功"
    })
  },

  Send: function(buff) { //分包发送
    var that = this
    var currentTime = that.data.currentTime
    var loopTime = that.data.looptime
    var lastData = that.data.lastData
    var onTimeData = that.data.oneTimeData
    var printNum = that.data.printerNum //打印多少份
    var currentPrint = that.data.currentPrint
    var buf
    var dataView
    wx.showLoading({
      title: '正在打印中',
    })
    if (currentTime < loopTime) {
      buf = new ArrayBuffer(onTimeData)
      dataView = new DataView(buf)
      for (var i = 0; i < onTimeData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    } else {
      buf = new ArrayBuffer(lastData)
      dataView = new DataView(buf)
      for (var i = 0; i < lastData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    }
    console.log("第" + currentTime + "次发送数据大小为：" + buf.byteLength)
    wx.writeBLECharacteristicValue({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.writeServiceId,
      characteristicId: app.BLEInformation.writeCharaterId,
      value: buf,
      success: function(res) {
        console.log('写入成功', res)
      },
      fail: function(e) {
        console.log('写入失败', e)
      },
      complete: function() {
        currentTime++
        if (currentTime <= loopTime) {
          that.setData({
            currentTime: currentTime
          })
          that.Send(buff)
        } else {
          wx.showToast({
            title: '已打印第' + currentPrint + '张',
          })
          wx.hideLoading()
          if (currentPrint == printNum) {
            that.setData({
              looptime: 0,
              lastData: 0,
              currentTime: 1,
              isReceiptSend: false,
              isLabelSend: false,
              currentPrint: 1
            })
          } else {
            currentPrint++
            that.setData({
              currentPrint: currentPrint,
              currentTime: 1,
            })
            console.log("开始打印")
            that.Send(buff)
          }
        }
      }
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

  }
})