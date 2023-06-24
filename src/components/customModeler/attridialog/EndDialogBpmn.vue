<template>
    <el-dialog v-model="dialogFormVisible" title="解析目的" @close='handleCancle'>
        <el-form :model="form" ref="formRef">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-if="false">
                <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
            </el-form-item>
            <el-form-item label="应用头" :label-width="formLabelWidth" prop="id">

                <el-select v-model="form.source" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                            v-for="item in appoptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="转换函数" :label-width="formLabelWidth" prop="name">

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
    import {onMounted} from 'vue'
    import {reactive, ref} from 'vue'


    const readStatus = ref(true)

    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';

    const showD = (id, rules) => {
        let i

        let flag = rules.value.findIndex(t => t.id == id)

        //alert(123)
        //console.log(flag)
        if (flag != -1) {
            let item = rules.value[flag]
            readStatus.value = false
            form.value.id = id
            form.value.source = item.source
            form.value.target = item.target
            form.value.rule = item.rule
            form.value.rulestr = item.rulestr
            readStatus.value = true

        } else {
            readStatus.value = false
            form.value.id = id
            form.value.source = ''
            form.value.target = ''
            form.value.rule = ''
            form.value.rulestr = ''
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
    const emit = defineEmits(['addEndDataExp'])
    const submitForm = (fo) => {
        //alert(fo.id)
        emit('addEndDataExp', fo)
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
    const appoptions = ref(netstore.appList)

    const ruleoptions = [
        {
            id: '1',
            name: '转换a',

        },
        {
            id: '2',
            name: '转换b',

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