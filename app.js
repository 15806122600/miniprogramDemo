
App({
  onLaunch: function () {
  },

  globalData: {
    systemInfo: {
      ...wx.getSystemInfoSync(),
    },
    SessionID:'',
    key:'',
    iv:'',
  },

});

