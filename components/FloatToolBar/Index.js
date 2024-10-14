Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icons: {
      type: Array,
      value: []
    },
    size: {
      type: Number,
      value: 40
    },
    background: {
      type: String,
      value: '#186EB6'
    },
    color: {
      type: String,
      value: '#fff'
    },
    center: {
      type: Boolean,
      value: false
    },
    vcenter: {
      type: Boolean,
      value: false
    },
    direction: {
      type: String,
      value: 'vertical'
    },
    left: {
      type: String,
      value: 'auto'
    },
    right: {
      type: String,
      value: 'auto'
    },
    top: {
      type: String,
      value: 'auto'
    },
    bottom: {
      type: String,
      value: 'auto'
    },
    iconpad: {
      type: Number,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    centerX: 0,
    centerY: 0,
    width: 0,
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _iconTap(e) {
      this.triggerEvent('iconTap', {
        icon: e.currentTarget.dataset.index
      });
    }
  },

  ready() {
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        let windowWidth = res.windowWidth;
        let windowHeight = res.windowHeight;
        let iconpad = self.data.iconpad;
        let centerX, centerY, width = 0,
          height = 0;

        if (self.data.direction == 'vertical') {
          if (self.data.icons.length == 0) {
            centerX = windowWidth / 2;
          } else {
            centerX = (windowWidth - self.data.size) / 2;
            width = self.data.size;
            height = (self.data.size) * self.data.icons.length + iconpad * (self.data.icons.length-1);
          }
          centerY = (windowHeight - height) / 2;
        } else {
          if (self.data.icons.length == 0) {
            centerY = windowHeight / 2;
          } else {
            centerY = (windowHeight - self.data.size) / 2;
            width = (self.data.size) * self.data.icons.length + iconpad * (self.data.icons.length - 1);
            height = self.data.size;
          }
          centerX = (windowWidth - width) / 2;
        }

        self.setData({
          centerX: centerX,
          centerY: centerY,
          width: width,
          height: height
        });
      }
    });
  }
})