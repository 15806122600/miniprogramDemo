class GetPeriod{
  constructor() {
    this.now = new Date();
    this.nowYear = this.now.getYear(); //当前年 
    this.nowMonth = this.now.getMonth(); //当前月 
    this.nowDay = this.now.getDate(); //当前日 
    this.nowDayOfWeek = this.now.getDay(); //今天是本周的第几天 
    this.nowYear += (this.nowYear < 2000) ? 1900 : 0;
  }
  //格式化数字
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  //格式化日期
  formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    return [myyear, mymonth, myweekday].map(this.formatNumber).join('-');
  }
  //获取某月的天数
  getMonthDays(myMonth) {
    let monthStartDate = new Date(this.nowYear, myMonth, 1);
    let monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  //获取本季度的开始月份
  getQuarterStartMonth() {
    let startMonth = 0;
    if (this.nowMonth < 3) {
      startMonth = 0;
    }
    if (2 < this.nowMonth && this.nowMonth < 6) {
      startMonth = 3;
    }
    if (5 < this.nowMonth && this.nowMonth < 9) {
      startMonth = 6;
    }
    if (this.nowMonth > 8) {
      startMonth = 9;
    }
    return startMonth;
  }
  
  //获取今天的日期
  getNowDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay));
  }

  getNowDateDiff(startDate, dateDiff) {
    return this.formatDate(new Date(new Date(startDate).getTime() + dateDiff*24*60*60*1000));
  }

  //获取本周的开始日期
  getWeekStartDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 1));
  }

  getWeekStartDateDiff(startDate, dateDiff) {
    var weekFirst = new Date(startDate)
    var now = new Date(weekFirst.getTime() + dateDiff*24*60*60*1000)
    var nowTime = now.getTime();
    var day = now.getDay() || 7 
    var oneDayTime = 24*60*60*1000 ;
    var MondayTime = nowTime - (day-1)*oneDayTime ;//显示周一
    return this.formatDate(new Date(MondayTime));
  }

  //获取本周的结束日期
  getWeekEndDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek + 1)));
  }

  getWeekEndDateDiff(endDate, dateDiff) {
    var weekLast = new Date(endDate)
    var now = new Date(weekLast.getTime() + dateDiff*24*60*60*1000)
    var nowTime = now.getTime();
    var day = now.getDay() || 7 
    var oneDayTime = 24*60*60*1000 ;
    var SundayTime = nowTime + (7-day)*oneDayTime ;//显示周日
    return this.formatDate(new Date(SundayTime));
  }

  //获取本月的开始日期
  getMonthStartDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, 1));
  }

  getMonthStartDateDiff(startDate, dateDiff) {
    var date = new Date(startDate);
    var firstdate = new Date(new Date(date).getFullYear(), new Date(date).getMonth()+ dateDiff*1, 1);
    return this.formatDate(firstdate);
  }

  //获取本月的结束日期
  getMonthEndDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.getMonthDays(this.nowMonth)));
  }

  getMonthEndDateDiff(endDate, dateDiff) {
    var date = new Date(endDate);
    var day = 0;
    if(dateDiff >0) {
      day = new Date(new Date(date).getFullYear(), new Date(date).getMonth()+2, 0).getDate();
    } else {
      day= new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0).getDate();
    }
    var enddate = new Date(new Date(date).getFullYear(), new Date(date).getMonth()+ dateDiff*1, day);
    return this.formatDate(enddate);
  }

  //获取本季度的开始日期
  getQuarterStartDate() {
    return this.formatDate(new Date(this.nowYear, this.getQuarterStartMonth(), 1));
  }
  //获取本季度的结束日期 
  getQuarterEndDate() {
    return this.formatDate(new Date(this.nowYear, this.getQuarterStartMonth() + 2, this.getMonthDays(this.getQuarterStartMonth() + 2)));
  }

  //获取本年的开始日期
  getYearStartDate() {
    return this.formatDate(new Date(this.nowYear, 0, 1));
  }

  getYearStartDateDiff(startDate, dateDiff) {
    var date = new Date(startDate);
    var firstdate = new Date(new Date(date).getFullYear() + dateDiff*1, 0, 1);
    return this.formatDate(firstdate);
  }

  //获取本年的结束日期
  getYearEndDate() {
    return this.formatDate(new Date(this.nowYear, 11, 31));
  }

  getYearEndDateDiff(endDate, dateDiff) {
    var date = new Date(endDate);
    var enddate = new Date(new Date(date).getFullYear() + dateDiff*1, 11, 31);
    return this.formatDate(enddate);
  }

  //获取时段方法
  getPeriod(obj){
    let opts = obj || {},time = null;
    opts = {
      periodType: opts.periodType || 'now',
      spaceType: opts.spaceType || '~'
    }
    function formatNumber(param1, param2){
      return [param1, param2].join(opts.spaceType);
    }
    if (opts.periodType == 'week'){
      time = formatNumber(this.getWeekStartDate(), this.getWeekEndDate());
    } else if (opts.periodType == 'month'){
      time = formatNumber(this.getMonthStartDate(), this.getMonthEndDate());
    } else if (opts.periodType == 'quarter') {
      time = formatNumber(this.getQuarterStartDate(), this.getQuarterEndDate());
    } else if (opts.periodType == 'year') {
      time = formatNumber(this.getYearStartDate(), this.getYearEndDate());
    } else {
      time = formatNumber(this.getNowDate(), this.getNowDate());
    }
    return time;
  }

}
module.exports = GetPeriod;