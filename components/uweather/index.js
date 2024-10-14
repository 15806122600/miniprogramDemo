const amap = require('./lib/amap-wx.js');
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    weather: {
      type: String,
      value: '',
      observer: function (n, o) {
        //天气变化
      }
    },
    winfo: {
      type: Object,
      value: null,
      observer: function (n, o) {
        //如果有自定义的值就使用自定义的值
        this.setData({
          obj: n
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    amapPlugin: null,
    key: "2731c003fb843fcfb5b27d9b6022e7a6",
    obj: {},
  },
  lifetimes: {
    attached() {
      if (this.properties.winfo == null) {
        this.setData({
          amapPlugin: new amap.AMapWX({
            key: this.data.key
          })
        }, () => {
          //this.getLoaction()
          this.getWeather()
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取天气数据
    getWeather: function () {
      wx.showLoading({
        title: '请稍候...'
      })
      // type：天气的类型。默认是live（实时天气），可设置成forecast（预报天气）。
      // city：城市对应的adcode，非必填。为空时，基于当前位置所在区域。 如：440300，返回深圳市天气
      // success(data) ：调用成功的回调函数。
      // fail(info) ：调用失败的回调函数。
      this.data.amapPlugin.getWeather({
        success: (data) => {
          //成功回调
          console.log(data)
          wx.hideLoading()
          this.setData({
            obj: data.liveData,
          })
          if (this.properties.weather == '') {
            this.setData({
              weather: data.liveData.weather
            })
          }
        },
        fail: function (info) {
          //失败回调
          console.log(info)
          wx.hideLoading()
        }
      })
    },
  }
})