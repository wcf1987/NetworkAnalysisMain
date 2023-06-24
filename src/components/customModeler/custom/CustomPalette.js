/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
    this._handTool = handTool;
    this._globalConnect = globalConnect;
    this._translate = translate;

    palette.registerProvider(this);

}
PaletteProvider.$inject = ["palette", "create", "elementFactory", "spaceTool", "lassoTool", "handTool", "globalConnect", "translate"];


PaletteProvider.prototype.getPaletteEntries = function () {
    var actions = {},
        create = this._create,
        elementFactory = this._elementFactory,
        spaceTool = this._spaceTool,
        lassoTool = this._lassoTool,
        handTool = this._handTool,
        globalConnect = this._globalConnect,
        translate = this._translate;

    function createAction(type, group, className, title, options) {
        function createListener(event) {

            var shape = elementFactory.createShape({'type': type}, options);

            if (options) {
                shape.businessObject.di.isExpanded = options.isExpanded;
            }

            create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn:/, "");

        return {
            group,
            className,
            title: title || translate("Create {type}", {
                type: shortType
            }),
            action: {
                dragstart: createListener,
                click: createListener
            }
        };
    }

    actions = {
        "hand-tool": {
            group: "tools",
            className: "bpmn-icon-hand-tool",
            title: translate("Activate the hand tool"),
            action: {
                click: function (event) {
                    handTool.activateHand(event);
                }
            }
        },
        "lasso-tool": {
            group: "tools",
            className: "bpmn-icon-lasso-tool",
            title: translate("Activate the lasso tool"),
            action: {
                click: function (event) {
                    lassoTool.activateSelection(event);
                }
            }
        },
        "space-tool": {
            group: "tools",
            className: "bpmn-icon-space-tool",
            title: translate("Activate the create/remove space tool"),
            action: {
                click: function (event) {
                    spaceTool.activateSelection(event);
                }
            }
        },
        //连线样式
        "global-connect-tool": {
            group: "tools",
            // className: "bpmn-icon-connection-multi",
            className: "bpmn-icon-connection-multi",
            title: translate("连线"),
            action: {
                click: function (event) {
                    globalConnect.toggle(event);
                }
            }
        },
        "tool-separator": {
            group: "tools",
            separator: true
        },


        //开始事件 bpmn-icon-start-event-none

        /*

             "create.start-custom":
                createAction("bpmn:StartEvent",
                    "event",
                    "bpmn-icon-start-event-none",
                    translate("起点")
                ),

         */
        "create.start-custom":
            createAction("bpmn:StartEvent",
                "event",
                "icon-custom start-custom",
                translate("起点")
            ),
        //用户  bpmn-icon-user-task
        "create.package-task": createAction("bpmn:SendTask", "activity", "bpmn-icon-send", translate("封装头处理流程")),
        "create.message-task": createAction("bpmn:ServiceTask", "activity", "bpmn-icon-service", translate("消息体处理流程")),
        "create.app-task": createAction("bpmn:BusinessRuleTask", "activity", "bpmn-icon-business-rule", translate("应用体处理流程")),
        //"create.interface-task": createAction("bpmn:ScriptTask", "activity", "bpmn-icon-script-task", translate("接口处理流程")),

        // 网关 bpmn-icon-gateway-nonecreate-exclusive-gateway
        "create.exclusive-gateway": createAction("bpmn:ExclusiveGateway", "gateway", "bpmn-icon-gateway-xor", translate("创建条件分支")),
        // 结束事件 bpmn-icon-end-event-none
        "create.end-event": createAction("bpmn:EndEvent", "event", "icon-custom end-custom", translate("目的")),

    };

    return actions;
}