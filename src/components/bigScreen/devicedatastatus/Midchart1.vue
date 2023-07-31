<template>
  <div class="chart1">
      <dv-scroll-board class="chart-details" :config="config" style="margin-left:2%;width:96%;height:auto" @mouseover="mouseoverHandler" @click="clickHandler" />

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'
const config = reactive({
  header: ['设备ID', '所属组别', '经度/纬度/高度','飞行速度','C1数据','C2数据','C3数据', '其他数据'],
  data: [
    ['1', 'A', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['2', 'A', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['3', 'B', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['4', 'B', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['5', 'B', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['6', 'B', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['7', 'C', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['8', 'C', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['9', 'C', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['10', 'D', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['11', 'D', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
    ['12', 'E', 'E:162.3241/N:42.1412/H:1023','54.32','99.3%','99.2%','99.18','1'],
  ],
  index: false,
  headerHeight:40,
  columnWidth: [150,150,300,150,150,100,100,100],
  headerBGC:'#487488',
  align: ['center','center','center','center','center','center','center','center'],
  carousel:'single',
  waitTime:2000,
  rowNum:9,
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
  height: 100%;

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
