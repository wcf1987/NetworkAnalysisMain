<template>
    <el-dialog v-model="dialogFormVisible" title="新增计算函数" @close='handleCancle' >
    <el-form :model="form" ref="formRef">
      <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
      </el-form-item>
      <el-form-item label="函数名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>

          <el-form-item label="函数类型" :label-width="formLabelWidth" prop="name">

            <el-select v-model="form.type" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                      v-for="item in options"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
            </el-select>
      </el-form-item>

     <el-form-item label="函数描述" :label-width="formLabelWidth" prop="type" >
         <el-input
        :autosize="{ minRows: 2, maxRows: 10 }"
        type="textarea"
        placeholder="请输入函数描述"
        v-model="form.descri" autocomplete="off" style="width: 300px;"/>
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
const options = [
  {
    value: '数学函数',
    name: '数学函数',
  },
     {
    value: '字符串函数',
    name: '字符串函数',
  },
     {
    value: '逻辑函数',
    name: '逻辑函数',
  },
  {
    value: '时间函数',
    name: '时间函数',
  },
  {
    value: '集合函数',
    name: '集合函数',
  },
    {
    value: '自定义函数',
    name: '自定义函数',
  },

]




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
        form.value.descri=row.descri
        readStatus.value=true
        flag.value=1
    }else{
        form.value.id=row
        form.value.name=''
        form.value.type=''
        form.value.descri=''
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