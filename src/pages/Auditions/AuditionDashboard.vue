<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">잔행중인 오디션 </a>
                    </li>
                    <li :class="{active:selected == 2}">
                        <a href="#" @click="selected = 2">승인대기중인 오디션 </a>
                    </li>
                    <li :class="{active:selected == 3}">
                        <a href="#" @click="selected = 3">전체 오디션 </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-8">
            <auditionResult />
        </div>
    </div>
</template>

<script>
import auditionResult from './AuditionResult.vue'

export default {
    components : { auditionResult },
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