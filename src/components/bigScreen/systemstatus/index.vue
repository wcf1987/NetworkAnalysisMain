<template>
  <dv-full-screen-container class="box">
    <!-- 头部标题 -->
    <div>
      <div class="title">
        <span class="title-text">编排转换项目展示</span>
      </div>
    </div>
    <div class="content-main">
      <div class="content-left">

        <div class="left-box">
            <LeftTop style="width: 90%; height: 90%; margin-left: 20px; margin-top: 20px;" />
        </div>
        <div class="left-box">
            <LeftCenter style="width: 90%; height: 90%; margin-left: 20px; margin-top: 20px;" />
        </div>
        <div class="left-box">
            <LeftBottom style="width: 90%; height: 90%; margin-left: 20px; margin-top: 20px;" />
        </div>
      </div>
      <div class="content-mid">
        <div class="center-box">
          <CenterMap />
        </div>
      </div>
      <div class="content-right">
        <div class="right-box">
          <RightTop />
        </div>
        <div class="right-box">
          <RightCenter />
        </div>
        <div class="right-box">
          <RightBottom />
        </div>
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script  setup>
import LeftTop from '@/components/bigScreen/systemstatus/LeftTop.vue'
import LeftCenter from '@/components/bigScreen/systemstatus/LeftCenter.vue'
import LeftBottom from '@/components/bigScreen/systemstatus/LeftBottom.vue'
import RightBottom from '@/components/bigScreen/systemstatus/RightBottom.vue'
import RightTop from '@/components/bigScreen/systemstatus/RightTop.vue'
import RightCenter from '@/components/bigScreen/systemstatus/RightCenter.vue'
import CenterMap from '@/components/bigScreen/systemstatus/CenterMap.vue'

</script>

<style lang="less" scoped>
.box {
  width: 96% !important;
  height: 100% !important;
  background-image: url('./img/bg.png');
  background-size: 100% 100%;
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
    height: 100%;
    display: flex;
    flex-direction: row;

    .content-left {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .right-box,
    .left-box {
      width: 100%;
      height: 30%;
      margin-top: 8px;
    }

    .content-mid {
      margin-left: 1%;
      width: 30%;
      height: 90%;

    }

    .content-right {
      width: 30%;
      height: 100%;
      margin-left: 20px;
    }
  }


  .box-item {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: row;
    // background-color: rgb(255, 153, 0);
  }

  .fontcolor {
    color: #f9fff6;
  }

  .contents {

    .contetn_left,
    .contetn_right {
      width: 540px;
      box-sizing: border-box;
      // padding: 16px 0;
    }

    .contetn_center {
      width: 720px;
    }

    //左右两侧 三个块
    .contetn_lr-item {
      height: 310px;
    }

    .contetn_center_top {
      width: 100%;
    }

    // 中间
    .contetn_center {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .contetn_center-bottom {
      height: 315px;
    }

    //左边 右边 结构一样
    .contetn_left,
    .contetn_right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;


    }
  }

}
</style>
