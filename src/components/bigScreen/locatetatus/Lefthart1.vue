<template>
<div class="chart1">
      <dv-flyline-chart-enhanced :config="config" :dev="true" style="width:99%;height:105%;" />

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'
import mapImg from '@/assets/map.jpg'
import mapPoint from '@/assets/mapPoint.png'
import mapCenterPoint from '@/assets/mapCenterPoint.png'

const config = reactive({
  points: [
    {
      name: '郑州',
      coordinate: [0.48, 0.35],
      halo: {
        show: true,
      },
      icon: {
        src: mapCenterPoint,
        width: 30,
        height: 30,
      },
      text: {
        show: false,
      },
    },
    {
      name: '新乡',
      coordinate: [0.52, 0.23],
    },
    {
      name: '焦作',
      coordinate: [0.43, 0.29],
    },
    {
      name: '开封',
      coordinate: [0.59, 0.35],
    },
    {
      name: '许昌',
      coordinate: [0.53, 0.47],
    },
    {
      name: '平顶山',
      coordinate: [0.45, 0.54],
    },
    {
      name: '洛阳',
      coordinate: [0.36, 0.38],
    },
    {
      name: '周口',
      coordinate: [0.62, 0.55],
      halo: {
        show: true,
        color: '#8378ea',
      },
    },
    {
      name: '漯河',
      coordinate: [0.56, 0.56],
    },
    {
      name: '南阳',
      coordinate: [0.37, 0.66],
      halo: {
        show: true,
        color: '#37a2da',
      },
    },
    {
      name: '信阳',
      coordinate: [0.55, 0.81],
        halo: {
        show: true,
        color: '#37a2da',
      },
    },
    {
      name: '驻马店',
      coordinate: [0.55, 0.67],
    },
    {
      name: '济源',
      coordinate: [0.37, 0.29],
    },
    {
      name: '三门峡',
      coordinate: [0.20, 0.36],
    },
    {
      name: '商丘',
      coordinate: [0.76, 0.41],
    },
    {
      name: '鹤壁',
      coordinate: [0.59, 0.18],
    },
    {
      name: '濮阳',
      coordinate: [0.68, 0.17],
    },
    {
      name: '安阳',
      coordinate: [0.59, 0.10],
    },
  ],
  lines: [
    {
      source: '新乡',
      target: '郑州',
        color: '#fb7293',
      width: 3,
    },

    {
      source: '周口',
      target: '郑州',
      color: '#fb7293',
      width: 3,
    },
    {
      source: '南阳',
      target: '郑州',
      color: '#fb7293',
      width: 3,
    },

    {
      source: '信阳',
      target: '周口',
      color: '#8378ea',
            width: 3,
    },
  ],
  icon: {
    show: true,
    src: mapPoint,
  },
  text: {
    show: true,
  },
  k: 0.5,
  bgImgSrc: mapImg,})
</script>

<style lang="less" scoped>
.chart1{
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
    .fontcolor{
        line-height: 40px;
    }
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
