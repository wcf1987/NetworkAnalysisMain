<template>
    <div class="containers">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <template v-else>
            <div class="canvas" ref="canvas"></div>
            <div id="js-properties-panel" class="panel"></div>
            <ul class="buttons">
                <li>
                    <a ref="saveDiagram" href="javascript:" title="保存为bpmn">保存为bpmn</a>
                </li>
                <li>
                    <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
    // 引入相关的依赖

    export default {

        addEvent() {
            console.log('创建成功!')
            this.addBpmnListener()
            this.addModelerListener()
            this.addEventBusListener()
        },
        // 添加绑定事件
        addBpmnListener() {
            const that = this
            // 获取a标签dom节点
            const downloadLink = this.$refs.saveDiagram
            const downloadSvgLink = this.$refs.saveSvg
            // 给图绑定事件，当图有发生改变就会触发这个事件
            this.bpmnModeler.on('commandStack.changed', function () {
                that.saveSVG(function (err, svg) {
                    that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
                })
                that.saveDiagram(function (err, xml) {
                    that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
                })
            })
        },
        addModelerListener() {
            // 监听 modeler
            const bpmnjs = this.bpmnModeler
            const that = this
            // 'shape.removed', 'connect.end', 'connect.move'
            const events = ['shape.added', 'shape.move.end', 'shape.removed']
            events.forEach(function (event) {
                that.bpmnModeler.on(event, e => {
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
        },
        addEventBusListener() {
            // 监听 element
            let that = this
            const eventBus = this.bpmnModeler.get('eventBus')
            const modeling = this.bpmnModeler.get('modeling')
            const elementRegistry = this.bpmnModeler.get('elementRegistry')
            const eventTypes = ['element.click', 'element.changed']
            eventTypes.forEach(function (eventType) {
                eventBus.on(eventType, function (e) {
                    console.log(e)
                    if (!e || e.element.type == 'bpmn:Process') return
                    if (eventType === 'element.changed') {
                        that.elementChanged(e)
                    } else if (eventType === 'element.click') {
                        console.log('点击了element')
                        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
                        if (shape.type === 'bpmn:StartEvent') {
                            modeling.updateProperties(shape, {
                                name: '我是修改后的虚线节点',
                                isInterrupting: false,
                                customText: '我是自定义的text属性'
                            })
                            // modeling.setColor(shape, {
                            //   fill: '#ff0000',
                            //   stroke: null
                            // })
                        }
                    }
                })
            })
        },
        isInvalid(param) {
            // 判断是否是无效的值
            return param === null || param === undefined || param === ''
        },
        isSequenceFlow(type) {
            // 判断是否是线
            return type === 'bpmn:SequenceFlow'
        },
        elementChanged(e) {
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
        },
        getShape(id) {
            var elementRegistry = this.bpmnModeler.get('elementRegistry')
            return elementRegistry.get(id)
        },
        // 下载为SVG格式,done是个函数，调用的时候传入的
        saveSVG(done) {
            // 把传入的done再传给bpmn原型的saveSVG函数调用
            this.bpmnModeler.saveSVG(done)
        },
        // 下载为bpmn格式,done是个函数，调用的时候传入的
        saveDiagram(done) {
            // 把传入的done再传给bpmn原型的saveXML函数调用
            this.bpmnModeler.saveXML({format: true}, function (err, xml) {
                done(err, xml)
            })
        },
        // 当图发生改变的时候会调用这个函数，这个data就是图的xml
        setEncoded(link, name, data) {
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
        }

    }
</script>

<style scoped>

</style>
