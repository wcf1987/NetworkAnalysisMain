<template>
  <div class="left-chart-1">

    <div class="lc1-details">
      运行负载情况
    </div>
    <dv-scroll-board :config="config" style="margin-left:10px;width:300px;height:auto" @mouseover="mouseoverHandler" @click="clickHandler" />

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'

const config = reactive({
  header: ['收发数据', '链路延迟', '链路通断', '丢包情况'],
  data: [
    ['行1列1', '行1列2', '行1列3','test'],
    ['行2列1', '行2列2', '行2列3','test'],
    ['行3列1', '行3列2', '行3列3','test'],
    ['行4列1', '行4列2', '行4列3','test'],
    ['行5列1', '行5列2', '行5列3','test'],
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
  .dv-scroll-board .rows{
      height: 200px !important;
  }
</style>
