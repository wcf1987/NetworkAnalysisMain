<template>
  <div class="chart1">

    <div class="chart-lable">
      运行负载情况
    </div>
    <dv-capsule-chart class="chart-details" :config="state.config" />
  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'
const state = reactive({
  config: {
    data: [
      {
        name: 'CPU',
        value: 98,
      },
      {
        name: '磁盘',
        value: 96,
      },
      {
        name: '内存',
        value: 89,
      },
      {
        name: '网络',
        value: 83,
      },
      {
        name: '其他',
        value: 77,
      },
    ],
    colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    unit: '%',
  },
})
</script>

<style lang="less">
.chart1{
  width: 100%;
  height: 33%;

  display: flex;
  flex-direction: column;

  .chart-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;

  }

  .chart-lable {
    margin-top: 5%;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
    color: #cccdd9;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .chart-details{
    margin-top: 2%;
    flex: 1;
  }
}
</style>
