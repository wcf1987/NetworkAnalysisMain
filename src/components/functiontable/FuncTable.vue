<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=white :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">
                <el-breadcrumb-item class="breadColor"  :to="{ path: '/appTable' }">常用计算函数列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:950px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>
            <el-table
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                    :data="tableData"
                    row-key="id"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    ref="tableN">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="函数名称" width="150"/>
                <el-table-column prop="type" label="函数类型" width="200"/>
                <el-table-column prop="descri" label="函数描述" width="250"/>
                <el-table-column label="操作" width="190">
                    <template v-slot="scope">
                        <el-button type="primary" size="small" v-if="scope.row.type!='基础函数'"
                                   @click="handleClickEdit(scope.$index, scope.row,1)" :icon="Edit">编辑
                        </el-button>
                        <el-button type="primary" size="small" v-if="scope.row.type!='基础函数'"
                                   @click="handleClickDelete(scope.$index, scope.row)" :icon="Delete">删除
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
            <FuncAdd ref="testDialog" @addValue='addData' @changeValue="editData"></FuncAdd>
        </div>
    </div>
</template>

<script setup>
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import FuncAdd from "@/components/functiontable/FuncAddDialogForm";
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
    const inita = HTTPRequest.post('/func/list').then(res => {
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
        HTTPRequest.post('/func/list').then(res => {
            tableData.value = res.data;

        })
    }
    const addData = (fo) => {
        HTTPRequest.post('/func/add',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'descri': fo.descri
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

        HTTPRequest.post('/func/update',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'descri': fo.descri
            }).then(res => {
            //tableData.value.splice(index, 1);
            //tableData.value.splice(index, 1, {'id':fo.id,'name':fo.name,'type':fo.type,'children':item.children});
            getList()
        })

    }
    const handleClickDelete = (i, row) => {
        console.log('deldata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/func/delete',
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
        HTTPRequest.post('/func/copy',
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