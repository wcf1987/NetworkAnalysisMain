<template>
    <el-container class="layout-container-demo">
        <el-header>
            <div class="elheaderdiv">
                <img class="divimg" src="../assets/6.png" alt="">
                <span class="headerspan">网络数据包分析系统</span>
            </div>


        </el-header>
        <el-aside>

            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    :unique-opened="true"
            >

                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location/>
                        </el-icon>
                        <span>接口设计</span>
                    </template>
                    <el-menu-item-group title="">

                        <el-menu-item :index="'/InterfaceTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>网络接口列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/PackageTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>封装头列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/AppTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>应用头列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/MessageTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>消息体列表</span>
                            </template>
                        </el-menu-item>

                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <location/>
                        </el-icon>
                        <span>规则设计</span>
                    </template>
                    <el-menu-item-group title="">
                        <el-menu-item :index="'/transRulesTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>规则列表</span>
                            </template>

                        </el-menu-item>
                        <el-menu-item :index="'/flowTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>流程设计</span>
                            </template>
                        </el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <location/>
                        </el-icon>
                        <span>函数设计</span>
                    </template>
                    <el-menu-item-group title="">
                        <el-menu-item :index="'/packTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>转换函数</span>
                            </template>

                        </el-menu-item>
                        <el-menu-item :index="'/funcTable'">
                            <template #title>
                                <el-icon>
                                    <document/>
                                </el-icon>
                                <span>计算函数</span>
                            </template>
                        </el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
            </el-menu>

        </el-aside>

        <el-main>

            <router-view></router-view>

        </el-main>
    </el-container>

</template>
<script setup>
    import Table1 from "@/components/common/Table1";
    import {ArrowRight} from '@element-plus/icons-vue'

    const handleClickDelete = () => {
        console.log('click')
    }
    const handleClickEdit = () => {

    }


</script>

<style scoped>
    .layout-container-demo {
        height: 100%;
        overflow: hidden;
    }

    .layout-container-demo .el-header {
        background-color: var(--el-color-primary-light-8);;
        display: flex;
        justify-content: space-between;
        /* 上面的display 和justify-content 实现 退出按钮显示在右边 */
        padding-left: 0cm;
        /* 上面的padding-left 减少图片左边的间距，el-header 默认有间距 */
        align-items: center;
        /* 按钮居中 */
        color: black;
        /* 文本的颜色 */
        font-size: 30px;
        /* 文本大小 */

    }

    .elheaderdiv {
        display: flex;
        align-items: center;

    }

    .divimg {
        margin-left: 20px;
    }

    .headerspan {
        margin-left: 10px;
        /* 图片和文字之间的间距 */
    }

    .layout-container-demo .el-aside {
        color: var(--el-text-color-primary);
        background: var(--el-color-primary-light-8);
        text-align: center;
        width: 200px;
        height: 100%;

        background-color: #313743;
    }

    .layout-container-demo .el-menu {
        border-right: none;
    }

    .layout-container-demo .el-main {
        width: 85%;
        height: 91%;
        margin: 0;
        position: absolute;
        left: 200px;
        top: 60px;
        right: 0;
        bottom: 0;
        padding: 0;
        overflow: hidden;

        background: #ffffff !important;
    }

    .layout-container-demo.el-menu {
        border-right: none !important;
        width: 220px;
    }

    .layout-container-demo.el-sub-menu {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none !important
    }

    .layout-container-demo.el-menu {
        height: 56px !important;
        line-height: 56px !important;
    }

    .layout-container-demo .el-aside :deep(.el-sub-menu__title) {
        /*
            padding-left: 0px !important;
            margin-left: 0px;
          */
        font-weight: 400;
        font-size: 16px;
    }

    .layout-container-demo.el-aside :deep(.el-sub-menu__icon-arrow) {
        margin-right: 0px !important;
    }

    .layout-container-demo.el-aside :deep(.el-icon) {
        margin-left: 0px !important;
    }

</style>
