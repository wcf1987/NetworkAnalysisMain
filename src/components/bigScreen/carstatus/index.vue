<template>
  <div id="data-view">
    <dv-full-screen-container>
      <!-- 头部标题 -->
      <div class=" title_wrap">
        <div class="zuojuxing"></div>
        <div class="youjuxing"></div>
        <div class="guang"></div>
          <div class="title">
            <span class="title-text">车辆状态</span>
          </div>
      </div>

      <!-- 左侧车辆状态框 -->
      <div class="contetn-left">

      </div>

      <!-- 底部 -->
      <div class="contetn-bottom">

      </div>
      
    </dv-full-screen-container>
  </div>
</template>

<script  setup>

</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    width: 96% !important;
    height: 100% !important;
    background-image: url('./img/bg2.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    margin-left: 64px;
  }

  .title_wrap {
    height: 60px;
    background-image: url("./img/top.png");
    background-size: cover;
    background-position: center center;
    position: relative;
    margin-top: 10px;

    .guang {
      position: absolute;
      bottom: -26px;
      background-image: url("./img/guang.png");
      background-position: 80px center;
      width: 100%;
      height: 56px;
    }

    .zuojuxing,
    .youjuxing {
      position: absolute;
      top: -2px;
      width: 140px;
      height: 6px;
      background-image: url("./img/juxing1.png");
    }

    .zuojuxing {

      left: 11%;
    }

    .youjuxing {
      right: 11%;
      transform: rotate(180deg);
    }
  }

  .title {
    position: relative;
    // width: 500px;
    text-align: center;
    background-size: cover;
    color: transparent;
    height: 60px;
    line-height: 46px;

    .title-text {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 6px;
      width: 100%;
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .contetn-left {
    width: 30%;
    height: 65%;
    background-color: aqua;
  }
  .contetn-bottom {
    width: 100%;
    height: 35%;
    background-color: yellow
  }
}
</style>
