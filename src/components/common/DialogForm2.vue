<template>
<el-dialog v-model="dialogFormVisible" title="新增数据结构" @close='handleCancle' >
    <el-form :model="form" ref="formRef">
      <el-form-item label="序号" :label-width="formLabelWidth" prop="id">
        <el-input v-model="form.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="数据包名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="长度" :label-width="formLabelWidth" prop="length">
        <el-input v-model="form.length" autocomplete="off" />
      </el-form-item>
       <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" >
        <el-option label="数据字段" value="数据字段" />
        <el-option label="封装头" value="封装头" />
            <el-option label="应用体" value="应用体" />
            <el-option label="消息体" value="消息体" />
      </el-select>
 </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm(form)">
          Confirm
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

const  showD=(row)=> {
    //alert(123)
    if (row!=null){
        console.log(row)
        form.value.id=row.id
        form.value.name=row.name
        form.value.length=row.length
        form.value.type=row.type
    }else{
        form.value.id=''
        form.value.name=''
        form.value.length=''
        form.value.type=''
    }
  dialogFormVisible.value=true
};
defineExpose({
      showD
    });
const form = ref({
  id: '',
  name: '',
  length: '',
  type: '',
})
const emit = defineEmits(['testDD'])
const submitForm = (fo) => {
    //alert(fo.id)
        emit('testDD', fo)
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