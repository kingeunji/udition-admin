<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">공지사항 </a>
                    </li>
                    
                </ul>

            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-10">
            <div v-if="selected == 1">
               <notice-result />
            </div>
        </div>
    </div>
</template>

<script>
import NoticeResult from './NoticeResult.vue'

export default {
    components : { NoticeResult },
    data() {
        return {
            selected : 1
        }
    }
}
</script>

<style>

</style>