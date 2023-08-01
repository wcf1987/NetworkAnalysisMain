<template>
    <div class="timers digtal_font_time">
        <dv-border-box-7 style="width: auto;height:70px;">
            <div style="display: flex; flex-direction: row;">
                <div class="text_b">无人机1</div>
                <dv-button class="bot" border="Border3" color="#c8161d" font-color="#e18a3b">掉线</dv-button>
            </div>
        </dv-border-box-7>
        <dv-border-box-7 style="width: auto;height:70px;">
            <div style="display: flex; flex-direction: row;">
                <div class="text_b">无人机2</div>
                <dv-button class="bot" border="Border3" color="#4c8045" font-color="#4c8045">在线</dv-button>
            </div>
        </dv-border-box-7>
        <dv-border-box-7 style="width: auto;height:70px;">
            <div style="display: flex; flex-direction: row;">
                <div class="text_b">无人机3</div>
                <dv-button class="bot" border="Border3" color="#4c8045" font-color="#4c8045">在线</dv-button>
            </div>
        </dv-border-box-7>
    </div>
</template>
<script>
export default {
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
}

.text_b {
    margin: 0;
    padding: 0;
    margin-left: 20px;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
}
.bot{
    width:80px;
    height: 40px;
    margin-top: 10px;
    margin-left: 200px;
}
</style>