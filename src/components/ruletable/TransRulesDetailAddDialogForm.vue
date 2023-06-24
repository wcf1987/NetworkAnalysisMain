<template>
    <el-dialog v-model="dialogFormVisible" title="新增转换条件" @close='handleCancle'>
        <div v-if="editdiv">


        </div>
        <div class="divform">
            <div v-if="attrdiv" ref="div1">

                <el-form :model="form" ref="formRef">
                    <el-form-item label="序号" :label-width="formLabelWidth" prop="id">
                        <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
                    </el-form-item>
                    <el-form-item label="条件名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="源数据" :label-width="formLabelWidth" prop="name" v-show="false">
                        <el-input v-model="form.sourceid" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="目的数据" :label-width="formLabelWidth" prop="name" v-show="false">
                        <el-input v-model="form.targetid" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="源字段" :label-width="formLabelWidth" prop="source">

                        <el-cascader v-model="form.sourceData" :options="sourceoptions" :props="props1" clearable
                                     style="width: 300px; " collapse-tags @change="changeSourceInput"/>
                    </el-form-item>

                    <el-form-item label="目的字段" :label-width="formLabelWidth" prop="target" required>
                        <el-cascader v-model="form.targetData" :options="targetoptions" :props="props1" clearable
                                     style="width: 300px;" collapse-tags @change="changeTargetInput"/>

                    </el-form-item>

                    <el-form-item label="转换规则" :label-width="formLabelWidth" prop="ruleoptions">
                        <el-radio-group v-model="form.type" size="large" @change="changeAddForm">
                            <el-radio-button label="默认值">默认值</el-radio-button>
                            <el-radio-button label="赋原值">赋原值</el-radio-button>
                            <el-radio-button label="自定义转换公式">自定义转换公式</el-radio-button>
                            <el-radio-button label="内置转换公式">内置转换公式</el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <div v-if="customrulediv" ref="div3">
                        <el-form-item label="转换公式" :label-width="formLabelWidth" prop="rulestr" clearable>
                            <el-input
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                    type="textarea"
                                    placeholder="请输入转换公式"
                                    v-model="form.rulestr" autocomplete="off" style="width: 300px;"/>
                        </el-form-item>

                    </div>

                    <div v-if="funcrulediv" ref="div4">
                        <el-form-item label="内置转换公式" :label-width="formLabelWidth" prop="funcrule">

                            <el-cascader v-model="form.funcrule" :options="funcoptions" :props="props212" clearable
                                         style="width: 300px; " collapse-tags/>
                        </el-form-item>

                    </div>
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
    import HTTPRequest from "@/plugins/axiosInstance";

    const radio1 = ref([1, 2, 3, 4])
    const customrulediv = ref(false)
    const funcrulediv = ref(false)
    const attrdiv = ref(true)
    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const flag = ref(0)
    const readStatus = ref(false)
    const sourceoptions = ref([])
    const targetoptions = ref([])
    const props1 = {
        multiple: true,
        expandTrigger: 'hover',
        value: 'ename',
        label: 'name'
    }
    const props212 = {
        expandTrigger: 'hover',
        emitPath: 'false',
        value: 'name',
        label: 'name'
    }

    const funcoptions = ref([])
    const inita = HTTPRequest.post('/func/list').then(res => {
        funcoptions.value = res.data;
    })
    let sourceName = ''
    let targetName = ''
    const showD = (sflag, opt, row) => {
        //alert(123)
        HTTPRequest.post('/messageDetail/allList', {
            'messageID': opt[0],
        }).then(res => {
            sourceoptions.value = res.data;
        })

        HTTPRequest.post('/messageDetail/allList', {
            'messageID': opt[1],
        }).then(res => {
            targetoptions.value = res.data;
        })

        if (sflag == 1) {

            console.log(row)
            readStatus.value = false
            form.value.id = row.id
            form.value.name = row.name

            form.value.rulestr = row.rulestr
            form.value.type = row.type
            form.value.funcrule = row.funcrule

            form.value.sourceid = opt[0]
            form.value.targetid = opt[1]
            form.value.sourceData = row.sourcedata
            form.value.targetData = row.targetdata
            sourceName = opt[2]
            targetName = opt[3]
            changeAddForm(row.type)

            flag.value = 1
            readStatus.value = true
        } else {
            readStatus.value = false

            form.value.id = opt[4]
            form.value.name = ''


            form.value.sourceid = opt[0]
            form.value.targetid = opt[1]
            form.value.sourceData = ''
            form.value.targetData = ''
            sourceName = opt[2]
            targetName = opt[3]
            form.value.type = '默认值'
            form.value.funcrule = ''
            changeAddForm('默认值')
            form.value.rulestr = ''
            flag.value = 0
            customrulediv.value = false
            funcrulediv.value = false
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
            emit('addValue', [fo])
        } else {
            emit('changeValue', [fo])
        }
        dialogFormVisible.value = false
        //handleCancle()
    }
    const changeAddForm = (fo) => {
        console.log(fo)

        if (fo == '自定义转换公式') {
            customrulediv.value = true
            funcrulediv.value = false
        } else {
            if (fo == '内置转换公式') {
                customrulediv.value = false
                funcrulediv.value = true
            } else {
                customrulediv.value = false
                funcrulediv.value = false
            }

        }


    }
    const changeSourceInput = (fo) => {
        console.log(fo)
        let i = 0, tempstr = ''
        let sd = sourceName
        for (i = 0; i < fo.length; i++) {
            tempstr = tempstr + sd + '.' + fo[i].join('.') + '\n'
        }
        form.value.rulestr = form.value.rulestr + tempstr


    }
    const changeTargetInput = (fo) => {
        console.log(fo)
        let i = 0, tempstr = ''
        let td = targetName
        for (i = 0; i < fo.length; i++) {
            tempstr = tempstr + td + '.' + fo[i].join('.') + '\n'
        }
        form.value.rulestr = form.value.rulestr + tempstr


    }
    const handleCancle = () => {

        //if (!this.form) return
        // this.form.id='';
        //this.form.name='';
        //  this.$refs.formRef.resetFields()
    }


    /*
    const options = ref([
           {
        id: '1',
        value: '消息体A',
        label:'消息体A',
               children:[
                       {
            id: '1',
            name: '类型标记',
            value: '类型标记A',
            label:'类型标记A',
            length: '2',
            valuestr: '0xabab',
            type:'基础属性',

        },
        {
            id: '2',
            name: '消息标识',
            value: '消息标识A',
            label:'消息标识A',
            length: '1',
            valuestr: '',
            type:'基础属性',

        },
        {   id: '3',
            name: '消息类型',
            value: '消息类型A',
            label:'消息类型A',
            length: '1',
            valuestr: '',
            type:'基础属性',
    },
      {     id: '4',
            name: '消息长度',
            value: '消息长度A',
            label:'消息长度A',
            length: '2',
            valuestr: '',
          type:'基础属性',
    },
        {   id: '5',
            name: '消息编号',
            value: '消息编号A',
            label:'消息编号A',
            length: '1',
            valuestr: '',
            type:'基础属性',

      },
        {   id: '6',
            name: '嵌套消息体A',
            value: '嵌套消息体A',
            label:'嵌套消息体A',
            length: '',
            valuestr: '',
            type:'嵌套消息体',
        children:[{
            id: '1',
            name: '类型标记C',
            value: '类型标记C',
            label:'类型标记C',
            length: '2',
            valuestr: '0xabab',
            type:'基础属性',

        },
        {
            id: '2',
            name: '消息标识C',
            value: '消息标识C',
            label:'消息标识C',
            length: '1',
            valuestr: '',
            type:'基础属性',

        },
        {   id: '3',
            name: '消息类型C',
            value: '消息类型C',
            label:'消息类型C',
            length: '1',
            valuestr: '',
            type:'基础属性',
    },
      {     id: '4',
            name: '消息长度C',
            value: '消息长度C',
            label:'消息长度C',
            length: '2',
            valuestr: '',
          type:'基础属性',
    },
        {   id: '5',
            name: '消息编号C',
            value: '消息编号C',
            label:'消息编号C',
            length: '1',
            valuestr: '',
            type:'基础属性',

      },
           ],
      },
               ]
      },
      {
        id: '2',
        value: '消息体B',
        label:'消息体B',
        children: [
            {
            id: '1',
            name: '类型标记',
            value: '类型标记B',
            label:'类型标记B',
            length: '2',
            valuestr: '0xabab',
            type:'基础属性',

        },
        {
            id: '2',
            name: '消息标识',
            value: '消息标识B',
            label:'消息标识B',
            length: '1',
            valuestr: '',
            type:'基础属性',

        },
        {   id: '3',
            name: '消息类型',
            value: '消息类型B',
            label:'消息类型B',
            length: '1',
            valuestr: '',
            type:'基础属性',
    },
      {     id: '4',
            name: '消息长度',
            value: '消息长度B',
            label:'消息长度B',
            length: '2',
            valuestr: '',
          type:'基础属性',
    },
        {   id: '5',
            name: '消息编号',
            value: '消息编号B',
            label:'消息编号B',
            length: '1',
            valuestr: '',
            type:'基础属性',

      },
        {   id: '6',
            name: '嵌套消息体B',
            value: '嵌套消息体B',
            label:'嵌套消息体B',
            length: '',
            valuestr: '',
            type:'嵌套消息体',
        children:[{
            id: '1',
            name: '类型标记C',
            value: '类型标记C',
            label:'类型标记C',
            length: '2',
            valuestr: '0xabab',
            type:'基础属性',

        },
        {
            id: '2',
            name: '消息标识C',
            value: '消息标识C',
            label:'消息标识C',
            length: '1',
            valuestr: '',
            type:'基础属性',

        },
        {   id: '3',
            name: '消息类型C',
            value: '消息类型C',
            label:'消息类型C',
            length: '1',
            valuestr: '',
            type:'基础属性',
    },
      {     id: '4',
            name: '消息长度C',
            value: '消息长度C',
            label:'消息长度C',
            length: '2',
            valuestr: '',
          type:'基础属性',
    },
        {   id: '5',
            name: '消息编号C',
            value: '消息编号C',
            label:'消息编号C',
            length: '1',
            valuestr: '',
            type:'基础属性',

      },
           ],
      },

        ]
      }])
    */
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

    .el-input {
        width: 300px;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .divform {
        margin: 0;
        position: relative;
        left: 0px;
        top: 0px;
        right: 0;
        bottom: 0;
        padding: 0;
        overflow: hidden;

    }

</style>