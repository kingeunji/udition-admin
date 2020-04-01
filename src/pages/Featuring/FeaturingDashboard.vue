<template>
<div class="row">
    <!-- sidebar -->
    <div class="col-3">
        <div class="sidebar-wrap">
            <ul id="artist-navi" class="sidebar-navi">
                <li :class="{active:selected == 1}">
                    <a href="#" @click="selected = 1">[추가] 아티스트 피처링 </a>
                </li>
                <li :class="{active:selected == 2}">
                    <a href="#" @click="selected = 2">프로필 업데이트를 했어요 </a>
                </li>
            </ul>

            <!-- fillter -->
            <artistFilter v-if="selected == 1" />
        </div>
    </div>

    <!-- Content -->
    <div id="contents" class="col-8">
        <FeaturingResult v-if="selected == 1" />
        <collectionResult v-else-if="selected == 2" />
    </div>
</div>
</template>

<script>
import artistFilter from './ArtistFilter.vue'
import FeaturingResult from './FeaturingResult.vue'
import collectionResult from './CollectionResult.vue'


export default {
    components : { artistFilter, FeaturingResult, collectionResult },
    data() {
        return {
            selected : 1,
        }
    },
    methods : {
       
    }
}
</script>

<style>

    #contents {
        padding: 0 0 90px;
    }

    ul {
        list-style:none;
    }
    ul.sidebar-navi>li.active>a::before {
        position: absolute;
        bottom: 0;
        width: 100%;
        min-width: 96px;
        height: 2px;
        border-radius: 2px;
        background-color: #50b0b1;
        content: "";
    }

    ul.sidebar-navi>li {
        margin: 16px 0;
        padding: 0;
    }

    ul.sidebar-navi>li.active>a {
        position: relative;
        color: #50b0b1;
        padding: 9px 0 7px;
        transition: all .2s ease-in-out;
    }

    .sidebar-navi a {
        position: relative;
        font-size: 14px;
        font-weight: 500;
        color: #565a5c;
        font-family: 'Noto Sans KR';
    }

    .sidebar-navi {
        margin: 0;
        padding: 0;
    }

    .sidebar-wrap {
        width: 220px;
        margin-top: 50px;
    }

    div {
        font-family: 'Noto Sans KR';
    }
</style>