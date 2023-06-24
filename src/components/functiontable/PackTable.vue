<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=var(--el-text-color-regular) :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">
                <el-breadcrumb-item :to="{ path: '/PackTable' }">封装转换函数列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:980px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>
            <el-table :data="tableData" border="true" :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}" ref="tableN">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="函数名称" width="200"/>
                <el-table-column prop="calladdr" label="函数调用接口" width="150"/>
                <el-table-column prop="type" label="函数类型" width="150"/>
                <el-table-column label="操作" width="320">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row,1)"
                                   :icon="Edit">编辑
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickDelete(scope.$index, scope.row)"
                                   :icon="Delete">删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-block">
                <el-pagination
                        v-model:current-page="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"

                        :disabled="disabled"
                        :background="background"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </div>
            <PackAdd ref="testDialog" @addValue='addData' @changeValue="editData"></PackAdd>
        </div>
    </div>
</template>

<script setup>
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import PackAdd from "@/components/functiontable/PackAddDialogForm";
    import HTTPRequest from "@/plugins/axiosInstance";
    import '@/css/maincontainer.scss'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Fold} from '@element-plus/icons-vue'

    const router = useRouter()
    const testDialog = ref()

    function showDialog() {
        let len = tableData.value.length
        let newid = 1
        if (len == 0) {
            newid = 1
        } else {
            newid = parseInt(tableData.value[len - 1].id) + 1
        }
        testDialog.value.showD(0, newid)

    }

    const handleClickEdit = (index, row, flag) => {
        console.log(index, row)
        if (flag == 1) {
            testDialog.value.showD(1, row)
        } else {
            //router.push('/AppDetailTable?id='+row.id+'&name='+row.name+'&type='+row.type)
        }
    }
    import {useNetworkStore} from '@/store/netstore'

    const netstore = useNetworkStore();
    const tableData = ref([])
    const inita = HTTPRequest.post('/pack/list').then(res => {
        tableData.value = res.data;
    })
    const currentPage = ref(7)
    const pageSize = ref(10)
    const small = ref(false)
    const background = ref(true)
    const disabled = ref(false)
    const totalSize = ref(tableData.value.length)
    const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
    }
    /*
    const tableData=ref([
        {
        id: '1',
        name: '应用头A',
        type:'自定义'
      },
      {
        id: '2',
        name: '应用头B',
        type:'预定义'
      },
    ])
    */
    const getList = () => {
        HTTPRequest.post('/pack/list').then(res => {
            tableData.value = res.data;
            totalSize.value = tableData.value.length
        })
    }
    const addData = (fo) => {
        HTTPRequest.post('/pack/add',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'calladdr': fo.calladdr,
            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList()
        })

    }
    const editData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log('editdata:' + fo)
        let index = tableData.value.findIndex(
            (item, index) => item.id === fo.id
        );
        let item = tableData.value[index]
        HTTPRequest.post('/pack/update',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'calladdr': fo.calladdr
            }).then(res => {
            //tableData.value.splice(index, 1);
            tableData.value.splice(index, 1, {'id': fo.id, 'name': fo.name, 'type': fo.type, 'calladdr': fo.calladdr});

        })

    }
    const handleClickDelete = (i, row) => {
        console.log('deldata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/pack/delete',
            {
                id: row.id
            }).then(res => {
            tableData.value.splice(index, 1);
        })

    }
    const handleClickCopy = (i, row) => {
        console.log('copydata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/pack/copy',
            {
                id: row.id
            }).then(res => {
            //tableData.value.splice(index, 1);
            getList()
        })
    }
    const theme = {
        width: '850px'
    }
</script>

<style scoped>
    /*
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
    .mt-4.el-button{

    width:v-bind('theme.width');
        position: relative;
          left: 0px;
          top: 10px;
          right: 0;
          bottom: 0;
      padding: 0;
    }
    .el-breadcrumb{
    font-family: MicrosoftYaHeiLight;
        font-size: 18px;
        font-weight: bold;
    }*/
</style>