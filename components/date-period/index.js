const GetPeriod = require("./utils/getperiod.js");
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
    dateType: 0,
    dateTypeR: 'now'
  },

  ready() {
    this.time = new GetPeriod();
    this.setData({
      dateType: 0,
      startDate: this.time.getNowDate(),
      endDate: this.time.getNowDate(),
      date: this.time.getPeriod()
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前时间段
    getDateType(e) {
      let dateType = e.currentTarget.dataset.datetype;
      let startDate = '',
        endDate = '';
      if (dateType == 0) { //今天
        startDate = this.time.getNowDate();
        endDate = this.time.getNowDate();
      } else if (dateType == 1) { //本周
        startDate = this.time.getWeekStartDate();
        endDate = this.time.getWeekEndDate();
      } else if (dateType == 2) { //本月
        startDate = this.time.getMonthStartDate();
        endDate = this.time.getMonthEndDate();
      } else if (dateType == 3) { //本年
        startDate = this.time.getYearStartDate();
        endDate = this.time.getYearEndDate();
      } else if (dateType == 5) { //本季度
        startDate = this.time.getQuarterStartDate();
        endDate = this.time.getQuarterEndDate();
      }
      this.setData({
        dateType: dateType,
        startDate: startDate,
        endDate: endDate
      });
      this.triggerEvent('changeDType', {
        data: this.data
      });
    },
    bindDateChange(e) {
      if (e.currentTarget.id == 'start') {
        this.setData({
          startDate: e.detail.value
        })
      } else if (e.currentTarget.id == 'end') {
        this.setData({
          endDate: e.detail.value
        })
      } else {
        return;
      }
    },
    prev() {
      var dateType = this.data.dateType
      var startDate = this.data.startDate
      this.getDatePeriod(dateType, startDate, "", "prev")
      this.triggerEvent('prev', {
        data: this.data
      });
    },
    next() {
      var dateType = this.data.dateType
      var endDate = this.data.endDate
      this.getDatePeriod(dateType, "", endDate, "next")
      this.triggerEvent('next', {
        data: this.data
      });
    },
    getDatePeriod(dateType, start, end, flag) {
      let startDate = '',
        endDate = '';
      if (dateType == 0) { //今天
        if(flag == 'prev') {
          startDate = this.time.getNowDateDiff(start, -1);
          endDate = this.time.getNowDateDiff(start, -1);
        } else {
          startDate = this.time.getNowDateDiff(end, 1);
          endDate = this.time.getNowDateDiff(end, 1);
        }
      } else if (dateType == 1) { //本周
        if(flag == 'prev') {
          startDate = this.time.getWeekStartDateDiff(start, -1);
          endDate = this.time.getWeekEndDateDiff(start, -1);
        } else {
          startDate = this.time.getWeekStartDateDiff(end, 1);
          endDate = this.time.getWeekEndDateDiff(end, 1);
        }
      } else if (dateType == 2) { //本月
        if(flag == 'prev') {
          startDate = this.time.getMonthStartDateDiff(start, -1);
          endDate = this.time.getMonthEndDateDiff(start, -1);
        } else {
          startDate = this.time.getMonthStartDateDiff(end, 1);
          endDate = this.time.getMonthEndDateDiff(end, 1);
        }
      } else if (dateType == 3) { //本年
        if(flag == 'prev') { 
          startDate = this.time.getYearStartDateDiff(start, -1);
          endDate = this.time.getYearEndDateDiff(start, -1);
        } else {
          startDate = this.time.getYearStartDateDiff(end, 1);
          endDate = this.time.getYearEndDateDiff(end, 1);
        }
      } else if (dateType == 5) { //本季度
        startDate = this.time.getQuarterStartDate();
        endDate = this.time.getQuarterEndDate();
      }
      this.setData({
        dateType: dateType,
        startDate: startDate,
        endDate: endDate
      });
    }
  }
})