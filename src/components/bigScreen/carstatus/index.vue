<template>
  <dv-full-screen-container class="box">
    <!-- 头部标题 -->
    <div>
      <div class="title">
        <span class="title-text">车辆状态</span>
      </div>
    </div>
    <!-- 中间 -->
    <div class="content-main">
      <!-- 左侧车辆状态框 -->
      <div class="content-left">
           <dv-border-box13 style="width: 90%;height: 80%; margin-left: 10%;margin-top: 5%;">
           <LeftChart1 />
     </dv-border-box13>
      </div>
      <!-- 中间 -->
      <div class="content-mid">
        <div class="car">
        </div>
      </div>
      <!-- 右侧 -->
      <div class="content-right">
        <dv-border-box13 style="width: 98%;height: 40%;margin-top: 1%">
           <RightChart1 />
        </dv-border-box13>
        <dv-border-box13 style="width: 98%;height: 45%; margin-top: 1%;">
         <RightChart2 />
        </dv-border-box13>
      </div>

    </div>
    <!-- 底部 -->
    <div class="content-bottom">
         <Bottom1 />
    </div>

  </dv-full-screen-container>
</template>

<script  setup>
 import RightChart1 from '@/components/bigScreen/carstatus/Righthart1.vue'
 import RightChart2 from '@/components/bigScreen/carstatus/Righthart2.vue'
 import LeftChart1 from '@/components/bigScreen/carstatus/Lefthart1.vue'
 import Bottom1 from '@/components/bigScreen/carstatus/Bottom1.vue'
</script>

<style lang="less">
.box {
  width: 96% !important;
  height: 100% !important;
  background-image: url('./img/bg.png');
  background-size: 100% 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  margin-left: 64px;

  .title {
    position: relative;
    text-align: center;
    background-size: cover;
    color: transparent;
    height: 60px;
    line-height: 46px;
    margin-top: 6px;

    .title-text {
      font-size: 25px;
      font-weight: 900;
      letter-spacing: 8px;
      width: 100%;
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-main {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;

    .content-left {
      width: 25%;
      height: 100%;
    }

    .content-mid {
      margin-left: 1%;
      width: 50%;
      height: 100%;

      .car {
        width: 100%;
        height: 100%;
        background-image: url('./img/car.png');
        background-size: 90%;
        background-repeat: no-repeat;
      }
    }

    .content-right {
      width: 25%;
      height: 100%;
      margin-right: 20px;
    }
  }

  .content-bottom {
    width: 100%;
    height: 20%;
    position: relative;
    bottom: 10px;
  }

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

}
</style>
