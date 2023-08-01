<template>
    <div class="chart-container">
      <div ref="chart" style="width: 100%; height: 100% ;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        data: [
          { time: '2023-07-01', count: 10 },
          { time: '2023-07-02', count: 20 },
          { time: '2023-07-03', count: 15 },
          { time: '2023-07-04', count: 30 },
          { time: '2023-07-05', count: 25 },
        ],
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const chartDom = this.$refs.chart;
        const myChart = echarts.init(chartDom);
  
        // 将数据转换成 ECharts 需要的格式
        const timeData = this.data.map(item => item.time);
        const countData = this.data.map(item => item.count);
  
        // ECharts 配置项
        // const option = {
        //   xAxis: {
        //     type: 'category',
        //     data: timeData,
        //   },
        //   yAxis: {
        //     type: 'value',
        //   },
        //   series: [
        //     {
        //       type: 'line',
        //       smooth: true, // 圆滑曲线
        //       data: countData,
        //     },
        //   ],
        // };
        const option  = {
        xAxis: {
          type: "category",
          data: timeData,
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        grid: {
          //布局
          show: true,
          left: "10px",
          right: "30px",
          bottom: "10px",
          top: "28px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        series: [
          {
            data: countData,
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            name: "报警1次数",
            color: "rgba(252,144,16,.7)",
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "rect",
                  symbolSize: [60, 26],
                  symbolOffset: [0, -20],
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                  },
                  label: {
                    color: "#FC9010",
                    backgroundColor: "rgba(252,144,16,0.1)",
                    borderRadius: 6,
                    padding: [7, 14],
                    borderWidth: 0.5,
                    borderColor: "rgba(252,144,16,.5)",
                    formatter: "报警1：{c}",
                  },
                },
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "circle",
                  symbolSize: 6,
                  itemStyle: {
                    color: "#FC9010",
                    shadowColor: "#FC9010",
                    shadowBlur: 8,
                  },
                  label: {
                    formatter: "",
                  },
                },
              ],
            },
          },
          {
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            name: "报警2次数",
            color: "rgba(9,202,243,.7)",
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "rect",
                  symbolSize: [60, 26],
                  symbolOffset: [0, -20],
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                  },
                  label: {
                    color: "#09CAF3",
                    backgroundColor: "rgba(9,202,243,0.1)",

                    borderRadius: 6,
                    borderColor: "rgba(9,202,243,.5)",
                    padding: [7, 14],
                    formatter: "报警2：{c}",
                    borderWidth: 0.5,
                  },
                },
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "circle",
                  symbolSize: 6,
                  itemStyle: {
                    color: "#09CAF3",
                    shadowColor: "#09CAF3",
                    shadowBlur: 8,
                  },
                  label: {
                    formatter: "",
                  },
                },
              ],
            },
          },
        ],
      };
        // 使用配置项显示图表
        myChart.setOption(option);
      },
    },
  };
  </script>
  
  <style>
  .chart-container {
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
  }
  </style>
  