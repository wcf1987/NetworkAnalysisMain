<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=white :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">
                <el-breadcrumb-item class="breadColor"  :to="{ path: '/transRulesTable' }">规则列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"  v-if="false" />
        <div class="tablemain" style="width:970px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>
            <el-table :data="tableData" border="true" style=border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}" ref="tableN">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="转换规则名称" width="200"/>
                <el-table-column prop="type" label="规则类型" width="200" v-if="false"/>
                <el-table-column prop="sourcedata" label="源数据" width="120"/>
                <el-table-column prop="targetdata" label="目的数据" width="120"/>
                <el-table-column prop="sourceid" label="源数据" width="150" v-if="false"/>
                <el-table-column prop="targetid" label="目的数据" width="150" v-if="false"/>
                <el-table-column label="操作" width="380">
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
            <TransRulesAdd ref="testDialog" @addValue='addData' @changeValue="editData"></TransRulesAdd>
        </div>
    </div>
</template>

<script setup>
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import TransRulesAdd from "@/components/ruletable/TransRulesAddDialogForm";
    import '@/css/maincontainer.scss'
    import HTTPRequest from "@/plugins/axiosInstance";

    const router = useRouter()
    import {useNetworkStore} from '@/store/netstore'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Fold} from '@element-plus/icons-vue'

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
            router.push('/TransRulesDetailTable?id=' + row.id + '&name=' + row.name + '&type=' + row.type + '&sourceid=' + row.sourceid + '&targetid=' + row.targetid + '&sourcedata=' + row.sourcedata + '&targetdata=' + row.targetdata)
        }
    }
    /*
    const tableData=ref([
        {
        id: '1',
        name: '规则A',
        type:'自定义',
            sourceData:'消息体A',
            targetData:'消息体B',
      },
      {
        id: '2',
        name: '规则B',
            sourceData:'消息体B',
            targetData:'消息体A',
      },
    ])
    */

    const getList = () => {
        HTTPRequest.post('/rule/list',
            {
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            }
        ).then(res => {
            tableData.value = res.data;

        })
                HTTPRequest.post('/rule/alllistnum',
            {
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
        if (fo.sourceid == '') {
            fo.sourceid = ['']
        }
        if (fo.targetid == '') {
            fo.targetid = ['']
        }
        HTTPRequest.post('/rule/add',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'sourceid': fo.sourceid[0],
                'targetid': fo.targetid[0],
            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList()
        })
        //tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'sourceData':fo.sourceData,'targetData':fo.targetData,'children':[]})
    }
    const editData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()


        if (fo.sourceid instanceof Array) {
            fo.sourceid = fo.sourceid[0]
        }

        if (fo.targetid instanceof Array) {
            fo.targetid = fo.targetid[0]
        }
        HTTPRequest.post('/rule/update',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type,
                'sourceid': fo.sourceid,
                'targetid': fo.targetid,
            }).then(res => {
            //tableData.value.splice(index, 1);
            //tableData.value.splice(index, 1, {'id':fo.id,'name':fo.name,'type':fo.type,'sourceData':fo.sourceData,'targetData':fo.targetData});
            getList()
        })

    }
    const handleClickDelete = (i, row) => {

        HTTPRequest.post('/rule/delete',
            {
                id: row.id
            }).then(res => {
             getList()
        })
    }
    const handleClickCopy = (i, row) => {

        HTTPRequest.post('/rule/copy',
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