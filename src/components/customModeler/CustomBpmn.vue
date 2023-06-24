<template>
    <!--创建容器-->
    <div class="containers">
        <div class="canvas" ref="canvasRef" id="testdd1"></div>

        <div class="toolbar" ref="toolbar" v-show="true">
            <el-button-group>
                <el-button class="mt-4" type="primary" :icon="Upload" @click="uploadFile">导入</el-button>
                <el-input type="file" id="config-edit-uploadfile" @input="fileSelect()" class="uploadinput"/>
                <el-button class="mt-4" type="primary" :icon="Share" @click="exportFile">导出XML</el-button>
                <el-button class="mt-4" type="primary" :icon="Picture" @click="exportFileSVG">导出SVG</el-button>
                <el-button class="mt-4" type="primary" :icon="UploadFilled" @click="saveDatabase">保存</el-button>
            </el-button-group>

        </div>
    </div>
    <appDialogBpmn ref="appDialog" @addAppDataExp='addappData'></appDialogBpmn>
    <messageDialogBpmn ref="messageDialog" @addMessageDataExp='addmessageData'></messageDialogBpmn>
    <interfaceDialogBpmn ref="interfaceDialog" @addInterfaceDataExp='addinterfaceData'></interfaceDialogBpmn>
    <packageDialogBpmn ref="packageDialog" @addPackageDataExp='addpackageData'></packageDialogBpmn>
    <endDialogBpmn ref="endDialog" @addEndDataExp='addendData'></endDialogBpmn>
    <conditionDialogBpmn ref="conditionDialog" @addConditionDataExp='addconditionData'></conditionDialogBpmn>
    <conditionLineDialogBpmn ref="conditionLineDialog"
                             @addConditionLineDataExp='addconditionLineData'></conditionLineDialogBpmn>
</template>


