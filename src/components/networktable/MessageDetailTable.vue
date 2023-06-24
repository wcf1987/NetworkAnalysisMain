<template>
    <div class="tab">


        <div class="crumbdiv">
            <el-icon color=var(--el-text-color-regular) :size="25" class="no-inherit">
                <Fold/>
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRightBold" style="color:red;">
                <el-breadcrumb-item :to="{ path: '/messageTable' }">消息体列表</el-breadcrumb-item>
                <!--  循环遍历面包屑列表 -->
                <el-breadcrumb-item :to="{path: '/messageDetailTable'}"
                                    v-for="item in breadList"
                                    @click.native="handleClcik(item)"
                >
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-divider class="boderline"/>
        <div class="tablemain" style="width:1150px">
            <el-button class="mt-4" type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>

            <el-table :data="tableData" border="true" style=border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
                <el-table-column prop="id" label="序号" width="80"/>
                <el-table-column prop="name" label="名称" width="150"/>
                <el-table-column prop="ename" label="英文名称" width="150"/>
                <el-table-column prop="optional" label="可选项" width="100" show-overflow-tooltip/>
                <el-table-column prop="length" label="长度" width="120"/>
                <el-table-column prop="valuestr" label="数值" width="120"/>
                <el-table-column prop="type" label="类型" width="120"/>
                <el-table-column prop="pid" label="pid" width="120" v-if="false"/>
                <el-table-column prop="messageID" label="messageID" width="120" v-if="false"/>
                <el-table-column label="操作" width="300">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)"
                                   :icon="Edit">编辑
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickDelete(scope.$index, scope.row)"
                                   :icon="Delete">删除
                        </el-button>
                        <el-button type="primary" size="small" @click="handleClickEditGroup(scope.$index, scope.row)"
                                   v-if="scope.row.type=='嵌套消息体'" :icon="Message">编辑子消息体
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
            <MessageDetailAddDialogForm ref="testDialog" @addValue='addData'
                                        @changeValue="editData"></MessageDetailAddDialogForm>
        </div>
    </div>
</template>

