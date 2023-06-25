
<template>
    <el-config-provider :locale="locale">
        <router-view/>
    </el-config-provider>

</template>

<script>
    import {defineComponent} from 'vue'
    import {ElConfigProvider} from 'element-plus'

    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    import { useDark, useToggle } from '@vueuse/core'
    export default defineComponent({
        components: {
            ElConfigProvider,
        },
        setup() {

            return {
                locale: zhCn,
            }
        },
    })
</script>


<style>
    html, body, #app {
        height: 100%;
        margin: 0px;
    }

</style>
