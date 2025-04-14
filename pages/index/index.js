const app = getApp();
import utils from '../../utils/util.js'
import {Get_Dty_Test,new_modules} from "../../https/service";
import OBSupload from "../../mini-obs-sdk/OBSupload"
import OBSget from "../../mini-obs-sdk/GetObject"
const describeForNameMap = [
 // [(name) => name.length > 3, () => "名字太长"],
  [(name) => name.length < 2, () => "名字太短"],
  [(name) => name[0] === "陈", () => "小陈"],
  [(name) => name === "大鹏", () => "管理员"],
  [(name) => name[0] === "李" && name !== "李鹏", () => "小李"],
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    fileList: [],
    ImageList: [],
    isLoading: true,
    mdContent: {},
    error: '',
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 	//获取图片临时路径
    this.setData({
      avatarUrl
    })
  },
  updateUserInfo(e) {
    var avatarUrl = this.data.avatarUrl
    var nickname = e.detail.value.nickname
    //console.log(avatarUrl + "|" + nickname);  //用户输入或者选择的昵称
    this.getUserDescribe(nickname)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      content: wx.getStorageSync('content')
    })
     // 从 URL 参数获取 Markdown 文件地址
     const mdUrl = options.url || 'http://58.209.82.229:8500/web/#/124/944';
     //var mdUrl = "http://58.209.82.229:8500/web/#/68/515"
     this.loadMarkdown(mdUrl);
  },

  goEcharts() {
    wx.navigateTo({
      url: '../index/echarts/index',
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
    var ImageList = [{
      url: 'https://yy29.obs.cn-sh1.ctyun.cn/pic2.jpg?AccessKeyId=4BCGXOHXJQDVLSFQV7FB&Expires=1683248712&Signature=HQQMROIPptEJXvsgyOy8H3dKmoA='
    }]
    // for(var i=0,len=ImageList.length; i<len; i++) {
    //    var arr = ImageList[i].split('/')
    //    var fileName = arr[arr.length-1]
    //    this.getImage(fileName)
    // }
      this.setData({
        ImageList
      })
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
  getUserProfile() {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var obj = {}
        obj.encryptedData = res.encryptedData
        obj.iv = res.iv
        obj.rawData = res.rawData
        obj.signature = res.signature
        wx.login({
          success(res) {
            if(res.code) {
              var params = {}
              obj.code = res.code
              params.loginJson = JSON.stringify(obj)
              var modules = new_modules(app.globalData.CustGuid, '06', '', 'WeChatLogin',
              'GetWxLoginInfo', 0, '', params, 0, '', 0)
              Get_Dty_Test('06', JSON.stringify(modules)).then(data => {
                console.log(data)
              })
            }
          },
          fail(err) {
            console.log(err)
          }
        })
      },
      fail: (err2) => {
        console.log(err2.errMsg)
        utils.toast(err2.errMsg)
      }
    })
  },

  getUserDescribe(name) {
    let str; // 存储判断结果
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    console.log(getDescribe)
    if (getDescribe) {
        str = getDescribe[1]();
    } else {
        str = "此人比较神秘！";
    }
    // 对判断结果str的一些处理
    console.log(str);
    // 数组去重
    var arrs = ["前端","js","html","js","css","html"]
    const uniqueArr = (arr) => [...new Set(arr)];
    console.log(uniqueArr(arrs));

    // 从url获取参数并转为对象
    const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
    )
    console.log(getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1"));
  
    // 检测对象是否为空
    const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
    console.log(isEmpty({}))
    console.log( isEmpty({a:"bb"}) )
   
    return str;
  },

  afterRead(event) {
    wx.showLoading({
      title: '上传中...'
    })
    const {
      file
    } = event.detail //获取所需要上传的文件列表
    let uploadPromiseTask = [] //定义上传的promise任务栈
    for (let i = 0; i < file.length; i++) {
      uploadPromiseTask.push(this.uploadFile(file[i]))
    }
    Promise.all(uploadPromiseTask).then(res => {
      //console.log(res)
      //全部上传完毕
      wx.hideLoading()
    }).catch(error => {
      //存在有上传失败的文件
      console.log(error)
      wx.hideLoading()
      wx.showToast({
        title: '上传失败！',
        icon: 'none',
      })
    })
  },

  uploadFile (file) {
    var fileExt = file.url.split(".")
    var fileName = OBSget.generateUUID() + "." + fileExt[1]
    return new Promise((resolve, reject) => {
      OBSupload(file.url, fileName).then(res => {
        if(res.statusCode == 204) {
          // 上传完成需要更新 fileList
          const { fileList = [] } = this.data
          fileList.push({ ...file, ETag: JSON.parse(res.header.ETag), url: res.header.Location})
          this.setData({ fileList })
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },

  getImage(fileName) {
    OBSget.GetObject(fileName).then(res=> {
      if(res.statusCode == 200) {
        var arrayBuffer = res.data
        var base64Uri = 'data:image/jpg;base64,' + wx.arrayBufferToBase64(arrayBuffer)
        const { ImageList = [] } = this.data;
        ImageList.push({ url: base64Uri });
        this.setData({ ImageList });
      }
    })
  },

  async loadMarkdown(url) {
    var _this = this
    const cacheKey = `md_${encodeURIComponent(url)}`;
    const cachedData = wx.getStorageSync(cacheKey);

    if (cachedData) {
      this.setData({ mdContent: cachedData, isLoading: false });
      return;
    }
    
    try {
      var PageID = this.getLastHashParamMini(url)
      // console.log(PageID)
      var realUrl = "http://58.209.82.229:8500/server/index.php?s=/api/page/info"

      var formData = {
        page_id: PageID,
        user_token: "e1ffd1e097980ca8d458cd1577a8dcc0b048417565d1d2dd358858d22d52a320"

      }
      // 发起网络请求
      const res = await wx.request({
        url: realUrl,
        method: 'post',
        data: formData,
        timeout: 10000, // 10秒超时
        success (res) {
          var reps = _this.unescapeMarkdown(res.data.data.page_content)
          console.log(reps)
          _this.parseContent(reps)
        },
        fail (err) {
          throw new Error(`请求失败 (${err})`);
        }
      });
    } catch (err) {
      this.setData({
        error: '加载失败，请稍后重试',
        isLoading: false
      });
      console.error('Markdown加载错误:', err);
    }
  },

  parseContent(markdown) {
    const parsedData = app.towxml(markdown, 'markdown', {
      base: 'http://58.209.82.229:8500/Public/Uploads', // 资源基础路径（如图片）
      theme: 'light', // 主题
      events: { // 自定义事件（如链接点击）
        tap: e => this.onTap(e)
      }
    });

    this.setData({
      mdContent: parsedData,
      isLoading: false
    });
  },

  // 处理元素点击事件
  onTap(e) {
    const { dataset } = e.currentTarget;
    console.log(dataset)
    if (dataset.href) {
      wx.navigateTo({
        url: `/pages/webview/webview?url=${encodeURIComponent(dataset.href)}`
      });
    }
  },

  getLastHashParamMini(baseUrl) {
    // 步骤 1：分离 hash 部分
    const hashPart = baseUrl.split('#')[1] || '';
      
    // 步骤 2：去除查询参数并分割路径
    const [path] = hashPart.split('?');
    const segments = path.split('/').filter(s => s !== '');
    
    // 步骤 3：返回最后一个有效参数
    return segments.length > 0 ? segments.pop() : null;
  },

  unescapeMarkdown(str) {
    const map = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#39;': "'",
      '&#x2F;': '/'
    };
    return str.replace(/&(lt|gt|amp|quot|#39|#x2F);/g, (m) => map[m]);
  },

})