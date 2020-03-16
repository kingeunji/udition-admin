<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1">유디톡 </a>
                    </li>
                    
                </ul>

            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-10">
            <div v-if="selected == 1">
               <tok-result />
            </div>
        </div>
    </div>
</template>

<script>
import TokResult from './TokResult.vue'

export default {
    components : { TokResult },
    data() {
        return {
            selected : 1
        }
    }
}
</script>

<style>

</style>