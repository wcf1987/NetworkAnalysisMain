<template>
    <el-dialog v-model="dialogFormVisible" title="新增属性" @close='handleCancle'>
        <el-form :model="form" ref="formRef">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-if="showID">
                <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
            </el-form-item>
            <el-form-item label="属性名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="属性英文名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.ename" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="长度" :label-width="formLabelWidth" prop="length" v-if="false">
                <el-input v-model="form.length" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="值" :label-width="formLabelWidth" prop="type">
                <el-input v-model="form.valuestr" autocomplete="off"/>
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


    const showID = ref(true)

    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const flag = ref(0)
    const readStatus = ref(false)
    const showD = (flags, row) => {
        //alert(123)
        if (flags == 1) {
            showID.value = false
            console.log(row)
            readStatus.value = false
            form.value.id = row.id
            form.value.name = row.name
            form.value.ename = row.ename
            form.value.length = row.length
            form.value.valuestr = row.valuestr
            flag.value = 1
            readStatus.value = true
        } else {
            readStatus.value = false
            showID.value = true
            form.value.id = row
            form.value.name = ''
            form.value.ename = ''
            form.value.length = ''
            form.value.valuestr = ''
            flag.value = 0
            readStatus.value = true
        }
        dialogFormVisible.value = true
    };
    defineExpose({
        showD
    });
    const form = ref({
        id: '',
        name: '',
        length: '',
        valuestr: '',
    })
    const emit = defineEmits(['addValue', 'changeValue'])

    const submitForm = (fo) => {
        console.log(fo)
        if (flag.value == 0) {
            emit('addValue', fo)
        } else {
            emit('changeValue', fo)
        }
        dialogFormVisible.value = false
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