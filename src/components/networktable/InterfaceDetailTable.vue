<template>
    <div class="tab">


        <div class="crumbdiv">
            <el-icon color=white :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRightBold" style="color:red;">
                <el-breadcrumb-item class="breadColor"   :to="{ path: '/interfaceTable' }">网络接口列表</el-breadcrumb-item>
                <!--  循环遍历面包屑列表 -->
                <el-breadcrumb-item class="breadColor"  :to="{path: '/interfaceDetailTable'}" v-for="item in breadList"
                                    @click.native="handleClcik(item)"
                >
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:940px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>

            <el-table :data="tableData" border="true" style=border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="名称" width="150"/>
                <el-table-column prop="ename" label="英文名称" width="150"/>
                <el-table-column prop="length" label="长度" width="120" v-if="false"/>
                <el-table-column prop="valuestr" label="数值" width="240"/>
                <el-table-column label="操作" width="240">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)"
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
            <InterfaceDetailAddDialogForm ref="testDialog" @addValue='addData'
                                          @changeValue="editData"></InterfaceDetailAddDialogForm>
        </div>
    </div>
</template>

<script setup>
    import {ArrowRightBold} from '@element-plus/icons-vue'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, ArrowRight, Fold} from '@element-plus/icons-vue'
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import HTTPRequest from "@/plugins/axiosInstance";
    import InterfaceDetailAddDialogForm from "@/components/networktable/InterfaceDetailAddDialogForm";
    import {ElMessage} from 'element-plus'
    import '@/css/maincontainer.scss'

    const router = useRouter()
    const testDialog = ref()
    const route = useRoute()
    const querys = route.query
    const routs = "?id=" + querys.id + "&name=" + querys.name
    console.log(querys)


    let AllData = []
    /*
    const parallelData=[
        {
            id: '1',
            name: '类型',
            ename:'type',
            length: '',
            valuestr: '网口',
            children:[],
        },
        {
            id: '2',
            name: 'IP地址',
            ename:'IPAddress',
            length: '32',
            valuestr: '',
            children:[],
        },
        {   id: '3',
            name: '端口地址',
            ename:'port',
            length: '8',
            valuestr: '',
        children:[],},
      {   id: '4',
            name: '协议',
            ename:'protocol',
            length: '4',
            valuestr: '',
        children:[],},
    ]
    const serialData=[
       {
            id: '1',
            name: '类型',
           ename:'type',
            length: '',
            valuestr: '串口',
            children:[],
        },
        {
            id: '2',
            name: '出口',
            ename: 'outside',
            length: '1',
            valuestr: '',
            children:[],
        },
        {   id: '3',
            name: '比特率',
            ename:'bitrate',
            length: '8',
            valuestr: '',
        children:[],},
      {   id: '4',
            name: '流控',
            ename:'flowControl',
            length: '4',
            valuestr: '',
        children:[],},

    ]
    */


    import {useNetworkStore} from '@/store/netstore'

    const netstore = useNetworkStore();
    const tableData = ref([])

    const currentPage = ref(1)
    const pageSize = ref(10)
    const small = ref(false)
    const background = ref(true)
    const disabled = ref(false)
    const totalSize = ref(1)
    const handleSizeChange = (val) => {
              console.log(val)
            pageSize.value = val
            getList()
    }
    const handleCurrentChange = (val) => {
        console.log(val)
        currentPage.value = val
        getList()
    }
    const breadList = ref([])
    breadList.value.push({name: querys.name, id: querys.id})
    const saveid = querys.id

    function showDialog() {
        let len = 0
        let newid
        if (tableData.value.length == 0) {
            newid = 1
        } else {
            len = tableData.value.length
            newid = parseInt(tableData.value[len - 1].id) + 1
        }

        testDialog.value.showD(0, newid)
    }

    const handleClcik = (itemt) => {
        HTTPRequest.post('/interfaceDetail/list', {
            pid: itemt.id,
            pageNum: currentPage.value,
                pageSize: pageSize.value,
        }).then(res => {
            tableData.value = res.data;
        })


        return
    }

    const handleClickEdit = (index, row) => {
        console.log(index, row)
        if (row.name == '类型') {
            ElMessage({
                showClose: true,
                message: '类型无法修改',
                type: 'warning',
            })

        } else {
            testDialog.value.showD(1, row)

            console.log(breadList)
        }

    }

    const handleClickDelete = (index, row) => {
        console.log('deldata:' + row)
        let indext = tableData.value.findIndex(
            (item, indext) => item.id === row.id
        );
        HTTPRequest.post('/interfaceDetail/delete',
            {
                id: row.id
            }).then(res => {
           getList()
        })


    }
    const getList = () => {
                HTTPRequest.post('/interfaceDetail/list',
            {
                pid:saveid,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            }).then(res => {
            tableData.value = res.data;
            //totalSize.value = tableData.value.length
        })
                HTTPRequest.post('/interfaceDetail/alllistnum',
            {
                pid:saveid,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            }).then(res => {

            totalSize.value = res.data
        })
    }
    getList()
    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log('adddata:' + fo)
        HTTPRequest.post('/interfaceDetail/add',
            {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr,
                'interfaceID': querys.id,
            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList()
        })

        //tableData.value.push({'id':fo.id,'name':fo.name,'ename':fo.ename,'length':fo.length,'valuestr':fo.valuestr})
    }
    const editData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log('editdata:' + fo)
        let index = tableData.value.findIndex(
            (item, index) => item.id === fo.id
        );
        HTTPRequest.post('/interfaceDetail/update',
            {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr

            }).then(res => {
            //tableData.value.splice(index, 1);
           getList()

        })


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
        width: 930px;
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
    }

    */

</style>