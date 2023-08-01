<template>
  <div class="chart1">

    <div class="chart-lable">
      <div style="color: white;text-align: left;">无人机A</div>
      <div style="float:left;">飞行线路</div><div style="color: green;text-align: left;">信阳-周口</div>
      <div style="float:left;">电源情况：</div><div> <dv-percent-pond :config="config" style="width:90px;height:30px" /></div>
      <div style="float:left;">预计到达时间</div><div style="color: #3EFFAD;font-style: italic;text-align: left;">2023-7-31 12:21:32</div>

    </div>

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'
    const config = reactive({
    value: 66,
      borderWidth:3,

  localGradient: true,
})
</script>

<style lang="less" scoped>
.chart1{
  width: 100%;
  height: auto;

  .chart-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;

  }

  .chart-lable {
    margin-top: 1%;

    height: 40px;
    font-size: 20px;

    align-items: center;
    text-indent: 20px;
    color: #cccdd9;
    display: block !important;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .chart-details{
    margin-top: 2%;

  }
  :deep(.dv-percent-pond text){
  display: none;
}
}
</style>
