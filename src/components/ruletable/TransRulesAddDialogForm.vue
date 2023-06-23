<template>

    <el-dialog v-model="dialogFormVisible" title="新增转换规则" @close='handleCancle' >

    <el-form :model="form" ref="formRef">
      <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
      </el-form-item>
      <el-form-item label="转换规则名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="转换规则类型" :label-width="formLabelWidth" prop="type" v-if="false" >
         <el-input v-model="form.type" autocomplete="off" :readonly='readStatus'/>




      </el-form-item>


        <el-form-item label="源数据" :label-width="formLabelWidth" prop="source" required>

          <el-cascader v-model="form.sourceid" :options="options" :props="props1" clearable style="width: 300px; " collapse-tags  @change="changeSourceInput"/>
      </el-form-item>
              <el-form-item label="目的数据" :label-width="formLabelWidth" prop="target" required>
              <el-cascader v-model="form.targetid" :options="options" :props="props1" clearable style="width: 300px;" collapse-tags @change="changeTargetInput"/>

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
   import { reactive, ref,computed  } from 'vue'
import HTTPRequest from "@/plugins/axiosInstance";
const props1={
       multiple: false,
    expandTrigger: 'hover',
    value:'id',
    label:'name'
}
const options = ref([
  {
    value: '消息体A',
    label: '消息体A',
  },
  {
    value: '消息体B',
    label: '消息体B',
  },

])
    const inita= HTTPRequest.post('/message/list').then(res=>{
    options.value=res.data;
            })





const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const readStatus=ref(false)
const flag=ref(0)
const  showD=(flags,row)=> {
      //alert(123)
    if (flags==1){
        console.log(row)
        readStatus.value=false
        form.value.id=row.id
        form.value.name=row.name
        form.value.type=row.type
        form.value.sourceid=row.sourceid
        form.value.targetid=row.targetid
        readStatus.value=true
        flag.value=1
    }else{
        form.value.id=row
        form.value.name=''
        form.value.type=''
        form.value.sourceid=''
        form.value.targetid=''
        flag.value=0

    }
  dialogFormVisible.value=true
};
defineExpose({
      showD
    });
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