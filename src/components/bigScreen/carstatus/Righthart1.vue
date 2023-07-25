<template>
  <div class="left-chart-1">

    <div class="lc1-details">
      运行负载情况
    </div>
    <dv-capsule-chart class="lc1-chart" :config="state.config" />
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
.left-chart-1 {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;

  .lc1-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc3-details {
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
