<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:selected == 1}">
                        <a href="#" @click="selected = 1"> APP : 아티스트 홈 </a>
                    </li>
                    <li :class="{active:selected == 2}">
                        <a href="#" @click="selected = 2"> APP : 아티스트 중간 </a>
                    </li>
                    <li :class="{active:selected == 3}">
                        <a href="#" @click="selected = 3"> APP : 기업 홈 </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-8">
           <BannerForm />
        </div>
    </div>
</template>

<script>
import BannerForm from './BannerForm.vue'

export default {
    components: { BannerForm },
    data() {
        return {
            selected : 1
        }
    }
}
</script>

<style>

</style>