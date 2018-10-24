import * as cnSaleUtils from '../utils/cnSaleUtils.js'
import * as chartUtils from '../utils/chartUtils.js'
import * as echarts from '../ec-canvas/echarts.js'

const app = getApp()

Page({
  data: {
    ecLine: {
      lazyLoad: true
    },
    periodClass: ['', 'cur', '', ''],
    periodIndex: 2
  },
  onLoad: function () {
    this.showCnSalesChart()
  },
  // 绑定中国大陆销量月份销量变化
  cnSalePeriodChange: function (e) {
    console.log('cnSalesPeriodChange')
    const periodIndex = e.currentTarget.dataset.index;
    if (this.data.periodIndex === parseInt(periodIndex)) {
      return
    }

    const periodClass = ['', '', '', '']
    periodClass[periodIndex - 1] = 'cur'

    this.setData({
      periodIndex: parseInt(periodIndex),
      periodClass: periodClass
    })
    const cnSalesOption = cnSaleUtils.fillUpCnSalesOption(this.data.periodIndex)
    this.showCnSalesChart()
  },
  // 显示大陆销量图
  showCnSalesChart: function () {
    const cnSalesOption = cnSaleUtils.fillUpCnSalesOption(this.data.periodIndex)
    this.setData({
      loading: false
    })

    chartUtils.initChart(cnSalesOption, this, '#cnsales-line-chart')
  },
  // 进入排行榜页面
  gotoRankingPage: function (e) {
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },

})
