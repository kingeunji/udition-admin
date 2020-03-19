<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">어드바이저의 팁</a>
                    </li>
                    
                </ul>

            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-10">
            <div v-if="selected == 1">
               <advisor-result />
            </div>
        </div>
    </div>
</template>

<script>
import AdvisorResult from './AdvisorResult.vue'

export default {
    components : { AdvisorResult },
    data() {
        return {
            selected : 1
        }
    }
}
</script>

<style>

</style>