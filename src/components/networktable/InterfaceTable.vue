<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=var(--el-text-color-regular) :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRight" style="color:#1d0b06;">

                <el-breadcrumb-item :to="{ path: '/interfaceTable' }" :icon="DocumentAdd">网络接口列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:900px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>
            <el-table :data="tableData" style=border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}" border="true" ref="tableN">
                <el-table-column prop="id" label="序号" width="200"/>
                <el-table-column prop="name" label="接口列表" width="150"/>
                <el-table-column prop="type" label="接口类型" width="150"/>
                <el-table-column label="操作" width="400">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)"
                                   :icon="Edit">编辑
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickDelete(scope.$index, scope.row)"
                                   :icon="Delete">删除
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row,1)"
                                   :icon="Memo">重命名
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickCopy(scope.$index, scope.row,1)"
                                   :icon="DocumentCopy">复制
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
            <InterfaceAdd ref="testDialog" @addValue='addData' @changeValue="editData"></InterfaceAdd>
        </div>

    </div>
</template>

<script setup>
    import {reactive, ref, getCurrentInstance} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import InterfaceAdd from "@/components/networktable/InterfaceAddDialogForm";
    import HTTPRequest from "@/plugins/axiosInstance";
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Fold} from '@element-plus/icons-vue'
    import '@/css/maincontainer.scss'

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

    function indexFn(index) {

        return index
    }

    import {useNetworkStore} from '@/store/netstore'

    const netstore = useNetworkStore();
    //const tableData=ref(netstore.interfaceList)
    const tableData = ref([])
    const inita = HTTPRequest.post('/interface/list').then(res => {
        tableData.value = res.data;
    })
    const {getInterfaceSerial, getInterfaceParallel} = netstore;

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
    const getList = () => {
        HTTPRequest.post('/interface/list').then(res => {
            tableData.value = res.data;
            totalSize.value = tableData.value.length
        })
    }
    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        if (fo.type == '网口') {
            console.log(getInterfaceParallel())
            HTTPRequest.post('/interface/add',
                {
                    'id': fo.id,
                    'name': fo.name,
                    'type': fo.type
                }).then(res => {
                //tableData.value.splice(index, 1);
                // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
                getList()
            })
        } else {
            HTTPRequest.post('/interface/add',
                {
                    'id': fo.id,
                    'name': fo.name,
                    'type': fo.type
                }).then(res => {
                //tableData.value.splice(index, 1);
                tableData.value.push({
                    'id': fo.id,
                    'name': fo.name,
                    'type': fo.type,
                    'children': JSON.parse(JSON.stringify(getInterfaceSerial()))
                })

            })
        }
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
        HTTPRequest.post('/interface/update',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type
            }).then(res => {
            //tableData.value.splice(index, 1);
            tableData.value.splice(index, 1, {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'children': item.children
            });

        })
    }
    const handleClickEdit = (index, row, flag) => {
        console.log(index, row)
        if (flag == 1) {
            testDialog.value.showD(1, row)
        } else {
            router.push('/interfaceDetailTable?id=' + row.id + '&name=' + row.name + '&type=' + row.type)
        }
    }
    const handleClickDelete = (i, row) => {
        console.log('deldata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/interface/delete',
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
        HTTPRequest.post('/interface/copy',
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
    .crumbdiv{
        position: relative;
             left: 20px;
            height: 50px;
        display: flex;
        align-items: center;
        background: #ffffff;
        border-bottom: 1px solid #f1f2f3;
    }
    .boderline{
        border-style: solid;
        border-width:1px;
        margin-top: 0px;
        margin-bottom: 0px;
         left: 0px;
    }
    .tablemain{
        padding: 0px 0px 0px 0px;
        position: relative;
          left: 20px;
          top: 20px;
          right: 0;
          bottom: 0;

    }
    .tab {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0px 0px 0px 0px;
      overflow: hidden;

        margin: auto;
      position: relative;
          left: 00px;
          top: 0px;
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

    width:100px;
        position: relative;
          left: 20px;
          top: 10px;
          right: 0;
          bottom: 10px;
      padding: 0;
        margin-bottom: 10px;
    }
    .el-breadcrumb{
    font-family: MicrosoftYaHeiLight;
        font-size: 18px;
        font-weight: bold;
    }

     */
</style>