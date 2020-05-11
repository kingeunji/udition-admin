<template>
    <div class="row">
        <!-- sidebar -->
        <div class="col-2">
            <div class="sidebar-wrap">
                <ul id="artist-navi" class="sidebar-navi">
                    <li :class="{active:bannerType == 'banner'}">
                        <a href="#" @click="bannerType = 'banner'"> APP : 아티스트 홈 </a>
                    </li>
                    <li :class="{active:bannerType == 'biz'}">
                        <a href="#" @click="bannerType = 'biz'"> APP : 기업 홈 </a>
                    </li>
                    <li :class="{active:bannerType == 'middle'}">
                        <a href="#" @click="bannerType = 'middle'"> APP & PC : 중간 배너  </a>
                    </li>
                    <li :class="{active:bannerType == 'big'}">
                        <a href="#" @click="bannerType = 'big'"> PC : 메인배너 </a>
                    </li>
                    <li :class="{active:bannerType == 'belt'}">
                        <a href="#" @click="bannerType = 'belt'"> PC : 상단띠배너  </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div id="contents" class="col-9">
            <el-alert
                effect="dark"
                title="APP 배너 사이즈"
                type="info"
                description="1280*712 / 936*520"
                show-icon>
            </el-alert>
            <el-alert
                effect="dark"
                title="PC 배너 사이즈"
                type="info"
                description="1920*450 / 1920*300"
                show-icon>
            </el-alert>

            <!-- <div v-if="bannerType == 'big'">
            <el-alert
                effect="dark"
                title="썸네일 사이즈"
                type="info"
                description="44*44"
                show-icon>
            </el-alert>
            </div> -->

            <BannerForm v-bind:bannerType="bannerType"/>
            <BannerList v-bind:bannerType="bannerType" />
        </div>
    </div>
</template>

<script>
import BannerForm from '@/pages/Banner/BannerForm.vue'
import BannerList from '@/pages/Banner/BannerList.vue'

export default {
    components: { BannerForm, BannerList },
    data() {
        return {
            bannerType : 'banner'
        }
    }
}
</script>

<style>

</style>