<script setup>
    import {ArrowRightBold} from '@element-plus/icons-vue'
    import {reactive, ref} from 'vue'
    import {useRoute, useRouter} from "vue-router"
    import HTTPRequest from "@/plugins/axiosInstance";
    import MessageDetailAddDialogForm from "@/components/networktable/MessageDetailAddDialogForm";
    import '@/css/maincontainer.scss'
    import {ElMessage} from 'element-plus'
    import {DocumentAdd, Edit, Delete, Memo, DocumentCopy, EditPen, Message, Fold} from '@element-plus/icons-vue'

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
            name: '类型标记',
            ename:'typeMark',
            optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '0xabab',
            type:'基础属性',
            children:[],
        },
        {
            id: '2',
            name: '消息标识',
            optional:'可选项（无该项内容）',
            ename:'messID',
            length: '1',
            valuestr: '',
            type:'基础属性',
            children:[],
        },
        {   id: '3',
            name: '消息类型',
            optional:'可选项（无该项内容）',
            ename:'type',
            length: '1',
            valuestr: '',
            type:'基础属性',
        children:[],},
      {   id: '4',
            name: '消息长度',
            ename:'length',
            optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '',
          type:'基础属性',
        children:[],},
        {   id: '5',
            name: '消息编号',
            ename:'number',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
            type:'基础属性',
        children:[],
      },
        {   id: '6',
            name: '嵌套消息体',
            ename:'messGroup',
            optional:'可选项（无该项内容）',
            length: '',
            valuestr: '',
            type:'嵌套消息体',
        children:[{
            id: '1',
            name: '类型标记',
            ename:'typeMark',
            optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '0xCCCC',
            type:'基础属性',
            children:[],
        },
        {
            id: '2',
            name: '消息标识',
            ename:'messID',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
            type:'基础属性',
            children:[],
        },
        {   id: '3',
            name: '消息类型',
            ename:'type',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
            type:'基础属性',
        children:[],},
      {   id: '4',
            name: '消息长度',
            ename:'length',
            optional:'可选项（无该项内容）',
            length: '2',
            valuestr: '',
          type:'基础属性',
        children:[],},
        {   id: '5',
            name: '消息编号',
            ename:'number',
            optional:'可选项（无该项内容）',
            length: '1',
            valuestr: '',
            type:'基础属性',
        children:[],
      },],
      },
    ]
    */


    import {useNetworkStore} from '@/store/netstore'

    const netstore = useNetworkStore();
    const tableData = ref([])
    const inita = HTTPRequest.post('/messageDetail/getpidlist',
        {
            'messageID': querys.id,
            'pid': 0
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
    const breadList = ref([])
    breadList.value.push({name: querys.name, messageID: querys.id, pid: 0})
    //const tableData=ref(parallelData)
    let pid = 0
    let messageID = querys.id

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
        HTTPRequest.post('/messageDetail/getpidlist', {
            'messageID': itemt.messageID,
            'pid': itemt.pid,
        }).then(res => {
            tableData.value = res.data;
            pid = itemt.pid;
            //totalSize.value=tableData.value.length
        })
        let index = breadList.value.findIndex(
            (item, index) => item.pid === itemt.pid
        );
        let len = breadList.value.length
        index = index + 1
        breadList.value.splice(index, len - index)


        return
    }
    const handleClickEdit = (index, row, flags) => {
        console.log(index, row)
        if (row.name == '类型') {
            ElMessage({
                showClose: true,
                message: '类型无法修改',
                type: 'warning',
            })

        } else {


            testDialog.value.showD(1, row)
            //console.log(breadList)

        }

    }
    const handleClickEditGroup = (index, row) => {
        HTTPRequest.post('/messageDetail/getpidlist', {
            'messageID': row.messageID,
            'pid': row.id,
        }).then(res => {
            tableData.value = res.data;
            pid = row.id;
        })

        //tableData.value=row.children
        breadList.value.push({name: row.name, messageID: row.messageID, pid: row.id})
        console.log(breadList)

    }


    const getList = () => {
        HTTPRequest.post('/messageDetail/getpidlist', {
            'messageID': messageID,
            'pid': pid

        }).then(res => {
            tableData.value = res.data;

        })
    }
    const handleClickDelete = (index, row) => {
        console.log('deldata:' + row)
        let indext = tableData.value.findIndex(
            item => item.id == row.id
        );
        HTTPRequest.post('/messageDetail/delete',
            {
                id: row.id
            }).then(res => {
            tableData.value.splice(indext, 1);
        })

    }

    const addData = (fos) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        let fo = fos[0]
        let flaga = fos[1]
        let flagstr = "基础属性";

        if (flaga == true) {
            flagstr = "基础属性"
        } else {
            flagstr = "嵌套消息体"
        }
        HTTPRequest.post('/messageDetail/add',
            {
                'id': fo.id,
                'name': fo.name,
                'ename': fo.ename,
                'length': fo.length,
                'valuestr': fo.valuestr,
                'optional': fo.optional,
                'messageID': messageID,
                'type': flagstr,
                'pid': pid,
            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList(messageID, pid)
        })
        //  tableData.value.push({'id':fo.id,'name':fo.name,'ename':fo.ename,'length':fo.length,'valuestr':fo.valuestr,'type':'基础属性','optional':fo.optional})


        //let copyArray=JSON.parse(JSON.stringify([]));
        //tableData.value.push({'id':fo.id,'name':fo.name,'ename':fo.ename,'length':fo.length,'valuestr':fo.valuestr,'type':'嵌套消息体','optional':fo.optional,'children':copyArray})


    }
    const editData = (fos) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()

        let fo = fos[0]
        let flaga = fos[1]
        console.log('editdata:' + fo)
        let index = tableData.value.findIndex(
            item => item.id === fo.id
        );
        HTTPRequest.post('/messageDetail/update',
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
                'optional': fo.optional,
                'length': fo.length,
                'type': fo.type,
                'valuestr': fo.valuestr
            });

        })


    }
    const theme = {
        width: '1140px'
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
        width: 1140px;
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

    .el-breadcrumb /deep/.el-icon-arrow-right {
                color:red;
            }
    */

</style>