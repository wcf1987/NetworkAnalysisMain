<template>
    <div class="tab">
        <div class="crumbdiv">
            <el-icon color=white :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">
                <el-breadcrumb-item class="breadColor"  :to="{ path: '/RulesTable' }">流程设计列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"  v-if="false" />
        <div class="tablemain" style="width:860px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>
            <el-table :data="tableData" border="true" style=border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
                <el-table-column prop="id" label="序号" width="150"/>
                <el-table-column prop="name" label="规则列表" width="220"/>
                <el-table-column label="操作" width="490">
                    <template #default="scope">
                        <el-button type="primary" size="small" v-if="false" @click="handleClickEdit(scope.$index, scope.row)"
                                   :icon="Edit">编辑
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickEditLogicFlow(scope.$index, scope.row)"
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
                        <el-button type="primary" size="small" @click="handleClickExport(scope.$index, scope.row,1)"
                                   :icon="Share" >
                            导出脚本
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
            <FlowDialogForm ref="testDialog" @addValue='addData' @changeValue="editData"></FlowDialogForm>
        </div>
    </div>
</template>

<script setup>
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import HTTPRequest from "@/plugins/axiosInstance";
    import FlowDialogForm from '@/components/customModeler/FlowDialogForm'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Share, Message, Fold} from '@element-plus/icons-vue'
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

    const handleClickEdit = (index, row, flag) => {
        console.log(index, row)
        if (flag == 1) {
            testDialog.value.showD(1, row)
        } else {

            router.push('/customBpmn?id=' + row.id + '&flowid=' + row.id)
        }
    }
    const handleClickEditLogicFlow = (index, row, flag) => {
        console.log(index, row)


            router.push('/logicFlow?id=' + row.id + '&flowid=' + row.id)

    }
    /*
    const tableData=ref([
        {
        id: '1',
        name: '规则1',

      },
      {
        id: '2',
        name: '规则2',

      },
    ])
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
    const getList = () => {
        HTTPRequest.post('/flow/list',
            {
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            }
        ).then(res => {
            tableData.value = res.data;

        })
        HTTPRequest.post('/flow/alllistnum',
            {
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            }).then(res => {

            totalSize.value = res.data
        })
    }
    getList()
    const addData = (fo) => {
        HTTPRequest.post('/flow/add',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type
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
        HTTPRequest.post('/flow/update',
            {
                'id': fo.id,
                'name': fo.name,
                'type': fo.type
            }).then(res => {
            //tableData.value.splice(index, 1);
            getList()
        })

    }
    const handleClickDelete = (i, row) => {
        console.log('deldata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/flow/delete',
            {
                id: row.id
            }).then(res => {
            getList()
        })

    }
    const handleClickCopy = (i, row) => {
        console.log('copydata:' + row)
        let index = tableData.value.findIndex(
            (item, index) => item.id === row.id
        );
        HTTPRequest.post('/flow/copy',
            {
                id: row.id
            }).then(res => {
            //tableData.value.splice(index, 1);
            getList()
        })
    }
    import {ElMessage} from 'element-plus'

    const handleClickExport = (i, row) => {
        downloadProcess(row.id,'txt','流程执行脚本');
    }

    async function downloadProcess(rid,type, name = '流程执行脚本') {
        try {
            let data;
            await HTTPRequest.post('/flow/createScript',
            {
                id: rid
            }).then(res => {
            //tableData.value.splice(index, 1);
            data=res.data
        })
            const {href, filename} = setEncoded('txt', name, data)
            console.log(data)
            downloadFile(href, filename)

        } catch (e) {
            console.error(`[Process Designer Warn ]: ${e.message || e}`)
        }
    }

    function downloadFile(href, filename) {
        if (href && filename) {
            const a = document.createElement('a')
            a.download = filename //指定下载的文件名
            a.href = href //  URL对象
            a.click() // 模拟点击
            URL.revokeObjectURL(a.href) // 释放URL 对象
        }
    }

    function setEncoded(type, filename, data) {
        const encodedData = JSON.stringify(data)
        return {
            filename: `${filename}.${type.toLowerCase()}`,
            href: `data:application/${
                type === 'txt' ? 'text/xml' : 'bpmn20-xml'
            };charset=UTF-8,${encodedData}`,
            data: data
        }
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

    width: 700px;
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