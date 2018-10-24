// 图形展示工具类

import * as echarts from '../ec-canvas/echarts';

/**
 * 对 chart 进行初始化
 */
export function initChart(option, that, componentId) {
  that.chartComponnet = that.selectComponent(componentId);
  that.chartComponnet.init((canvas, width, height) => {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
    chart.setOption(option);
    return chart;
  })
}