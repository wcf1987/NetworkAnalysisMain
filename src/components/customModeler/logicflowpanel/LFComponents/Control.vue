<template>
  <div>
     <el-button-group>
      <el-button type="plain" size="small" @click="$_zoomIn">放大</el-button>
      <el-button type="plain" size="small" @click="$_zoomOut">缩小</el-button>
      <el-button type="plain" size="small" @click="$_zoomReset">大小适应</el-button>
      <el-button type="plain" size="small" @click="$_translateRest">定位还原</el-button>
      <el-button type="plain" size="small" @click="$_reset">还原(大小&定位)</el-button>
      <el-button type="plain" size="small" @click="$_undo" :disabled="undoDisable">上一步(ctrl+z)</el-button>
      <el-button type="plain" size="small" @click="$_redo" :disabled="redoDisable">下一步(ctrl+y)</el-button>
      <el-button type="plain" size="small" @click="$_download">下载图片</el-button>
      <el-button type="plain" size="small" @click="$_catData">保存数据</el-button>
      <el-button v-if="catTurboData" type="plain" size="small" @click="$_catTurboData">查看turbo数据</el-button>
      <el-button type="plain" size="small" @click="$_showMiniMap">查看缩略图</el-button>
         <el-button type="plain" size="small" @click="$_clearMap">清空画布</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data () {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    });
  },
  methods: {
    $_zoomIn(){
      this.$props.lf.zoom(true);
    },
    $_zoomOut(){
      this.$props.lf.zoom(false);
    },
    $_zoomReset(){
      this.$props.lf.resetZoom();
    },
    $_translateRest(){
      this.$props.lf.resetTranslate();
    },
    $_reset(){
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo(){
      this.$props.lf.undo();
    },
    $_redo(){
      this.$props.lf.redo();
    },
    $_download(){
      this.$props.lf.getSnapshot();
    },
    $_catData(){
      this.$emit('catData');
    },
    $_catTurboData(){
      this.$emit('catTurboData');
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 150, 40)
    },
    $_clearMap() {
      const { lf } = this.$props;
      lf.clearData();
    }
  }
}
</script>
<style scoped>
</style>
