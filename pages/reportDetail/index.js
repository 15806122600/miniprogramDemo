const utils = require('../../utils/util.js')
Page({
    data: {
      reportID:0,
      stripe: false, //是否为斑马纹
      border: false, //是否有间隔线
      height: "500",
      tableHeader: [
        {
          prop: 'id',
          width: 150,
          label: '序号',
          color: '#55C355'
        },
        {
          prop: 'datetime',
          width: 150,
          label: '日期',
          color: '#55C355'
        },
        {
          prop: 'sign_in_time',
          width: 152,
          label: '上班时间'
        },
        {
          prop: 'sign_out_time',
          width: 152,
          label: '下班时间'
        },
        {
          prop: 'work_hour',
          width: 110,
          label: '工时'
        },
        {
          prop: 'status',
          width: 110,
          label: '状态'
        }
      ],
      row: [
        {
            "id": 1,
            "status": '正常',
            "datetime": "04-01",
            "sign_in_time": '09:30:00',
            "sign_out_time": '18:30:00',
            "work_hour": 8,
        }, {
            "id": 2,
            "status": '迟到',
            "datetime": "04-02",
            "sign_in_time": '10:30:00',
            "sign_out_time": '18:30:00',
            "work_hour": 7,
        }, {
            "id": 29,
            "status": '正常',
            "datetime": "04-03",
            "sign_in_time": '09:30:00',
            "sign_out_time": '18:30:00',
            "work_hour": 8,
        }, {
            "id": 318,
            "status": '休息日',
            "datetime": "04-04",
            "sign_in_time": '',
            "sign_out_time": '',
            "work_hour": '',
        }, {
            "id": 315,
            "status": '正常',
            "datetime": "04-05",
            "sign_in_time": '09:30:00',
            "sign_out_time": '18:30:00',
            "work_hour": 8,
        }, {
          "id": "汇总",
          "status": '',
          "datetime": "",
          "sign_in_time": '',
          "sign_out_time": '',
          "work_hour": 31,
      }
      ],
      msg: '暂无数据',
      startDate: utils.formatDate(new Date()),
      endDate: utils.formatDate(new Date()),
    },
    onLoad(options) {
      this.getSystemInfo();
    },
    getSystemInfo() {
      var that = this
      wx.getSystemInfo({
        success: (res) => {
          　console.log(res);
        　　// 可使用窗口宽度、高度
        　　console.log('height=' + res.windowHeight)
        　　console.log('width=' + res.windowWidth)
            console.log('固定高度=' + res.windowWidth / 750 * 182)
        　　// 计算主体部分高度,单位为px
        　　that.setData({
        　　  // second部分高度 = 利用窗口可使用高度 - first部分高度(这里的高度单位为px，所有利用比例将300rpx转换为px)
        　　  height: res.windowHeight - res.windowWidth / 750 * 182
        　　})
        }
      })
    },
    prev(e) {
      var data = e.detail.data
      this.setData({
        startDate: data.startDate,
        endDate: data.endDate
      })
    },
    next(e) {
      var data = e.detail.data
      this.setData({
        startDate: data.startDate,
        endDate: data.endDate
      })
    },
    changeDType(e) {
      var data = e.detail.data
      this.setData({
        startDate: data.startDate,
        endDate: data.endDate
      })
    }
})