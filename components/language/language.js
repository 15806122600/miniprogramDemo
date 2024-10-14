const app = getApp()
import {
	zh
} from '/i18N/zh'
import {
	en
} from '/i18N/en'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
		attached() {
			this.updateContent()
			this.setData({
				content: app.globalData.content
			})
		}
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

    /* get content from language */
		updateContent() {
			const lastLanguage = wx.getStorageSync('language')
			if (lastLanguage === 'en') {
				app.globalData.content = en
				wx.setStorageSync('content', en)
				wx.setStorageSync('language', 'en')
			} else {
				app.globalData.content = zh
				wx.setStorageSync('content', zh)
				wx.setStorageSync('language', 'zh')
			}
		},

		/* change language and update content */
		changeLanguage() {
			const language = wx.getStorageSync('language')
			if (language === 'zh') {
				wx.setStorageSync('language', 'en')
			} else {
				wx.setStorageSync('language', 'zh')
			}
			this.updateContent()
			wx.reLaunch({
				url: '/pages/index/index' //这里改成你自己的页面
			})
    }
    
  }
})
