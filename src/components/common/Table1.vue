<template>
    <div class="tab">
        <el-breadcrumb :separator-icon="ArrowRightBold">
            <el-breadcrumb-item :to="{ path: '/Table1' }">网络数据包列表</el-breadcrumb-item>

        </el-breadcrumb>

        <el-table :data="tableData" style=border :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
            <el-table-column prop="id" label="序号" width="150"/>
            <el-table-column prop="name" label="数据包类型" width="310"/>
            <el-table-column label="操作" width="240">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="primary" size="small" @click="handleClickDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-4" @click="showDialog" :icon="DocumentAdd">新增
        </el-button
        >
        <DialogForm1 ref="testDialog" @testDD='addData'></DialogForm1>
    </div>
</template>

<script setup>
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import DialogForm1 from "@/components/common/DialogForm1";
    import {ArrowRightBold} from '@element-plus/icons-vue'

    const router = useRouter()
    const testDialog = ref()

    function showDialog() {
        testDialog.value.showD()
    }

    const handleClickEdit = (index, row) => {
        console.log(index, row)

        router.push('/table2?id=' + row.id + '&name=' + row.name)
    }

    const tableData = ref([
        {
            id: '1',
            name: '网络包A',

        },
        {
            id: '2',
            name: '网络包B',

        },
    ])

    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        tableData.value.push({'id': fo.id, 'name': fo.name})
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

    .el-table--border::after {
        width: 0px;
    }

    .el-table__header-wrapper  {
        background: none;
    }

    .mt-4.el-button {
        width: 700px;
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
</style>