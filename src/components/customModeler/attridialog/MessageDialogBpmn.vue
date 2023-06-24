<template>
    <el-dialog v-model="dialogFormVisible" title="解析消息体" @close='handleCancle'>
        <el-form :model="form" ref="formRef">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-if="false">
                <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
            </el-form-item>


            <el-form-item label="转换函数" :label-width="formLabelWidth" prop="name">

                <el-select v-model="form.ruleID" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                            v-for="item in ruleoptions"
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
    import {onMounted} from 'vue'
    import {reactive, ref} from 'vue'
    import HTTPRequest from "@/plugins/axiosInstance";


    const readStatus = ref(true)

    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';

    const showD = (id, rules) => {
        let i
        let item
        let flag = 0
        for (i = 0; i < rules.value.length; i++) {
            item = rules.value[i]
            if (item.id == id) {
                flag = 1
                break
            }

        }
        //alert(123)
        //console.log(flag)
        if (flag == 1) {

            readStatus.value = false
            form.value.id = id
            form.value.ruleID = item.ruleID

            readStatus.value = true

        } else {
            readStatus.value = false
            form.value.id = id
            form.value.ruleID = ''

            readStatus.value = true
        }
        dialogFormVisible.value = true
    };
    defineExpose({
        showD
    });
    const form = ref({
        id: '',
        name: ''
    })
    const emit = defineEmits(['addMessageDataExp'])
    const submitForm = (fo) => {
        //alert(fo.id)
        fo.ruleName = ruleoptions.value.find(item => item.id == fo.ruleID).name
        emit('addMessageDataExp', fo)
        dialogFormVisible.value = false
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
    const appoptions = ref([])
    const ruleoptions = ref([])
    const inita = HTTPRequest.post('/rule/list').then(res => {
        ruleoptions.value = res.data;
    })

    /*
  const ruleoptions = [
    {
    id: '1',
    name: '消息体转换规则A',

  },
  {
    id: '2',
    name: '消息体转换规则B',

  },
]*/
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