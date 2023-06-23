<template>
    <el-dialog v-model="dialogFormVisible" title="新增应用头" @close='handleCancle' >
    <el-form :model="form" ref="formRef">
      <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
      </el-form-item>
      <el-form-item label="应用头名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="应用头类型" :label-width="formLabelWidth" prop="type" >
         <el-input v-model="form.type" autocomplete="off" :readonly='readStatus'/>



      </el-form-item>

        <el-form-item label="打包函数" :label-width="formLabelWidth" prop="name">

            <el-select v-model="form.packID" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                      v-for="item in packoptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    />
            </el-select>
      </el-form-item>
                <el-form-item label="解包函数" :label-width="formLabelWidth" prop="name">

            <el-select v-model="form.unpackID" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                      v-for="item in unpackoptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    />
            </el-select>
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


import HTTPRequest from "@/plugins/axiosInstance";
const packoptions =ref([])
const unpackoptions =ref([])
const inita= HTTPRequest.post('/pack/listByType',
    {
        type:'应用头打包'
    }
).then(res=>{
    packoptions.value=res.data;
            })
const initb= HTTPRequest.post('/pack/listByType',
    {
        type:'应用头解包'
    }
).then(res=>{
    unpackoptions.value=res.data;
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
        form.unpackID=row.unpackID
        form.packID=row.packID
        readStatus.value=true
        flag.value=1
    }else{
        form.value.id=row
        form.value.name=''
        form.value.type=''
         form.unpackID=''
        form.packID=''
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