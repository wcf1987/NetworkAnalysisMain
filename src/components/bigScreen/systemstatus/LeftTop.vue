<template>
    <div class="timers digtal_font_time">
        <dv-border-box-7 style="width: auto;height:70px;">
            <p>北京时间：{{ dateYear }} {{ dateWeek }} {{ dateDay }}</p>
        </dv-border-box-7>
        <dv-border-box-7 style="width: auto;height:70px;">
            <p>北斗时间：{{ dateYear }} {{ dateWeek }} {{ dateDay }}</p>
        </dv-border-box-7>
        <dv-border-box-7 style="width: auto;height:70px;">
            <p>其他时间：{{ dateYear }} {{ dateWeek }} {{ dateDay }}</p>
        </dv-border-box-7>
    </div>
</template>
<script>
import { formatTime } from "./utils.js";
export default {
    data() {
        return {
            timing: null,
            loading: true,
            dateDay: null,
            dateYear: null,
            dateWeek: null,
            weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        };
    },
    filters: {
        numsFilter(msg) {
            return msg || 0;
        },
    },
    computed: {},
    created() { },
    mounted() {
        this.timeFn();
        this.cancelLoading();
    },
    methods: {
        showSetting() {
            this.$refs.setting.init();
        },
        timeFn() {
            this.timing = setInterval(() => {
                this.dateDay = formatTime(new Date(), "HH: mm: ss");
                this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
                this.dateWeek = this.weekday[new Date().getDay()];
            }, 1000);
        },
        cancelLoading() {
            let timer = setTimeout(() => {
                this.loading = false;
                clearTimeout(timer);
            }, 500);
        },
    },
};
</script>

<style lang='scss' scoped>
.digtal_font_time {
    color: aqua;
}

.timers {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.timers p {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
}</style>