<template>
  <div class="chart1">

    <div class="chart-lable">
      网络动态
    </div>
    <dv-scroll-board class="chart-details" :config="config" style="margin-left:10px;width:300px;height:auto" @mouseover="mouseoverHandler" @click="clickHandler" />

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'

const config = reactive({
  header: ['序号', '链路延迟', '链路通断', '丢包情况'],
  data: [
    ['1', '33.4', '0.01','1%'],
    ['2', '25.6', '0.03','1%'],
    ['3', '19.4', '0.04','1%'],
    ['4', '28.1', '0.02','1%'],
    ['5', '18.3', '0.03','1%'],
  ],
  index: false,
  headerHeight:40,
  columnWidth: [50],
  align: ['center'],
  carousel:'single',
  rowNum:4,
})

const mouseoverHandler = (e) => {
  console.log(e)
}

const clickHandler = (e) => {
  console.log(e)
}
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
      color: #D96735;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .chart-details{
    flex: 1;
  }
}

</style>
