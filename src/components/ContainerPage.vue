<template>
    <el-container class="layout-container-demo">
        <el-header>
            <div class="elheaderdiv">
                <img class="divimg" src="../assets/hbg.png" no-repeat top center alt="">
                <span class="headerspan">网络数据包分析系统</span>
            </div>


        </el-header>
        <el-aside>

            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"

                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    :unique-opened="true"
            >
                <el-sub-menu index="0">
                    <template #title>
                        <el-icon>
                            <House/>
                        </el-icon>
                        <span>运行状态</span>
                    </template>
                    <el-menu-item :index="'/index'">
                        <template #title>
                            <el-icon>
                                <Discount/>
                            </el-icon>
                            <span>运行主页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/devicestatus'">
                        <template #title>
                            <el-icon>
                                <Monitor/>
                            </el-icon>
                            <span>设备状态</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/wwwstatus'">
                        <template #title>
                            <el-icon>
                                <UserFilled/>
                            </el-icon>
                            <span>网内成员状态</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/subwww'">
                        <template #title>
                            <el-icon>
                                <Grid/>
                            </el-icon>
                            <span>功能子网</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/inforstatistics'">
                        <template #title>
                            <el-icon>
                                <Histogram/>
                            </el-icon>
                            <span>消息统计</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <Aim/>
                        </el-icon>
                        <span>接口设计</span>
                    </template>
                    <el-menu-item-group title="">

                        <el-menu-item :index="'/InterfaceTable'">
                            <template #title>
                                <el-icon>
                                    <MessageBox/>
                                </el-icon>
                                <span>网络接口列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/PackageTable'">
                            <template #title>
                                <el-icon>
                                    <Memo/>
                                </el-icon>
                                <span>封装头列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/AppTable'">
                            <template #title>
                                <el-icon>
                                    <Film/>
                                </el-icon>
                                <span>应用头列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item :index="'/MessageTable'">
                            <template #title>
                                <el-icon>
                                    <BellFilled/>
                                </el-icon>
                                <span>消息体列表</span>
                            </template>
                        </el-menu-item>

                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Operation/>
                        </el-icon>
                        <span>规则设计</span>
                    </template>
                    <el-menu-item-group title="">
                        <el-menu-item :index="'/transRulesTable'">
                            <template #title>
                                <el-icon>
                                    <Paperclip/>
                                </el-icon>
                                <span>规则列表</span>
                            </template>

                        </el-menu-item>
                        <el-menu-item :index="'/flowTable'">
                            <template #title>
                                <el-icon>
                                    <Guide/>
                                </el-icon>
                                <span>流程设计</span>
                            </template>
                        </el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>

                <el-sub-menu index="3" v-show="false">
                    <template #title>
                        <el-icon>
                            <CreditCard/>
                        </el-icon>
                        <span>函数设计</span>
                    </template>
                    <el-menu-item-group title="">
                        <el-menu-item :index="'/packTable'">
                            <template #title>
                                <el-icon>
                                    <Magnet/>
                                </el-icon>
                                <span>转换函数</span>
                            </template>

                        </el-menu-item>
                        <el-menu-item :index="'/funcTable'">
                            <template #title>
                                <el-icon>
                                    <SetUp/>
                                </el-icon>
                                <span>计算函数</span>
                            </template>
                        </el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>

                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <Tools/>
                        </el-icon>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item :index="'/localparametersetting'">
                        <template #title>
                            <el-icon>
                                <Tickets/>
                            </el-icon>
                            <span>本地参数设置</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/forwardingrules'">
                        <template #title>
                            <el-icon>
                                <Rank/>
                            </el-icon>
                            <span>转发规则</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/distributionrules'">
                        <template #title>
                            <el-icon>
                                <Sort/>
                            </el-icon>
                            <span>分发规则</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/Transcodingrule'">
                        <template #title>
                            <el-icon>
                                <Orange/>
                            </el-icon>
                            <span>数据转码规则</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :index="'/linkmanagement'">
                        <template #title>
                            <el-icon>
                                <HelpFilled/>
                            </el-icon>
                            <span>系统维护</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>

        </el-aside>

        <el-main>

            <router-view></router-view>

        </el-main>
    </el-container>

</template>
<script setup>


</script>

<style scoped>
    .layout-container-demo::before {
        content: " ";
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: #162248;
        z-index: -100;
    }

    .layout-container-demo {
        height: 100%;
        overflow: hidden;
    }

    .layout-container-demo .el-header {
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        /* 上面的display 和justify-content 实现 退出按钮显示在右边 */
        padding-left: 0px;

        /* 上面的padding-left 减少图片左边的间距，el-header 默认有间距 */
        align-items: center;
        /* 按钮居中 */
        color: #a8d7ff;
        /* 文本的颜色 */
        font-size: 27px;
        /* 文本大小 */

    }

    .elheaderdiv {
        display: flex;
        align-items: center;
        top: 0px

    }

    .divimg {
        position: fixed;
        margin-left: 0px;
        left: -120px;
        top: 0px;
    }

    .headerspan {
        position: fixed;
        align-items: center;
        left: 43%;
        top: 5px;
        /* 图片和文字之间的间距 */
    }


    .layout-container-demo .el-aside {

        background: linear-gradient(to left, #093272, #162248);;

        text-align: center;
        width: 200px;
        height: 100%;

        background-color: #313743;
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

        background: #162248 !important;
    }

    .el-menu {
        border-right: none;
        active-text-color: "transparent";
        background-color: transparent;
        text-color: "#fff";
        width: 220px;
        --el-menu-bg-color:"transparent";
    }

    .layout-container-demo.el-menu.el-sub-menu {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none !important;
        text-color: "#fff";
    }
    .layout-container-demo :deep(.el-menu-item) {

        text-color: "#fff";
    }
.el-menu-item{
    color: #fff;
}
    .layout-container-demo.el-menu.el-sub-menu.is-opened {
        background-color: transparent;
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
        color: #fff;
    }

    .layout-container-demo.el-aside :deep(.el-sub-menu__icon-arrow) {
        margin-right: 0px !important;
    }

    .layout-container-demo.el-aside :deep(.el-icon) {
        margin-right: 0px !important;
    }
    :deep(.el-sub-menu__title:hover){
            background-color: #1f7afb !important;
    }
    :deep(.el-menu-item:hover){
        background-color: #1f7afb !important;
    }
    :deep(.el-menu-item.is-active){
        color: #fbec43 !important;
    }
</style>
