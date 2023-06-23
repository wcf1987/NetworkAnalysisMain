import store from '../../../store'
export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.bpmnFactory = bpmnFactory
    this.modeling = modeling
    this.connect = connect
    config = config || {}
    if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
    }
    contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
    'contextPad',
    'config',
    'injector',
    'translate',
    'bpmnFactory',
    'elementFactory',
    'create',
    'modeling',
    'connect'
]

ContextPadProvider.prototype.getContextPadEntries = function(element) {
    const {
        autoPlace,
        create,
        elementFactory,
        translate,
        modeling,
        connect
    } = this;
    // 删除功能
    function removeElement(e) {
        modeling.removeElements([element])
    }

    function clickElement(e) {
        console.log(element)
            // window.localStorage.setItem('nodeInfo', JSON.stringify(element))
            // window.localStorage.setItem('nodeVisible', 'true')
        store.commit('SETNODEINFO', element)
        store.commit('TOGGLENODEVISIBLE', true)
    }



    function editElement() { // 创建编辑图标
        return {
            group: 'edit',
            className: 'bpmn-icon-data-input',
            title: translate('编辑'),
            action: {
                click: clickElement
            }
        }
    }

    function deleteElement() {
        return {

        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('删除'),
        action: {
          click: removeElement

      }

        }
    }
  function startConnect (event, element) {
    connect.start(event, element)
  }
  function createEntries(entries){
        function appendTask(event, element) {
        console.log(element)
        if (autoPlace) {
            const shape = elementFactory.createShape({ type: entries.type},entries.options);
            autoPlace.append(element, shape);
        } else {
            appendTaskStart(event, element);
        }
    }

    function appendTaskStart(event) {
        console.log(event)
        const shape = elementFactory.createShape({ type: entries.type.replace(/^bpmn:/, '') });
        create.start(event, shape, element);
    }
    return {
        group: 'activity',
            className: entries.className,
            title: translate(entries.title),
            action: {
                click: appendTask,
                dragstart: appendTaskStart
            }
    }
  }
  let EntriesDefine=[
      {
          type:'bpmn:SendTask',
          className:'bpmn-icon-send',
          title:'封装头处理流程',
          options:'封装头处理流程',
      },
            {
          type:'bpmn:ServiceTask',
          className:'bpmn-icon-service',
          title:'消息体处理流程',
          options:'消息体处理流程',
      },
            {
          type:'bpmn:BusinessRuleTask',
          className:'bpmn-icon-business-rule',
          title:'应用体处理流程',
          options:'应用体处理流程',
      },
            {
          type:'bpmn:ScriptTask',
          className:'bpmn-icon-script-task',
          title:'接口处理流程',
          options:'接口处理流程',
      },
            {
          type:'bpmn:ExclusiveGateway',
          className:'bpmn-icon-gateway-xor',
          title:'创建条件分支',
          options:'创建条件分支',
      },
            {
          type:'bpmn:EndEvent',
          className:'icon-custom end-custom',
          title:'目的',
          options:'目的',
      },
      {
          type:'bpmn:StartEvent',
          className:'icon-custom start-custom',
          title:'起点',
          options:'起点',
      }

  ]
    return {
        'append.package-task':createEntries(EntriesDefine[0]),

        'append.message-task':createEntries(EntriesDefine[1]) ,
        'append.app-task':createEntries(EntriesDefine[2]) ,
        //'append.interface-task': createEntries(EntriesDefine[3]) ,
        'append.exclusive-gateway':createEntries(EntriesDefine[4]) ,
        'append.end-event':createEntries(EntriesDefine[5]) ,
        'append.start-event':createEntries(EntriesDefine[6]) ,
        'append.connect-tool': {
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('连接处理流程节点'),
            action: {
                click: startConnect,
                dragstart: startConnect
            }
        },
        'edit': editElement(),
        'delete': deleteElement()
    }
}