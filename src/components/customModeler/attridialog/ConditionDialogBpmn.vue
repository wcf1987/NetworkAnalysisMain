<template>
    <el-dialog v-model="dialogFormVisible" title="条件选择" @close='handleCancle'>
        <el-form :model="form" ref="formRef">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="id" v-if="false">
                <el-input v-model="form.id" autocomplete="off" :readonly='readStatus'/>
            </el-form-item>
            <el-form-item label="前序节点数据" :label-width="formLabelWidth" prop="id">

                <el-cascader v-model="form.source" :options="sourceOptions" :props="props2" clearable
                             style="width: 300px; " collapse-tags @change="changeSourceInput"/>

            </el-form-item>

            <el-form-item label="条件路由" :label-width="formLabelWidth" prop="name">

                <el-input
                        :autosize="{ minRows: 2, maxRows: 10 }"
                        type="textarea"
                        placeholder="请输入转换公式"
                        v-model="form.rulestr" autocomplete="off" style="width: 300px;"/>
            </el-form-item>

            <el-form-item label="判断为真路径" :label-width="formLabelWidth" prop="id" v-show="false">

                <el-select v-model="form.trueEnd" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                            v-for="item in appoptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="判断为假路径" :label-width="formLabelWidth" prop="id" v-show="false">

                <el-select v-model="form.falseEnd" clearable placeholder="Select" style="width: 300px; ">
                    <el-option
                            v-for="item in appoptions"
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
    import {useNetworkStore} from '@/store/netstore'


    const readStatus = ref(true)
    const props2 = {
        multiple: true,
        expandTrigger: 'hover',
        value: 'name',
        label: 'name'
    }
    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const netstore = useNetworkStore();
    //const testop=netstore.interfaceList

    const sourceOptions = ref([])
    const geteOptions = (id, state, alist) => {
        var usedlist = []
        var waitlist = []
        waitlist.push(id)
        var t, k, m, n, c
        while (waitlist.length > 0) {
            t = waitlist.pop()
            var temp = getShape(t, state)
            if (temp == undefined) {
                continue
            }
            if (temp.type == 'bpmn:StartEvent') {
                if (usedlist.some(item => item == temp.id)) {
                    continue
                } else {
                    usedlist.push(temp.id)
                    continue
                }
            }
            if (temp.type == 'bpmn:SendTask' || temp.type == 'bpmn:ServiceTask' || temp.type == 'bpmn:BusinessRuleTask' || temp.type == 'bpmn:ExclusiveGateway') {
                if (usedlist.some(item => item == temp.id)) {
                    continue
                } else {
                    usedlist.push(temp.id)
                    k = temp.incoming
                    for (m = 0; m < k.length; m++) {
                        waitlist.push(k[m].businessObject.sourceRef.id)
                    }
                }
            }
        }
        var i, arr1, arr2
//messageList,interfaceList,packageList,appList]
        sourceOptions.value = []
        arr1 = alist.value[0]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {

                temp = netstore.messageList.find(item => item.name == arr2.source)
                if (temp != undefined) {
                    sourceOptions.value.push(temp)
                }
            }
        }
        arr1 = alist.value[1]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {

                temp = netstore.interfaceList.find(item => item.name == arr2.source)
                if (temp != undefined) {
                    sourceOptions.value.push(temp)
                }
            }
        }
        arr1 = alist.value[2]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {

                temp = netstore.packageList.find(item => item.name == arr2.source)
                if (temp != undefined) {
                    sourceOptions.value.push(temp)
                }
            }
        }
        arr1 = alist.value[3]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {

                temp = netstore.appList.find(item => item.name == arr2.source)
                if (temp != undefined) {
                    sourceOptions.value.push(temp)
                }
            }
        }


        console.log(sourceOptions.value)
        //sourceOptions.value.push()

    }

    function getShape(id, state) {
        var elementRegistry = state.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
    };
    const showD = (id, rules, state, alist) => {
        let i

        let flag = rules.value.findIndex(t => t.id == id)

        //alert(123)
        //console.log(flag)
        if (flag != -1) {
            let item = rules.value[flag]
            readStatus.value = false
            geteOptions(id, state, alist)
            form.value.id = id
            form.value.source = item.source
            form.value.target = item.target
            form.value.rule = item.rule
            form.value.rulestr = item.rulestr
            form.value.falseEnd = item.falseEnd
            form.value.trueEnd = item.trueEnd
            readStatus.value = true

        } else {
            readStatus.value = false
            geteOptions(id, state, alist)
            form.value.id = id
            form.value.source = ''
            form.value.target = ''
            form.value.rule = ''
            form.value.rulestr = ''
            form.value.falseEnd = ''
            form.value.trueEnd = ''
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
    const emit = defineEmits(['addConditionDataExp'])
    const submitForm = (fo) => {
        //alert(fo.id)
        emit('addConditionDataExp', fo)
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


    const changeSourceInput = (fo) => {
        console.log(fo)
        let i = 0, tempstr = ''
        for (i = 0; i < fo.length; i++) {
            tempstr = tempstr + fo[i].join('.') + '\n'
        }
        form.value.rulestr = form.value.rulestr + tempstr
    }
    const appoptions = netstore.interfaceList


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