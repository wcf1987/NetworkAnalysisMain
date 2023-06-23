// stores/counter.js
import { defineStore } from 'pinia'
   import {  ref } from 'vue'
export const useNetworkStore = defineStore('network', () => {

    const interfaceList = ref([
    {
    id: '1',
    name: '接口A',
    type:'网口',
        children:[
            {
        id: '1',
        name: '类型',
        ename:'type',
        length: '',
        valuestr: '网口',

    },
    {
        id: '2',
        name: 'IP地址',
        ename:'IPAddress',
        length: '32',
        valuestr: '',

    },
    {   id: '3',
        name: '端口地址',
        ename:'port',
        length: '8',
        valuestr: '',
},
  {   id: '4',
        name: '协议',
        ename:'protocol',
        length: '4',
        valuestr: '',
},
        ]
  },
  {
    id: '2',
    name: '接口B',
    type:'串口',
      children:[  {
        id: '1',
        name: '类型',
       ename:'type',
        length: '',
        valuestr: '串口',

    },
    {
        id: '2',
        name: '出口',
        ename: 'outside',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '比特率',
        ename:'bitrate',
        length: '8',
        valuestr: '',
   },
  {   id: '4',
        name: '流控',
        ename:'flowControl',
        length: '4',
        valuestr: '',
},
      ]
  },
])
    const packageList=ref([
            {
    id: '1',
    name: '封装头A',
    type:'自定义',
                children:[
                    {
        id: '1',
        name: '报文标识',
        ename:'MessId',
        length: '2',
        valuestr: '0xabab',

    },
    {
        id: '2',
        name: '消息标识',
        ename:'kownID',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '消息类型',
        ename:'type',
        length: '1',
        valuestr: '',

    },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        length: '2',
        valuestr: '',
    },
    {   id: '4',
        name: '消息编号',
        ename:'number',
        length: '1',
        valuestr: '',

  },
                ]
  },
  {
    id: '2',
    name: '封装头B',
    type:'预定义',
      children:[
          {
        id: '1',
        name: '报文标识',
        ename:'MessId',
        length: '2',
        valuestr: '0xbbcc',

    },
    {
        id: '2',
        name: '消息标识',
        ename:'kownID',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '消息类型',
        ename:'type',
        length: '1',
        valuestr: '',

    },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        length: '2',
        valuestr: '',
    },
    {   id: '4',
        name: '消息编号',
        ename:'number',
        length: '1',
        valuestr: '',

  },
      ]
  },
   ] )
    const messageList=ref([
          {
    id: '1',
    name: '消息体A',
    type:'自定义',
              children:[
                  {
        id: '1',
        name: '类型标记',
        ename:'typeMark',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '0xabab',
        type:'基础属性',

    },
    {
        id: '2',
        name: '消息标识',
        optional:'可选项（无该项内容）',
        ename:'messID',
        length: '1',
        valuestr: '',
        type:'基础属性',

    },
    {   id: '3',
        name: '消息类型',
        optional:'可选项（无该项内容）',
        ename:'type',
        length: '1',
        valuestr: '',
        type:'基础属性',
 },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
      type:'基础属性',
   },
    {   id: '5',
        name: '消息编号',
        ename:'number',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

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

    },
    {
        id: '2',
        name: '消息标识',
        ename:'messID',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

    },
    {   id: '3',
        name: '消息类型',
        ename:'type',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',
    },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
      type:'基础属性',
   },
    {   id: '5',
        name: '消息编号',
        ename:'number',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

  },],
  },
              ]
  },
  {
    id: '2',
    name: '消息体B',
    type:'预定义',
      children: [
          {
        id: '1',
        name: '类型标记',
        ename:'typeMark',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '0xabab',
        type:'基础属性',

    },
    {
        id: '2',
        name: '消息标识',
        optional:'可选项（无该项内容）',
        ename:'messID',
        length: '1',
        valuestr: '',
        type:'基础属性',

    },
    {   id: '3',
        name: '消息类型',
        optional:'可选项（无该项内容）',
        ename:'type',
        length: '1',
        valuestr: '',
        type:'基础属性',
    },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
      type:'基础属性',
   },
    {   id: '5',
        name: '消息编号',
        ename:'number',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

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

    },
    {
        id: '2',
        name: '消息标识',
        ename:'messID',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

    },
    {   id: '3',
        name: '消息类型',
        ename:'type',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',
  },
  {   id: '4',
        name: '消息长度',
        ename:'length',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
      type:'基础属性',
   },
    {   id: '5',
        name: '消息编号',
        ename:'number',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
        type:'基础属性',

  },],
  },
      ]
  },

    ])
    const appList=ref(        [
                {
    id: '1',
    name: '应用头A',
    type:'自定义',
                    children:[
                          {
        id: '1',
        name: '应用标记',
        ename:'appID',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '0xabab',

    },
    {
        id: '2',
        name: '应用标识',
        ename:'appMess',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '应用类型',
        ename:'type',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
},
  {   id: '4',
        name: '应用长度',
        ename:'length',
      optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
},
    {   id: '5',
        name: '应用编号',
        ename:'appNum',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',

  },
                    ],
  },
  {
    id: '2',
    name: '应用头B',
    type:'预定义',
                    children:[
                         {
        id: '1',
        name: '应用标记',
        ename:'appID',
        optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '0xabab',

    },
    {
        id: '2',
        name: '应用标识',
        ename:'appMess',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '应用类型',
        ename:'type',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',
},
  {   id: '4',
        name: '应用长度',
        ename:'length',
      optional:'可选项（无该项内容）',
        length: '2',
        valuestr: '',
},
    {   id: '5',
        name: '应用编号',
        ename:'appNum',
        optional:'可选项（无该项内容）',
        length: '1',
        valuestr: '',

  },
                    ],
  },
        ]    )
    const ruleList=ref(
        [
    {
    id: '1',
    name: '消息体转化流程1',
    type:'自定义',
        sourceData:'消息体A',
        targetData:'消息体B',
    children:[
    {
        id: '1',
        name: '条件1',
        source: '',
        target: '',
        sourceData:'消息体A',
        targetData:'消息体B',
        rulestr:'',
        type:''
    },
    {
        id: '2',
        name: '条件2',
        source: '',
        target: '',
        sourceData:'消息体A',
        targetData:'消息体B',
        rulestr:'',
    },
    {   id: '3',
        name: '条件3',
          source: '',
        target: '',
        sourceData:'消息体A',
        targetData:'消息体B',
        rulestr:'',
    }

]
    },
  {
    id: '2',
    name: '消息体转化流程2',
        sourceData:'消息体B',
        targetData:'消息体A',
      children:[
    {
        id: '1',
        name: '条件1',
        source: '',
        target: '',
        sourceData:'消息体B',
        targetData:'消息体A',
        rulestr:'',
        type:''
    },
    {
        id: '2',
        name: '条件2',
        source: '',
        target: '',
        sourceData:'消息体B',
        targetData:'消息体A',
        rulestr:'',
    },
    {   id: '3',
        name: '条件3',
          source: '',
        target: '',
        sourceData:'消息体B',
        targetData:'消息体A',
        rulestr:'',
    }

]
  },
]
    )
    const processList=ref(
        [
    {
    id: '1',
    name: '规则1',

  },
  {
    id: '2',
    name: '规则2',

  },
]
    )
    const interfaceSerial=[{
        id: '1',
        name: '类型',
       ename:'type',
        length: '',
        valuestr: '串口',

    },
    {
        id: '2',
        name: '出口',
        ename: 'outside',
        length: '1',
        valuestr: '',

    },
    {   id: '3',
        name: '比特率',
        ename:'bitrate',
        length: '8',
        valuestr: '',
   },
  {   id: '4',
        name: '流控',
        ename:'flowControl',
        length: '4',
        valuestr: '',
}]
    const interfaceParallel=[
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
function getInterfaceSerial() {
        return interfaceSerial;
    }
function getInterfaceParallel() {
        return interfaceParallel;
    }
  return { interfaceList ,packageList,messageList,appList,ruleList,processList,getInterfaceParallel,getInterfaceSerial}
})