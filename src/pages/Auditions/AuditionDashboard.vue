<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">진행중인 오디션 ({{ countResult.unexpiredCnt }})</a>
                    </li>
                    <li :class="{active:selected == 3}">
                        <a href="#" @click="selected = 3">전체 오디션 ({{ countResult.auditionCnt }})</a>
                    </li>
                    <li :class="{active:selected == 2}">
                        <a href="#" @click="selected = 2">승인대기중인 오디션 ({{ countResult.approvalCnt }})</a>
                    </li>
                    <li :class="{active:selected == 4}">
                        <a href="#" @click="selected = 4">종료된 오디션 ({{ countResult.expiredCnt }})</a>
                    </li>
                    <li :class="{active:selected == 5}">
                        <a href="#" @click="selected = 5">신고받은 오디션 ({{ countResult.reportCnt }})</a>
                    </li>
                
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-8">
            <auditionResult v-bind:filterType="selected" />
        </div>
    </div>
</template>

<script>
import auditionResult from './AuditionResult.vue'
import { audition } from '../../api/audition'

export default {
    components : { auditionResult },
    data() {
        return {
            selected : 1,
            countResult : {
                unexpiredCnt : 0,
                approvalCnt : 0,
                auditionCnt : 0,
                expiredCnt : 0,
                reportCnt : 0
            }
        }
    }, 
    created() {
        this.searchCount()
    },
    methods : {
        searchCount() {
            audition.count()
                    .then(data => {
                        this.countResult.unexpiredCnt = data.result.unexpiredCnt // 진행중인 오디션
                        this.countResult.approvalCnt = data.result.approvalCnt // 승인 대기중인 오디션
                        this.countResult.auditionCnt = data.result.auditionCnt // 전체 오디션수 
                        this.countResult.expiredCnt = data.result.expiredCnt // 종료된 오디션 수 
                        this.countResult.reportCnt = data.result.reportCnt // 종료된 오디션 수 
                        
                    })
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