<script setup>
    import {onMounted, ref, reactive} from 'vue'
    import {ElMessage} from 'element-plus'

    // 导入一下有关于bpmn-js的字体库以及样式文件
    import 'bpmn-js/dist/assets/diagram-js.css'
    import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
    import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
    import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
    // 右侧属性面包样式
    import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'
    // 汉化包 (这里注意你们项目的路径！！！！！！！)
    import customTranslate from "../../plugins/customTranslate";

    // 两个属性面板相关模块

    import BpmnModeler from 'bpmn-js/lib/Modeler';

    import {
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
    } from 'bpmn-js-properties-panel';

    // 高版本
    //import {BpmnPropertiesPanelModule,BpmnPropertiesProviderModule} from 'bpmn-js-properties-panel'//右侧工具栏
    //import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";// 一个描述的json

    //低版本
    //import propertiesPanelModule from "bpmn-js-properties-panel";
    //import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
    //import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

    import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
    // 注意这个xml文件
    //import xmlStr from '../plugins/xml' // 放在下面了
    const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_0u4gsqp" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="6.1.1">
          <bpmn:process id="Process_1d6bkiu" isExecutable="false" />
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1d6bkiu" />
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>`
    const state = ref({
        bpmnModeler: null,
        bpmnXmlStr: xmlStr// xml数据
    })
    import {useRoute, useRouter} from "vue-router"

    const route = useRoute()
    const querys = route.query
    const flowID = querys.flowid
    // 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
    const createNewDiagram = (bpmn) => {
        // 将字符串转换成图显示出来
        try {
            const result = state.bpmnModeler.importXML(bpmn);
            result = getBpmnFromDatabase()
            // state.bpmnModeler.get('canvas').zoom('fit-viewport');
            const {warnings} = result;
            console.log(warnings);
        } catch (e) {
            //ElMessage.error('打开模型出错，数据格式有误！')
            console.log('error--->', e)
        }
    };
    const canvasRef = ref(null)
    const propanel = ref(null)

    const customTranslateModule = {
        translate: ['value', customTranslate]
    }
    import CustomModeler from './index'
    // 自定义的 properties-panel内容
    import FlowablePropertiesProvider from "../PanelSimple";
    import flowModdleDescriptor from '../PanelSimple/datajson';
    import appDialogBpmn from '@/components/customModeler/attridialog/AppDialogBpmn'
    import interfaceDialogBpmn from '@/components/customModeler/attridialog/InterfaceDialogBpmn'
    import conditionLineDialogBpmn from '@/components/customModeler/attridialog/ConditionLineDialogBpmn'
    import packageDialogBpmn from '@/components/customModeler/attridialog/PackageDialogBpmn'
    import endDialogBpmn from '@/components/customModeler/attridialog/EndDialogBpmn'
    import messageDialogBpmn from '@/components/customModeler/attridialog/MessageDialogBpmn'
    import conditionDialogBpmn from '@/components/customModeler/attridialog/ConditionDialogBpmn'

    const init = () => {
        // 将汉化包装成一个模块

        // 生成实例


        //const canvasRef = this.$refs.canvasRef


        console.log(canvasRef.value)
        state.bpmnModeler = new CustomModeler({
            container: canvasRef.value,// 获取到属性ref为“canvasRef”的dom节点
            //添加控制板
            propertiesPanel: {
                parent: propanel.value
            },
            additionalModules: [
                BpmnPropertiesPanelModule,
                BpmnPropertiesProviderModule,
                //  propertiesProviderModule,
                //        Panel,
                FlowablePropertiesProvider,
                //  汉化模块
                customTranslateModule

            ],
            moddleExtensions: {
                magic: flowModdleDescriptor
            }
        })
        /*
        state.bpmnModeler = new BpmnModeler({
          container: canvasRef.value, // 获取到属性ref为“canvasRef”的dom节点
          propertiesPanel: {
            parent: propanel.value
          },
          additionalModules: [
                  CustomPalette,
            BpmnPropertiesPanelModule,
            BpmnPropertiesProviderModule,
              //
            //  汉化模块
            customTranslateModule
           ],
          moddleExtensions: {
            camunda: CamundaBpmnModdle
          }
        })

         */
        //state.bpmnXmlStr.value=xmlStr.value
        createNewDiagram(xmlStr) // 新增流程定义
    };
    onMounted(() => {
        init()
        addEvent()
    });

    function addEvent() {
        console.log('创建成功!')
        //addBpmnListener(state.bpmnModeler)
        //addModelerListener(state.bpmnModeler)
        addEventBusListener(state.bpmnModeler)
    };

    // 添加绑定事件
    function addBpmnListener(bpmn) {
        /*const that = bpmn
        // 获取a标签dom节点
        //const downloadLink = this.$refs.saveDiagram
        //const downloadSvgLink = this.$refs.saveSvg
        // 给图绑定事件，当图有发生改变就会触发这个事件
        bpmn.bpmnModeler.on('commandStack.changed', function() {
          that.saveSVG(function(err, svg) {
            //that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
          })
          that.saveDiagram(function(err, xml) {
            //that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
          })
        })*/
    };

    function addModelerListener(bpmn) {
        // 监听 modeler
        const bpmnjs = bpmn
        const that = this
        // 'shape.removed', 'connect.end', 'connect.move'
        const events = ['shape.added', 'shape.move.end', 'shape.removed']
        events.forEach(function (event) {
            bpmn.on(event, e => {
                var elementRegistry = bpmnjs.get('elementRegistry')
                var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
                // console.log(shape)
                if (event === 'shape.added') {
                    console.log('新增了shape')
                } else if (event === 'shape.move.end') {
                    console.log('移动了shape')
                } else if (event === 'shape.removed') {
                    console.log('删除了shape')
                }
            })
        })
    };
    import DialogFormBpmn from "@/components/customModeler/DialogFormBpmn";

    const appDialog = ref()
    const messageDialog = ref()
    const interfaceDialog = ref()
    const packageDialog = ref()
    const conditionDialog = ref()
    const conditionLineDialog = ref()
    const endDialog = ref()
    import {Share, Upload, Picture, UploadFilled} from '@element-plus/icons-vue'

    function addEventBusListener(bpmn) {
        // 监听 element
        let that = this
        const eventBus = bpmn.get('eventBus')
        const modeling = bpmn.get('modeling')
        const elementRegistry = bpmn.get('elementRegistry')
        const eventTypes = ['element.click', 'element.changed']
        eventTypes.forEach(function (eventType) {
            eventBus.on(eventType, function (e) {
                console.log(e)
                if (!e || e.element.type == 'bpmn:Process') return
                if (eventType === 'element.changed') {
                    //that.elementChanged(e)
                } else if (eventType === 'element.click') {
                    console.log('点击了element')
                    var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
                    if (shape.type === 'bpmn:SendTask') {
                        packageDialog.value.showD(shape.id, packageList);

                    }
                    if (shape.type === 'bpmn:ServiceTask') {
                        messageDialog.value.showD(shape.id, messageList);
                        //console.log(appList)

                    }
                    if (shape.type === 'bpmn:BusinessRuleTask') {
                        appDialog.value.showD(shape.id, appList);
                        //console.log(appList)


                    }
                    if (shape.type === 'bpmn:ScriptTask') {
                        interfaceDialog.value.showD(shape.id, interfaceList);

                    }
                    if (shape.type === 'bpmn:ExclusiveGateway') {
                        //conditionDialog.value.showD(shape.id, conditionList,state,allList);

                    }
                    if (shape.type === 'bpmn:SequenceFlow') {
                        conditionLineDialog.value.showD(shape.id, conditionList, state, allList);

                    }
                    if (shape.type === 'bpmn:EndEvent') {
                        interfaceDialog.value.showD(shape.id, interfaceList);

                    }
                    if (shape.type === 'bpmn:StartEvent') {
                        interfaceDialog.value.showD(shape.id, interfaceList);

                    }
                }
            })
        })
    };

    /*
    function   isInvalid(param) {
         // 判断是否是无效的值
         return param === null || param === undefined || param === ''
       };
    function   isSequenceFlow(type) {
         // 判断是否是线
         return type === 'bpmn:SequenceFlow'
       };
    function   elementChanged(e) {
         var shape = this.getShape(e.element.id)
         console.log(shape)
         if (!shape) {
           // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
           console.log('无效的shape')
           // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
           console.log('删除了shape和connect')
           return
         }
         if (!this.isInvalid(shape.type)) {
           if (this.isSequenceFlow(shape.type)) {
             console.log('改变了线')
           }
         }
       };
    function   getShape(id) {
         var elementRegistry = this.bpmnModeler.get('elementRegistry')
         return elementRegistry.get(id)
       };
       // 下载为SVG格式,done是个函数，调用的时候传入的
   function    saveSVG(done) {
         // 把传入的done再传给bpmn原型的saveSVG函数调用
         this.bpmnModeler.saveSVG(done)
       };
       // 下载为bpmn格式,done是个函数，调用的时候传入的
    function   saveDiagram(done) {
         // 把传入的done再传给bpmn原型的saveXML函数调用
         this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
           done(err, xml)
         })
       };
       // 当图发生改变的时候会调用这个函数，这个data就是图的xml
   function    setEncoded(link, name, data) {
         // 把xml转换为URI，下载要用到的
         const encodedData = encodeURIComponent(data)
         // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
         //   console.log(link, name, data)
         let xmlFile = new File([data], 'test.bpmn')
         //   console.log(xmlFile)
         if (data) {
           link.className = 'active'
           link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
           link.download = name
         }
       }*/
    function getShape(id) {
        var elementRegistry = state.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
    };
    const rules = ref([])
    const addData = (fo) => {
        //alert(fo.id)
        //dialogFormVisible.value=false
        //handleCancle()
        console.log(fo)
        let i
        let item
        for (i = 0; i < rules.value.length; i++) {
            item = rules.value[i]
            if (item.id == fo.id) {
                item.source = fo.source
                item.target = fo.target
                item.rule = fo.rule
                return
            }
        }
        item = {id: fo.id, source: fo.source, target: fo.target, rule: fo.rule}
        rules.value.push(item)
        //let shape
        //shape=state.bpmnModeler.get('elementRegistry').filter((item) => item.id === fo.id);
        //let modelingtemp = state.bpmnModeler.get('modeling');
        //modelingtemp.updateProperties(shape[0], {
        //source:fo.source,
        //target:fo.target,
        //rules:fo.rule,


    }
    const appList = ref([])
    const messageList = ref([])
    const interfaceList = ref([])
    const packageList = ref([])
    const endList = ref([])
    const conditionList = ref([])
    const allList = ref([messageList, interfaceList, packageList, appList])
    import HTTPRequest from "@/plugins/axiosInstance";

    const importRef = ref(null)
    const uploadFile = () => {

    }

    const fileSelect = () => {
        console.log("选择文件")
        let file = document.getElementById('config-edit-uploadfile');
        console.log("选择文件", file);

        if (!file) return;
        //console.log("file", file.files);

        file = file.files && file.files[0];

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {

            const xmlStr = analyseFile(this.result)
            state.bpmnModeler.importXML(xmlStr)
            //console.log("file2222", file);
        }
    }

    function analyseFile(strt) {
        const strArr = strt.split('|')
        appList.value = JSON.parse(strArr[1])
        messageList.value = JSON.parse(strArr[2])
        interfaceList.value = JSON.parse(strArr[3])
        packageList.value = JSON.parse(strArr[4])
        conditionList.value = JSON.parse(strArr[5])
        return strArr[0]
    }

    const exportFile = () => {
        downloadProcess('xml')
    }
    const getBpmnFromDatabase = () => {
        HTTPRequest.post('/flowDetail/getByID',
            {
                'flowID': flowID,

            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})
            if (res.data.bpmnstr == undefined) {
                return
            }
            let temps = decodeURIComponent(res.data.bpmnstr)
            const xmlStrread = analyseFile(temps)

            state.bpmnModeler.importXML(xmlStrread)
        })
    }
    const saveDatabase = () => {

        createBPMNStr()

    }

    async function createBPMNStr() {
        let modeler = state.bpmnModeler
        const {err, xml} = await modeler.saveXML({format: true})
        let data = xml + '|' + JSON.stringify(appList.value) + '|' + JSON.stringify(messageList.value) + '|' + JSON.stringify(interfaceList.value) + '|' + JSON.stringify(packageList.value) + '|' + JSON.stringify(conditionList.value)
        //const { href, filename } = setEncoded(type.toUpperCase(), name, data)
        const encodedData = encodeURIComponent(data)
        HTTPRequest.post('/flowDetail/add',
            {
                'flowID': flowID,
                'bpmnstr': encodedData,

            }).then(res => {
            //tableData.value.splice(index, 1);
            // tableData.value.push({'id':fo.id,'name':fo.name,'type':fo.type,'children':JSON.parse(JSON.stringify(getInterfaceParallel()))})

        })
    }

    const exportFileSVG = () => {
        downloadProcess('svg')
    }

    async function downloadProcess(type, name = '网络流程图') {
        try {
            let modeler = state.bpmnModeler

            // 按需要类型创建文件并下载
            //console.log(type)
            if (type == 'xml') {
                const {err, xml} = await modeler.saveXML({format: true})
                //allList
                // 读取异常时抛出异常
                let data = xml + '|' + JSON.stringify(appList.value) + '|' + JSON.stringify(messageList.value) + '|' + JSON.stringify(interfaceList.value) + '|' + JSON.stringify(packageList.value) + '|' + JSON.stringify(conditionList.value)
                const {href, filename} = setEncoded(type.toUpperCase(), name, data)
                downloadFile(href, filename)
            } else {
                const {err, svg} = await modeler.saveSVG()
                // 读取异常时抛出异常

                const {href, filename} = setEncoded('SVG', name, svg)
                downloadFile(href, filename)
            }
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
        const encodedData = encodeURIComponent(data)
        return {
            filename: `${filename}.${type.toLowerCase()}`,
            href: `data:application/${
                type === 'svg' ? 'text/xml' : 'bpmn20-xml'
            };charset=UTF-8,${encodedData}`,
            data: data
        }
    }

    const addappData = (fo) => {
        console.log(fo)
        let i = appList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = appList.value[i]
            item.appID = fo.appID
            item.appName = fo.appName
            item.rulestr = fo.rulestr
        } else {
            item = {id: fo.id, appID: fo.appID, appName: fo.appName, rulestr: fo.rulestr}
            appList.value.push(item)
        }
        let ss = fo.rulestr + fo.appName
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addmessageData = (fo) => {
        console.log(fo)
        let i = messageList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = messageList.value[i]
            item.ruleID = fo.ruleID
            item.ruleName = fo.ruleName
        } else {
            item = {id: fo.id, ruleID: fo.ruleID, ruleName: fo.ruleName}
            messageList.value.push(item)
        }
        let ss = '调用规则：' + fo.ruleName
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addpackageData = (fo) => {
        console.log(fo)
        let i = packageList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = packageList.value[i]
            item.packageID = fo.packageID
            item.packageName = fo.packageName
            item.rulestr = fo.rulestr
        } else {
            item = {id: fo.id, packageID: fo.packageID, packageName: fo.packageName, rulestr: fo.rulestr}
            packageList.value.push(item)
        }
        let ss = fo.rulestr + fo.packageName
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addinterfaceData = (fo) => {
        console.log(fo)
        let i = interfaceList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = interfaceList.value[i]
            item.interfaceID = fo.interfaceID
            item.interfaceName = fo.interfaceName
        } else {
            item = {id: fo.id, interfaceID: fo.interfaceID, interfaceName: fo.interfaceName}
            interfaceList.value.push(item)
        }
        let ss = fo.interfaceName
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addendData = (fo) => {
        console.log(fo)
        let i = endList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = endList.value[i]
            item.source = fo.source
            item.rulestr = fo.rulestr
        } else {
            item = {id: fo.id, source: fo.source, rulestr: fo.rulestr}
            endList.value.push(item)
        }
        let ss = '解析' + fo.source
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addconditionData = (fo) => {
        console.log(fo)
        let i = conditionList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = conditionList.value[i]
            item.source = fo.source
            item.rulestr = fo.rulestr

        } else {
            item = {id: fo.id, source: fo.source, rulestr: fo.rulestr}
            conditionList.value.push(item)
        }
        let ss = '条件路由：' + fo.source
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
    const addconditionLineData = (fo) => {
        console.log(fo)
        let i = conditionList.value.findIndex(item => item.id == fo.id)
        let item
        if (i != -1) {
            item = conditionList.value[i]
            item.source = fo.source
            item.rulestr = fo.rulestr

        } else {
            item = {id: fo.id, source: fo.source, rulestr: fo.rulestr}
            conditionList.value.push(item)
        }
        let ss = '选择路由：' + fo.source
        state.bpmnModeler.get('modeling').updateProperties(getShape(fo.id), {name: ss})
    }
</script>


<style scoped>
    .containers {
        background-color: #ffffff;
        width: 100%;
        height: calc(100vh - 52px);
    }

    .canvas {
        width: 100%;
        height: 100%;
    }

    .panel {
        position: absolute;
        right: 0;
        top: 0;
        width: 300px;
    }

    .modal {
        background-color: rgba(0, 0, 0, 0.6);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
    }

    .modal-content {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .toolbar {
        position: absolute;
        left: 100px;
        top: 600px;
        right: 0;
        bottom: 0;
    }

    .modal-ctx {
        position: absolute;
        width: 300px;
        height: 250px;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 5px 2px rgba(225, 225, 225, 0.8);
    }

    .modal-item {
        padding: 10px;
        width: 100%;
    }

    .mt-4.el-button {
        width: 100px;
        position: relative;
        left: 0px;
        top: 0px;
        right: 0;
        bottom: 0;
        padding: 0;
    }

    .uploadinput {
        display: inline-block;
        opacity: 0;
        width: 100px;
        height: 32px;
        cursor: pointer;
        left: -300px;
    }
</style>