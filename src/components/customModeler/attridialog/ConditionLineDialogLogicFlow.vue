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
    import HTTPRequest from "@/plugins/axiosInstance";

    const sourceOptions = ref([])
    const geteOptions = async (id, If, alist) => {
        var usedlist = []
        var waitlist = []
        //waitlist.push(id)
        var t, k, m, n, c
        //var temp1 = getShape(id, state)
        var temp2=If.getEdgeDataById(id)
        //var temp2 = temp1.businessObject.sourceRef
        waitlist.push(temp2.sourceNodeId)
        while (waitlist.length > 0) {
            t = waitlist.pop()
            var temp = If.getNodeDataById(t)

            if (temp == undefined) {
                continue
            }
            if (temp.type == 'start') {
                if (usedlist.some(item => item == temp.id)) {
                    continue
                } else {
                    usedlist.push(temp.id)
                    continue
                }
            }
            if (temp.type == 'message' || temp.type == 'app' || temp.type == 'package' || temp.type == 'swich') {
                if (usedlist.some(item => item == temp.id)) {
                    continue
                } else {
                    usedlist.push(temp.id)
                    k = If.getNodeIncomingNode(t)
                    for (m = 0; m < k.length; m++) {
                        waitlist.push(k[m].id)
                    }
                }
            }
        }
        var i, arr1, arr2
//messageList,interfaceList,packageList,appList]

        sourceOptions.value = []
        arr1 = alist.value[0]

        arr1 = alist.value[1]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {
                await HTTPRequest.post('/interfaceDetail/list',
                    {
                        pid: arr2.interfaceID,
                        pageNum: 1,
                        pageSize: 1000,

                    }).then(res => {
                    //tableData.value=res.data;
                    if (res.data != undefined) {
                        let tempArray = {
                            id: arr2.interfaceID,
                            name: arr2.interfaceName,
                            children: res.data
                        }
                        sourceOptions.value.push(tempArray)
                    }
                })
                //temp=netstore.interfaceList.find(item=>item.name==arr2.source)

            }
        }
        arr1 = alist.value[2]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {
                await HTTPRequest.post('/packageDetail/list',
                    {
                        pid: arr2.packageID,
                        pageNum: 1,
                        pageSize: 1000,
                    }).then(res => {
                    //tableData.value=res.data;
                    if (res.data != undefined) {
                        let tempArray = {
                            id: arr2.packageID,
                            name: arr2.packageName,
                            children: res.data
                        }
                        sourceOptions.value.push(tempArray)
                    }
                })
            }
        }
        arr1 = alist.value[3]
        for (t = 0; arr1.value.length > 0 && t < usedlist.length; t++) {
            arr2 = arr1.value.find(item => item.id == usedlist[t])
            if (arr2 != undefined) {
                await HTTPRequest.post('/appDetail/list',
                    {

                        pid: arr2.appID,
                        pageNum: 1,
                        pageSize: 1000,
                    }).then(res => {
                    //tableData.value=res.data;
                    if (res.data != undefined) {
                        let tempArray = {
                            id: arr2.appID,
                            name: arr2.appName,
                            children: res.data
                        }
                        sourceOptions.value.push(tempArray)
                    }
                })

            }
        }


        console.log(sourceOptions.value)
        //sourceOptions.value.push()

    }

    function getShape(id, state) {
        var elementRegistry = state.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
    };
    const showD = (id, rules, If, alist) => {
        let i

        let flag = rules.value.findIndex(t => t.id == id)

        //alert(123)
        //console.log(flag)
        if (flag != -1) {
            let item = rules.value[flag]
            readStatus.value = false
            geteOptions(id, If, alist)
            form.value.id = id
            form.value.source = item.source
            form.value.rulestr = item.rulestr
            readStatus.value = true

        } else {
            readStatus.value = false
            geteOptions(id, If, alist)
            form.value.id = id
            form.value.source = ''
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
    const emit = defineEmits(['addConditionLineDataExp'])
    const submitForm = (fo) => {
        //alert(fo.id)
        emit('addConditionLineDataExp', fo)
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