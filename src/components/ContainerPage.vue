
<template >
    <el-container class="layout-container-demo">
        <el-header>
            <div class="elheaderdiv">
                <img class="divimg" src="../assets/hbg.png" no-repeat top center alt="">
                <span class="headerspan">网络数据包分析系统</span>
                <el-icon class="Expand" @click="changeStatus" v-show="false">
                    <Expand/>
                </el-icon>
            </div>


        </el-header>
        <el-aside width=“auto”>

            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    :collapse=isCollapse
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
    import {ref} from 'vue'
import '@/css/containerpage.scss'
    const isCollapse = ref(false)
    function changeStatus(){
        if(isCollapse.value){
            isCollapse.value=false
        }else{
            isCollapse.value=true
        }
    }
</script>


<style scoped>

</style>
