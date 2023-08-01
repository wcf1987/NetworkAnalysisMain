<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-25 09:18:22
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
    <div>
      <dv-scroll-board :config="config" style="width:100%;height:100%;" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        config: {
          header: ['设备id', '设备名称', '上行速率Kbps', '下行速率Kbps'],
          data: [
            ['1','无人机1号','100','200'],
            ['2','无人机2号','200','200'],
            ['3','无人机3号','200','200'],
            ['4','无人机4号','200','200'],
            ['5','无人机5号','200','200'],
            ['6','无人机6号','200','200'],
            ['7','无人机7号','200','200'],
            ['8','无人机8号','200','200'],
            ['9','无人机9号','200','200'],
          ],
          align: ['center','center','center','center'],
          columnWidth: [30],
        },
      }
    }
  }
  </script>
  <style lang='scss' scoped></style>