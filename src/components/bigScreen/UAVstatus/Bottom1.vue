<template>

  <div class="bg">
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car1.png" style="width: 30px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">010</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">型号</span>
          </div>
          <div class="split">
            <img src="./img/split.png" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car2.png" style="width: 35px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">23度</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">水温</span>
          </div>
          <div class="split">
            <img src="./img/split.png" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car3.png" style="width: 35px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">300KM/H</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">速度</span>
          </div>
          <div class="split">
            <img src="./img/split.png" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car4.png" style="width: 30px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">30000/s</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">转速</span>
          </div>
          <div class="split">
            <img src="./img/split.png" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car5.png" style="width: 30px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">14619</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">油耗</span>
          </div>
          <div class="split">
            <img src="./img/split.png" style="width: 100%;height: 100%;">
          </div>
        </div>
        <div class="box-item">
          <div class="icon">
            <img src="./img/icon-car6.png" style="width: 30px;margin-left: 15px;margin-top: 15px;">
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 30px;">
              <span style="font-size: 20px;color: #00EAFF;margin-top: 12px;">正常</span>
              <span style="font-size: 20px;color: white;font-weight: 800;margin-top: 5px;">飞行姿态</span>
          </div>
        </div>
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

<style lang="less" scoped>
.bg {
    width: 100%;
    height: 60%;
    top: 20%;
    left: 4%;
    position: absolute;
    background-image: url('./img/bottom.png');
    background-size: 90% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
  }

  .box-item {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: row;
    // background-color: rgb(255, 153, 0);
  }
  .icon {
    width: 65px;
    height: 65px;
    background-image: url('./img/icon-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 10%;
    margin-top: 20px;
  }
.fontcolor{
  color: #f9fff6;
}
</style>
