<template>
    <div class="tab">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">

            <el-breadcrumb-item class="breadColor"  :to="{ path: '/Table1' }">网络数据包列表</el-breadcrumb-item>


            <!--  循环遍历面包屑列表 -->
            <el-breadcrumb-item class="breadColor"  :to="{path: '/Table2'}"
                                v-for="item in breadList"
                                @click.native="handleClcik(item)"
            >
                {{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>


        <el-table :data="netData" style=border :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
            <el-table-column prop="id" label="序号" width="150"/>
            <el-table-column prop="name" label="名称" width="177"/>
            <el-table-column prop="length" label="长度" width="120"/>
            <el-table-column prop="type" label="类型" width="120"/>
            <el-table-column label="操作" width="240">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="primary" size="small" @click="handleClickDelete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-4" @click="showDialog" :icon="DocumentAdd">新增</el-button>
        <DialogForm2 ref="testDialog" @testDD='addData'></DialogForm2>
    </div>
</template>

<script setup>
    import {ArrowRightBold} from '@element-plus/icons-vue'
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import DialogForm2 from "@/components/common/DialogForm2";

    const router = useRouter()
    const testDialog = ref()
    const route = useRoute()
    const querys = route.query
    const routs = "?id=" + querys.id + "&name=" + querys.name
    console.log(querys)


    let AllData = [
        {
            id: '1',
            name: 'IP地址',
            length: '32',
            type: '数据字段',
            InerData: [],
        },
        {
            id: '2',
            name: '端口地址',
            length: '8',
            type: '数据字段',
            InerData: [],
        },
        {
            id: '3',
            name: '第一封装体',
            length: '',
            type: '封装头',
            InerData: [
                {
                    id: '3',
                    name: '第一封装体内部变种',
                    length: '',
                    type: '封装头',
                    InerData: []
                }

            ],
        },
        {
            id: '4',
            name: '第一应用体',
            length: '',
            type: '应用体',
            InerData: [],
        },
        {
            id: '5',
            name: '第一消息体',
            length: '',
            type: '消息体',
            InerData: [],
        },

    ]
    const netData = ref(AllData)
    const breadList = ref([])
    breadList.value.push({name: querys.name, data: netData.value})


    function showDialog() {
        testDialog.value.showD()
    }

    const handleClcik = (itemt) => {
        //alert(123)
        netData.value = itemt.data

        let i = 0, flag = 0, k = 0
        for (i = 0; i < breadList.value.length; i++) {
            if (breadList.value[i] == itemt) {
                flag = 1
                break
            }

        }
        let temp = []
        for (k = 0; k <= i; k++) {
            temp.push(breadList.value[k])
        }
        breadList.value = temp
        return
    }
    const handleClickEdit = (index, row) => {
        console.log(index, row)
        if (row.type == '数据字段') {
            testDialog.value.showD(row)
        } else {
            netData.value = row.InerData
            breadList.value.push({name: row.name, data: row.InerData})
            //router.push('/table2')
            console.log(breadList)
        }

    }


    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        netData.value.push({'id': fo.id, 'name': fo.name, 'length': fo.length, 'type': fo.type, 'InerData': []})
    }
    const editData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        netData.value.push({'id': fo.id, 'name': fo.name, 'length': fo.length, 'type': fo.type, 'InerData': []})
    }
</script>

<style scoped>

    .tab {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10px 20px 10px 20px;
        overflow: hidden;

        margin: auto;
        position: relative;
        left: 20px;
        top: 10px;
        right: 0;
        bottom: 0;

    }

    .el-table {

        margin: auto;
        position: relative;
        left: 0px;
        top: 10px;
        right: 0;
        bottom: 0;
        padding: 0;
        background: transparent;

        font-family: MicrosoftYaHeiLight;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;


    }

    .mt-4.el-button {
        width: 808px;
        position: relative;
        left: 0px;
        top: 10px;
        right: 0;
        bottom: 0;
        padding: 0;
    }

    .el-breadcrumb {
        font-family: MicrosoftYaHeiLight;
        font-size: 18px;
        font-weight: bold;
    }

    .el-breadcrumb /deep/ .el-icon-arrow-right {
        color: red;
    }


</style>