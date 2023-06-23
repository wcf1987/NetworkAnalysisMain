<template>
    <div class="tab">


         <div class="crumbdiv">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="color:red;">
            <el-breadcrumb-item :to="{ path: '/TransRulesTable' }">转换规则列表</el-breadcrumb-item>
            <!--  循环遍历面包屑列表 -->
            <el-breadcrumb-item :to="{path: '/TransRulesDetailTable'}"
                   v-for="item in breadList"
                  @click.native="handleClcik(item)"
              >
                {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>

        </div>
 <el-divider class="boderline"/>
    <div class="tablemain" style="width:960px">
        <el-button class="mt-4"  type="primary" size="small" @click="showDialog" :icon="DocumentAdd">新增</el-button>

        <el-table :data="tableData" border="true"  style= border :header-cell-style="{'text-align':'center'}"  :cell-style="{'text-align':'center'}">
                <el-table-column prop="id" label="序号" width="150" />
                <el-table-column prop="name" label="名称" width="120" />
            <el-table-column prop="sourcedata" label="源字段" width="120" show-overflow-tooltip>



            </el-table-column>
                <el-table-column prop="targetdata" label="目的字段" width="120" show-overflow-tooltip/>
            <el-table-column prop="sourceid" label="源数据" width="120" v-if="false"> </el-table-column>
                <el-table-column prop="targetid" label="目的数据" width="120" v-if="false"/>
               <el-table-column prop="funcrule" label="内置公式" width="120" v-if="false"/>
                <el-table-column prop="rulestr" label="转换公式" width="200" v-if="false"/>
               <el-table-column prop="type" label="转换规则" width="200" show-overflow-tooltip/>
                <el-table-column  label="操作" width="240">
                  <template #default="scope">
                    <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)" :icon="Edit">编辑</el-button>
                    <el-button type="primary" size="small" @click="handleClickDelete(scope.$index, scope.row)" :icon="Delete">删除</el-button>
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
        <TransRulesDetailAddDialogForm ref="testDialog" @addValue='addData'  @changeValue="editData"></TransRulesDetailAddDialogForm>
    </div>
    </div>
</template>

<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
import {DocumentAdd,Edit,Delete,Memo, DocumentCopy,EditPen}from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import HTTPRequest from "@/plugins/axiosInstance";
import TransRulesDetailAddDialogForm from "@/components/ruletable/TransRulesDetailAddDialogForm";
import { ElMessage } from 'element-plus'
import '@/css/maincontainer.scss'
const router = useRouter()
const testDialog=ref()
const route = useRoute()
const querys=route.query
const routs="?id="+querys.id+"&name="+querys.name
console.log(querys)


let AllData=[



]
/*
const rulesData=[
    {
        id: '1',
        name: '条件1',
        source: '',
        target: '',
        sourceData:querys.sourceData,
        targetData:querys.targetData,
        rulestr:'',
        type:''
    },
    {
        id: '2',
        name: '条件2',
        source: '',
        target: '',
        sourceData:querys.sourceData,
        targetData:querys.targetData,
        rulestr:'',
    },
    {   id: '3',
        name: '条件3',
          source: '',
        target: '',
        sourceData:querys.sourceData,
        targetData:querys.targetData,
        rulestr:'',
    }

]
*/
import {useNetworkStore} from '@/store/netstore'
const netstore = useNetworkStore();
const tableData=ref([])
const inita= HTTPRequest.post('/ruleDetail/list',
{
           'ruleID':querys.id,

        }).then(res=>{
                      for(let i=0;i<res.data.length;i++){
              res.data[i].sourcedata=JSON.parse(res.data[i].sourcedata)
              res.data[i].targetdata=JSON.parse(res.data[i].targetdata)
          }
    tableData.value=res.data;
               })
const currentPage = ref(7)
const pageSize = ref(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const totalSize=ref(tableData.value.length)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

const breadList=ref([])
breadList.value.push({name:querys.name,id:querys.id})
const sourceid=querys.sourceid
const targetid=querys.targetid
const sourcename=querys.sourcedata
const targetname=querys.targetdata
const saveid=querys.id

function showDialog(){
    let len=0
    let newid
    if(tableData.value.length==0){
        newid=1
    }else{
     len=tableData.value.length
        newid=parseInt(tableData.value[len-1].id)+1
    }



    testDialog.value.showD(0,[sourceid,targetid,sourcename,targetname,newid])
}
const  handleClcik=(itemt)=>{

       HTTPRequest.post('/ruleDetail/list',{
        'ruleID':itemt.id,

        }).then(res=>{
        tableData.value=res.data;
            })
}

const  handleClickEdit=(index, row)=>{
 console.log(index,row)
    if(row.name=='类型'){
        ElMessage({
            showClose: true,
            message: '类型无法修改',
            type: 'warning',
  })

    }
    else{

        testDialog.value.showD(1,[sourceid,targetid,sourcename,targetname],row)
        console.log(breadList)

    }

}
const getList=()=>{
    HTTPRequest.post('/ruleDetail/list',{
           'ruleID':saveid,

        }).then(res=>{
          for(let i=0;i<res.data.length;i++){
              res.data[i].sourcedata=JSON.parse(res.data[i].sourcedata)
              res.data[i].targetdata=JSON.parse(res.data[i].targetdata)
          }
          tableData.value=res.data;
            })
}
const  handleClickDelete=(index, row)=>{
     console.log('deldata:'+row)
      HTTPRequest.post('/ruleDetail/delete',
        {
            id:row.id
        }).then(res=>{
            getList()
            })

}

const addData = (fos) => {

    let fo=fos[0]

        HTTPRequest.post('/ruleDetail/add',
        {
          'id':fo.id,
            'name':fo.name,
            'ename':fo.ename,
            'length':fo.length,
            'rulestr':fo.rulestr,
            'optional':fo.optional,
             'ruleID':saveid,
            'sourceid':fo.sourceid,
            'targetid':fo.targetid,
            'sourcedata':JSON.stringify(fo.sourceData),
            'targetdata':JSON.stringify(fo.targetData),
            'type':fo.type,
            'funcrule':fo.funcrule[1]
        }).then(res=>{
            //tableData.value.splice(index, 1);
               // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            getList()
            })
        console.log('adddata:'+fo)
        //tableData.value.push({'id':fo.id,'name':fo.name,'source':fo.source,'target':fo.target,'rulestr':fo.rulestr,'type':fo.type,'funcrule':fo.funcrule})
}
const editData = (fos) => {
    //alert(fo.id)
      //dialogFormVisible.value=false
    //handleCancle()
    let fo=fos[0]
    console.log('editdata:'+fo)
     HTTPRequest.post('/ruleDetail/update',
        {
         'id':fo.id,
            'name':fo.name,
            'ename':fo.ename,
            'length':fo.length,
            'rulestr':fo.rulestr,
            'optional':fo.optional,
             'ruleID':saveid,
            'sourceid':fo.sourceid,
            'targetid':fo.targetid,
            'sourcedata':JSON.stringify(fo.sourceData),
            'targetdata':JSON.stringify(fo.targetData),
            'type':fo.type,
            'funcrule':fo.funcrule[1]
        }).then(res=>{
            //tableData.value.splice(index, 1);
            getList()
            })

}
const theme = {
  width: '950px'
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
    width: v-bind('theme.width');
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

.el-tooltip__popper{
    max-width: 300px;
}*/
</style>