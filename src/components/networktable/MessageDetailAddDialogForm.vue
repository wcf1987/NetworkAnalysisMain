<template>
    <el-dialog v-model="dialogFormVisible" title="新增属性" @close='handleCancle'>
        <div v-if="editdiv">
            <el-radio-group v-model="radio1" size="large" @change="changeAddForm">
                <el-radio-button label="attr">新增基础属性</el-radio-button>
                <el-radio-button label="mess">新增嵌套消息体</el-radio-button>

            </el-radio-group>

        </div>
        <div class="divform">
            <div v-if="attrdiv" ref="div1">

                <el-form :model="form" ref="formRef">
                    <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
                        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
                    </el-form-item>
                    <el-form-item label="属性名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="属性英文名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.ename" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="是否可选项" :label-width="formLabelWidth" prop="name">
                        <el-select v-model="form.optional" autocomplete="off">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="长度" :label-width="formLabelWidth" prop="length">
                        <el-input v-model="form.length" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="值" :label-width="formLabelWidth" prop="type">
                        <el-input v-model="form.valuestr" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth" prop="type" v-show="false">
                        <el-input v-model="form.type" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="messdiv" ref="div2">
                <el-form :model="form" ref="formRef">
                    <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-show="false">
                        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
                    </el-form-item>
                    <el-form-item label="消息体名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="消息体英文名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.ename" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="是否可选项" :label-width="formLabelWidth" prop="name">
                        <el-select v-model="form.optional" autocomplete="off">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息体类型" :label-width="formLabelWidth" prop="type" v-show="false">
                        <el-input v-model="form.type" autocomplete="off" value="嵌套消息体"/>

                    </el-form-item>
                </el-form>

            </div>
        </div>
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


    const radio1 = ref('attr')
    const messdiv = ref(false)
    const attrdiv = ref(true)
    const editdiv = ref(true)
    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const flag = ref(0)
    const readStatus = ref(false)
    const showD = (flags, row) => {
        //alert(123)
        if (flags == 1) {
            if (row.type == '嵌套消息体') {
                editdiv.value = false
                attrdiv.value = false
                messdiv.value = true
                console.log(row)
                readStatus.value = false
                form.value.id = row.id
                form.value.name = row.name
                form.value.ename = row.ename
                form.value.length = row.length
                form.value.valuestr = row.valuestr
                form.value.type = row.type
                form.value.optional = row.optional
                flag.value = 1
                readStatus.value = true
            } else {
                editdiv.value = false
                attrdiv.value = true
                messdiv.value = false
                console.log(row)
                readStatus.value = false
                form.value.id = row.id
                form.value.name = row.name
                form.value.ename = row.ename
                form.value.length = row.length
                form.value.optional = row.optional
                form.value.type = row.type
                form.value.valuestr = row.valuestr
                flag.value = 1
                readStatus.value = true
            }
        } else {
            readStatus.value = false
            editdiv.value = true
            messdiv.value = false
            radio1.value = "attr"
            attrdiv.value = true
            form.value.id = row
            form.value.name = ''
            form.value.ename = ''
            form.value.length = ''
            form.value.optional = ''
            form.value.valuestr = ''
            form.value.type = '嵌套消息体'
            flag.value = 0
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
    const options = ref(
        [
            {
                id: '1',
                value: '可选项（无该项内容）',
                label: '可选项（无该项内容）',
            },
            {
                id: '2',
                value: '可选项（有该项内容）',
                label: '可选项（有该项内容）',
            }, {
            id: '3',
            value: '可选项（必须有该项内容）',
            label: '可选项（必须有该项内容）',
        }, {
            id: '4',
            value: '必选项',
            label: '必选项',
        }
        ]
    )
    const submitForm = (fo) => {
        console.log(fo)
        if (flag.value == 0) {
            emit('addValue', [fo, attrdiv.value])
        } else {
            emit('changeValue', [fo, attrdiv.value])
        }
        dialogFormVisible.value = false
        //handleCancle()
    }
    const changeAddForm = (fo) => {
        console.log(fo)
        if (fo == 'attr') {
            messdiv.value = false
            attrdiv.value = true
        } else {
            messdiv.value = true
            attrdiv.value = false
        }

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

    .divform {
        margin: 0;
        position: relative;
        left: 30px;
        top: 30px;
        right: 0;
        bottom: 0;
        padding: 0;
        overflow: hidden;

    }

</style>