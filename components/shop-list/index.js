Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    second_height:0
  },

  ready() {
    this.getSystemInfo()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSystemInfo() {
      var that = this
      wx.getSystemInfo({
        success: (res) => {
          　console.log(res);
        　　// 可使用窗口宽度、高度
        　　console.log('height=' + res.windowHeight)
        　　console.log('width=' + res.windowWidth)

            console.log('固定高度=' + res.windowWidth / 750 * 108)
        　　// 计算主体部分高度,单位为px
        　　that.setData({
        　　  // second部分高度 = 利用窗口可使用高度 - first部分高度(这里的高度单位为px，所有利用比例将300rpx转换为px)
        　　  second_height: res.windowHeight - res.windowWidth / 750 * 108
        　　})
        }
      })
    },

    _clickTap(e) {
      this.triggerEvent('clickTap', {
        data: e.currentTarget.dataset
      });
    }
  }

})
