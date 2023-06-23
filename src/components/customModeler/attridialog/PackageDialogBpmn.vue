<template>
    <el-dialog v-model="dialogFormVisible" title="解析封装头" @close='handleCancle' >
    <el-form :model="form" ref="formRef">
        <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-if="false">
        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
      </el-form-item>
      <el-form-item label="封装头" :label-width="formLabelWidth" prop="id">

           <el-select v-model="form.packageID" clearable placeholder="Select" style="width: 300px; ">
                        <el-option
                          v-for="item in appoptions"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id"
                        />
          </el-select>
      </el-form-item>

      <el-form-item label="处理动作" :label-width="formLabelWidth" prop="name">

            <el-select v-model="form.rulestr" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                      v-for="item in ruleoptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
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


const readStatus=ref(true)

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const  showD=(id,rules)=> {
    let i

    let flag=rules.value.findIndex(t=>t.id==id)

      //alert(123)
    //console.log(flag)
    if (flag!=-1){
        let item=rules.value[flag]
        readStatus.value=false
        form.value.id=id
        form.value.packageID=item.packageID
        form.value.rulestr=item.rulestr
        readStatus.value=true

    }else{
        readStatus.value=false
        form.value.id=id
        form.value.packageID=''

        form.value.rulestr=''
        readStatus.value=true
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
const emit = defineEmits(['addPackageDataExp'])
const submitForm = (fo) => {
    //alert(fo.id)
       fo.packageName=appoptions.value.find(item=>item.id==fo.packageID).name
        emit('addPackageDataExp', fo)
      dialogFormVisible.value=false
    //handleCancle()
}

const handleCancle = () => {

   //if (!this.form) return
       // this.form.id='';
        //this.form.name='';
  //  this.$refs.formRef.resetFields()
}



const handleNodeClick = (data) => {
  console.log(data)
}
const props1 = {
  checkStrictly: true,
}
import {useNetworkStore} from '@/store/netstore'
const netstore = useNetworkStore();
const appoptions=ref([])
    const inita= HTTPRequest.post('/package/list').then(res=>{
    appoptions.value=res.data;
            })


  const ruleoptions = [
    {
    id: '1',
    name: '解包',

  },
  {
    id: '2',
    name: '封装',

  },
]
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