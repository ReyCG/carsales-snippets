// 大陆汽车销量工具类

const app = getApp()

/**
 * 获取中国大陆销量初始化 line 趋势图
 */
function getCnSalesInitLineOption() {
  return {
    title: {
      text: '中国大陆汽车销量趋势图',
      textStyle: {
        fontSize: 10
      }
    },
    color: ["#c23531"],
    // 图例组件 http://echarts.baidu.com/option.html#legend
    legend: {
      data: [],
      top: 25,  // 图例组件距离容器上侧的距离
      left: 'center',
      backgroundColor: "white",
      z: 100
    },
    // 直角坐标系内绘图网格
    grid: {
      containLabel: true //  包含坐标轴的刻度标签
    },
    xAxis: {
      type: 'category',  //  类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
      boundaryGap: false, // 坐标轴两边的留白策略
      data: [],
      axisLabel: {
        //interval: 2,  // 横轴信息显示间隔
        rotate: -30, // 坐标抽倾斜角度
        'symbol': 'none'
      }
    },
    yAxis: {
      type: 'value',  // 坐标轴类型： 连续数据
      name: '销量(万辆)',
      splitLine: {
        lineStyle: {  // 坐标轴在 grid 区域中的分隔线
          type: 'dashed'
        }
      }
    },
    // 系列列表
    series: []
  };
}

export const CN_SALES_3_MONTH = 1;
export const CN_SALES_6_MONTH = 2;
export const CN_SALES_1_YEAR = 3;
export const CN_SALES_ALL = 4; //全部

/**
 * 根据输入的枚举，获取大陆销量列表
 * CN_SALES_3_MONTH -- 最近 3 个月的销量列表
 * CN_SALES_6_MONTH -- 最近 6 个月的销量列表
 * CN_SALES_1_YEAR -- 最近 1 年的销量列表
 * CN_SALES_ALL -- 全部的销量列表
 */
function fetchCnSalesList(period) {
  switch (period) {
    case CN_SALES_3_MONTH: return app.globalData.corpCNSales.slice(0, 3);
    case CN_SALES_6_MONTH: return app.globalData.corpCNSales.slice(0, 6);
    case CN_SALES_1_YEAR: return app.globalData.corpCNSales.slice(0, 12);
    case CN_SALES_ALL: return app.globalData.corpCNSales;
    default: return []
  }
}

/**
 * 根据展示周期，填充大陆销量 line option
 */
export function fillUpCnSalesOption(period) {
  const cnSalesList = fetchCnSalesList(period)

  const option = getCnSalesInitLineOption()

  const monthData = []
  for (let item of cnSalesList) {
    // 获取年，月数值
    const year = item.date.split('-')[0].slice(2)
    let month = item.date.split('-')[1]
    if (month.charAt(0) === '0') {
      month = month.slice(1)
    }
    monthData.unshift(year + '年' + month + '月')
  }

  switch (period) {
    case CN_SALES_1_YEAR: option.xAxis.axisLabel.interval = 2; break;
    case CN_SALES_ALL: option.xAxis.axisLabel.interval = 24; break;
  }

  const salesData = []
  for (let item of cnSalesList) {
    const num = new Number(item.salesNum / 10000)
    salesData.unshift(num.toFixed(2))
  }

  // 填充 x 坐标值
  option.xAxis.data = monthData

  // 填充系列列表
  option.series[0] = {
    name: 'sales data',
    type: 'line',
    smooth: true,
    data: salesData
  }

  return option
}