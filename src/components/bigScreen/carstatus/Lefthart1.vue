<template>
  <div class="chart1">

          <dv-decoration3 style="margin-top:3%;margin-left:1%; width:auto;height:30px;"/>
           <dv-decoration7 style="width:150px;height:30px;margin:5% auto">
      <div class="fontcolor">
        车辆状态
      </div>


    </dv-decoration7>
         <div class="fontcolor" style="margin-left: 10%;margin-top: 1%">
               <div style="float:left;">当前运行状态：</div><div style="color: green">正常</div>
               <div style="float:left;">经度：</div><div style="color: #5BB8F1">东经182.15678</div>
                <div style="float:left;">纬度：</div><div style="color: #5BB8F1">北纬38.5678</div>
               <div >信号强度：</div><div style="color: red;text-align: center;font-size: 40px">高</div>
                <div style="float:left;">当前时间：</div><div style="color: #3EFFAD;font-style: italic">2023-7-31 12:21:32</div>
             </div>

  </div>
</template>

<script  setup>
    import {reactive, ref,onMounted ,watch} from 'vue'

</script>

<style lang="less">
.chart1{
  width: 100%;
  height: 33%;

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
