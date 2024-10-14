import {_get} from '../../https/service';
import util from '../../utils/util.js';
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    listData: [],
    dialogShow: false,
    condData: [],
    filterCondData: [],
    compArr: [
      {compName:"DateFilter", label:'', dataSource:'', eventName:''},
      {compName:"TagFilter", label:'', dataSource:'', eventName:''},
      {compName:"CondFilter", label:'条件', dataSource:'getCustData', eventName:'selectCust'}
    ],
    BeginDate: util.formatDate(new Date()),
    EndDate: util.formatDate(new Date()),
    BeginDateTime: new Date().getTime(),
    EndDateTime: new Date().getTime(),
    PopupShow: {
      Begin: false,
      End: false,
    },
    optVal:"orderByCust",
    statType: [
      {value:"orderByCust",text:'按客户',icon:''},
      {value:"orderBySaleMan",text:'按业务员',icon:''},
      {value:"orderByPrdName",text:'按品种信息',icon:''}
    ],
    indexB: -1,
    TagArr: [
      {StatName:"待审核", ID:1},
      {StatName:"已审核", ID:2},
      {StatName:"已红冲", ID:3}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var apiName = "getConfig"
    this.getConfig(apiName);
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

  iconTap(e) {
    let icon = e.detail.icon
    if (icon == 0) {
      this.setData({
        ['PopShow.Filter']: true
      });
    } 
  },

  getConfig(apiName) {
    var _this = this;
    var url = "https://www.fastmock.site/mock/acd16977d8d6f500af9c3d754c28986f/wx/api/"+apiName
    _get(url).then(res=>{
      var componentName = res.componentName
      var componentDataSource = res.componentDataSource
      var componentReturn = res.componentReturn
      console.log("componentReturn1=>"+componentReturn)
      var dataUrl = "https://www.fastmock.site/mock/acd16977d8d6f500af9c3d754c28986f/wx/api/"+componentDataSource
      _get(dataUrl).then(data=>{
        _this.setData({
          content:componentName,
          listData: data
        })
      })
    })
  },

  onClick: function (e) {
    var data = e.detail.data
    wx.showModal({
      content: "点击了第"+(data.index+1)+"条，内容："+data.info.text,
      cancelColor: 'cancelColor'
    })
  },

  onClick2: function (e) {
    var data = e.detail.data
    wx.showModal({
      content: "点击内容："+data.info.introduce,
      cancelColor: 'cancelColor'
    })
  },  

  popFilterClose(e) {
    this.setData({
      ['PopShow.Filter']: false
    });
  },
  KeyWordSearch(e) {
    let keyWords = util.trim(e.detail).toUpperCase();
    console.log(keyWords)
  },
  /**
  * 开始日期
  */
  selectBeginDate() {
    this.setData({
      ['PopupShow.Begin']: true
    });
  },
  toggleBottomPopup() {
    this.setData({
      ['PopupShow.Begin']: !this.data.PopupShow.Begin
    });
  },
  BeginDateConfirm(e) {
    console.log(e.detail)
    this.setData({
      BeginDate: util.formatDate(new Date(e.detail)),
      BeginDateTime: new Date(e.detail).getTime(),
      ['PopupShow.Begin']: false
    });
  },
  /**
   * 结束日期
   */
  selectEndDate() {
    this.setData({
      ['PopupShow.End']: true
    });
  },
  toggleBottomPopup2() {
    this.setData({
      ['PopupShow.End']: !this.data.PopupShow.End
    });
  },
  EndDateConfirm(e) {
    console.log(e.detail)
    this.setData({
      EndDate: util.formatDate(new Date(e.detail)),
      EndDateTime: new Date(e.detail).getTime(),
      ['PopupShow.End']: false
    });
  },
  changeType(e) {
    var methodName = e.detail
    //调用方法，按条件获取
    console.log(methodName)
  },
  tagClick(e) {
    this.setData({
      indexB:e.currentTarget.dataset.index
    })
  },
  doReset() {},
  doSearch() {
    console.log("beginDate:"+ this.data.BeginDate)
    console.log("endDate:"+ this.data.EndDate)
  },
  selectCust(e) {
    var _this = this;
    var sourceName = e.currentTarget.dataset.source
    var url = "https://www.fastmock.site/mock/acd16977d8d6f500af9c3d754c28986f/wx/api/"+sourceName
    _get(url).then(res=>{
      console.log(res) 
      _this.setData({
        condData:res,
        filterCondData:res,
        dialogShow: true
      })
    })
  },
  openDialog() {
    this.setData({
      dialogShow: true
    })
  },
  closeDialog(e) {
    this.setData({
      dialogShow: false
    })
  },
  closeAction() {
    this.setData({ dialogShow: false });
  },
  onSelected(e) {
    var data = e.currentTarget.dataset
    this.setData({
      condVal: data.name,
      condValID: data.id,
      dialogShow: false
    })
  },
  condSearch(e) {
    //console.log("input-----", e.detail)
    let self = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      let keyWords = util.trim(e.detail).toUpperCase();
      let list = this.data.filterCondData.filter(item => {
        return item.CustName.indexOf(keyWords) > -1;
      });
      //console.log("list" + list)
      self.setData({
        condData: list
      });
    }, 300);
  }
})