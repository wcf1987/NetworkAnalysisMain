<template>
    <el-dialog v-model="dialogFormVisible" title="新增流程" @close='handleCancle' >
    <el-form :model="form" ref="formRef">
      <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
        <el-input v-model="form.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="流程名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(form)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
    import { onMounted } from 'vue'
   import { reactive, ref } from 'vue'





const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const  showD=(flags,row)=> {
      //alert(123)
    if (flags==1){
        console.log(row)
        form.value.id=row.id
        form.value.name=row.name
        flag.value=1
    }else{
        form.value.id=row
        form.value.name=''
        flag.value=0

    }
  dialogFormVisible.value=true
};
defineExpose({
      showD
    });
const flag=ref(0)
const form = ref({
  id: '',
  name: ''
})
const emit = defineEmits(['addValue','changeValue'])
const submitForm = (fo) => {
    //alert(fo.id)

            if(flag.value==0){
        emit('addValue', fo)
        }
        else{
         emit('changeValue',fo)
    }
      dialogFormVisible.value=false
    //handleCancle()
}

const handleCancle = () => {

   //if (!this.form) return
       // this.form.id='';
        //this.form.name='';
  //  this.$refs.formRef.resetFields()
}
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>