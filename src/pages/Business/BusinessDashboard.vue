<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">기업 목록 </a>
                    </li>
                    <li :class="{active:selected == 2}">
                        <a href="#" @click="selected = 2" >승인 대기중 기업 </a>
                    </li>
                    <li :class="{active:selected == 3}">
                        <a href="#" @click="selected = 3">결제 현황</a>
                    </li>
                    <li :class="{active:selected == 4}">
                        <a href="#" @click="selected = 4">마케팅 요청</a>
                    </li>
                </ul>

            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-10">
            <div v-if="selected == 1">
                <BusinessResult />
            </div>
            <div v-else-if="selected == 2">
                <WaitingResult />
            </div>
        </div>
    </div>
</template>

<script>
import BusinessResult from './BusinessResult.vue'
import WaitingResult from './WaitingResult.vue'

export default {
    components : {BusinessResult, WaitingResult},
    data() {
        return {
            selected : 1
        }
    }
}
</script>

<style scoped>
    .content {
        padding: 30px 15px;
        min-height: calc(100% - 123px);
        width: 1500px !important;
    }
</style>