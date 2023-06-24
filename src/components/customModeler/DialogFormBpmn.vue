<template>
    <el-dialog v-model="dialogFormVisible" title="规则" @close='handleCancle'>
        <el-form :model="form" ref="formRef">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
                <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
            </el-form-item>
            <el-form-item label="源数据字段" :label-width="formLabelWidth" prop="id">

                <el-cascader v-model="form.source" :options="options" :props="props1" clearable/>
            </el-form-item>
            <el-form-item label="目的数据字段" :label-width="formLabelWidth" prop="name">

                <el-cascader v-model="form.target" :options="options" :props="props1" clearable/>
            </el-form-item>
            <el-form-item label="转换规则" :label-width="formLabelWidth" prop="rule">
                <el-input v-model="form.rule" autocomplete="off"/>
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
            form.value.source = item.source
            form.value.target = item.target
            form.value.rule = item.rule
            readStatus.value = true

        } else {
            readStatus.value = false
            form.value.id = id
            form.value.source = ''
            form.value.target = ''
            form.value.rule = ''
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
    const emit = defineEmits(['testDD'])
    const submitForm = (fo) => {
        //alert(fo.id)
        emit('testDD', fo)
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
    const options = [
        {
            value: '1',
            label: 'IP地址',
            length: '32',
            type: '数据字段',
            InerData: [],
        },
        {
            value: '2',
            label: '端口地址',
            length: '8',
            type: '数据字段',
            InerData: [],
        },
        {
            value: '3',
            label: '第一封装体',
            length: '',
            type: '封装头',
            children: [
                {
                    value: '3',
                    label: '第一封装体内部变种',
                    length: '',
                    type: '封装头',
                    children: []
                }

            ],
        },
        {
            value: '4',
            label: '第一应用体',
            length: '',
            type: '应用体',
            children: [],
        },
        {
            value: '5',
            label: '第一消息体',
            length: '',
            type: '消息体',
            children: [],
        }
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