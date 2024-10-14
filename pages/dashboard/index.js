import util from '../../utils/util.js'
Page({
  data: {
    chartData: {},
    localData: {},
    areaData: {},
    opts: {},
    content: []
  },
  onReady() {
    this.getServerData();
    this.getSumBlock();
    console.log("Fibonacci(10)=>"+util.Fibonacci(10)) // 89
    console.log("Fibonacci(40)=>"+util.Fibonacci(40)) // 165580141 计算缓慢有延迟了
    console.log("Fibonacci(100)=>"+util.Fibonacci(100)) // 573147844013817200000 速度依旧很快
    console.log("Fibonacci(1000)=>"+util.Fibonacci(1000)) // 7.0330367711422765e+208 还是没有压力
    console.log("Fibonacci(1475)=>"+util.Fibonacci(1475)) 
  },
  getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let chartData = {
            categories:["2016", "2017", "2018", "2019", "2020", "2021"],
            series: [
              {
                name: "利润",
                data: [35, 36, 31, 33, 13, 34]
              }
            ]
          };

      let opts = {
        "extra": {
          "line": {
            "type": "curve",
            "width": 2
          }
        }
      }

      let localData =  [
          {value:50, text:"一班"},
          {value:30, text:"二班"},
          {value:20, text:"三班"},
          {value:18, text:"四班"},
          {value:8, text:"五班"},
          {value:28, text:"六班"},
          {value:15, text:"七班"},
          {value:26, text:"八班"},
          {value:32, text:"九班"},
          {value:11, text:"十班"},
      ]

      let ringOpts = {
        "legend": {
          "position": "bottom"
        },
        "title": {
          "name": ""
        },
        "subtitle": {
          "name": "",
        }
      }

      let areaData = {
        series: [
          {
            name: "目标值",
            data: [35, 36, 31, 33, 13, 34]
          },
          {
            name: "完成量",
            data: [18, 47, 30, 28, 15, 30]
          }
        ]
      }

      let areaOpts = {
        "extra": {
          "area": {
            "type": "curve"
          }
        }
      }
      this.setData({ chartData,opts,localData,ringOpts,areaData,areaOpts });
    }, 500);
  },
  complete(e){
    //console.log(e);
  },
  getSumBlock() {
    let content = [
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"1234567","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当日订单金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      },
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"1023465","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当日发货金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      },
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"31546890","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当月订单金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      },
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"28641296","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当月发货金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      },
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"65842659","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当年订单金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      },
      {
        "kind":1,
        "background":["#3EB2F5","#9374F7"],
        "content":[
          {"text":"","value":"59468236","colortext":"","colorvalue":"#fff","size":"50rpx"},
          {"text":"当年发货金额","value":"","colortext":"#fff","colorvalue":"","size":"24rpx"}
        ]
      }
    ]
    this.setData({ content })
  },
})