<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=var(--el-text-color-regular) :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRightBold" style="color:red;">
                <el-breadcrumb-item :to="{ path: '/AppTable' }">应用头列表</el-breadcrumb-item>
                <!--  循环遍历面包屑列表 -->
                <el-breadcrumb-item :to="{path: '/AppDetailTable'}"
                                    v-for="item in breadList"
                                    @click.native="handleClcik(item)"
                >
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:1040px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>


            <el-table :data="tableData" border="true" :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="名称" width="150"/>
                <el-table-column prop="ename" label="英文名称" width="150"/>
                <el-table-column prop="optional" label="可选项" width="100" show-overflow-tooltip/>
                <el-table-column prop="length" label="长度" width="120"/>
                <el-table-column prop="valuestr" label="数值" width="120"/>
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
            <AppDetailAddDialogForm ref="testDialog" @addValue='addData'
                                    @changeValue="editData"></AppDetailAddDialogForm>
        </div>

    </div>
</template>

<script setup>
    import {ArrowRightBold} from '@element-plus/icons-vue'
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import HTTPRequest from "@/plugins/axiosInstance";
    import AppDetailAddDialogForm from "@/components/networktable/AppDetailAddDialogForm";
    import '@/css/maincontainer.scss'
    import {ElMessage} from 'element-plus'

    const router = useRouter()
    const testDialog = ref()
    const route = useRoute()
    const querys = route.query
    const routs = "?id=" + querys.id + "&name=" + querys.name
    console.log(querys)


    let AllData = []
    import {useNetworkStore} from '@/store/netstore'

    const netstore = useNetworkStore();
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Fold} from '@element-plus/icons-vue'

    const tableData = ref([])
    const inita = HTTPRequest.post('/appDetail/list',
        {
            'appID': querys.id,

        }).then(res => {
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
    const parallelData=[
        {
            id: '1',
            name: '应用标记',
            ename:'appID',
            optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '0xabab',
            children:[],
        },
        {
            id: '2',
            name: '应用标识',
            ename:'appMess',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
            children:[],
        },
        {   id: '3',
            name: '应用类型',
            ename:'type',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
        children:[],},
      {   id: '4',
            name: '应用长度',
            ename:'length',
          optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '',
        children:[],},
        {   id: '5',
            name: '应用编号',
            ename:'appNum',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
        children:[],
      },
    ]
    */
    //const tableData=ref(parallelData)

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
        HTTPRequest.post('/appDetail/list', {
            'appID': itemt.id,
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
            //tableData.value=row.InerData
            //breadList.value.push({name:row.name,data:row.InerData})
            //router.push('/table2')
            console.log(breadList)
        }

    }
    const getList = () => {
        HTTPRequest.post('/appDetail/list', {
            'appID': saveid,

        }).then(res => {
            tableData.value = res.data;
            totalSize.value = tableData.value.length
        })
    }
    const handleClickDelete = (index, row) => {
        console.log('deldata:' + row)
        let indext = tableData.value.findIndex(
            (item, indext) => item.id === row.id
        );
        HTTPRequest.post('/appDetail/delete',
            {
                id: row.id
            }).then(res => {
            tableData.value.splice(indext, 1);
        })

    }

    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log('adddata:' + fo)
        HTTPRequest.post('/appDetail/add',
            {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr,
                'optional': fo.optional,
                'appID': querys.id,
            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList()
        })
        //tableData.value.push({'id':fo.id,'name':fo.name,'ename':fo.ename,'length':fo.length,'valuestr':fo.valuestr,'optional':fo.optional})
    }
    const editData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log('editdata:' + fo)
        let index = tableData.value.findIndex(
            (item, index) => item.id === fo.id
        );
        HTTPRequest.post('/appDetail/update',
            {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr,
                'optional': fo.optional,
            }).then(res => {
            //tableData.value.splice(index, 1);
            tableData.value.splice(index, 1, {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr,
                'optional': fo.optional
            });

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
        width: 1030px;
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