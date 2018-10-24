import { corpCNSales } from 'data/corp-cn-sales-data.js'

const app = getApp()
App({
  onLaunch: function () {
  },
  globalData: {
    corpCNSales: corpCNSales
  }
})
