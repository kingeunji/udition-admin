<template>
    <el-container>
        <el-header  style="padding: 0px; background-color: #fff;">
            <el-container style="padding-top: 20px;">
                <el-col :span="2"></el-col>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">관리자 페이지</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">전체 아티스트</a></el-breadcrumb-item>
                </el-breadcrumb>
            </el-container>
        </el-header>

        <el-container>
            <el-col :span="2"></el-col>
            <el-aside style="width: 200px; margin-top:30px;" >
                <el-row>
                    <el-col :span="24">
                        <ul id="artist-navi" class="sidebar-navi">
                            <li :class="{active:selected == 1}">
                                <a href="#" @click="selected = 1">전체 아티스트 </a>
                            </li>
                            <li :class="{active:selected == 2}">
                                <a href="#" @click="selected = 2" >프리미엄 유저 </a>
                            </li>
                            <li :class="{active:selected == 3}">
                                <a href="#" @click="selected = 3">컬랙션 관리 </a>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <ArtistFilter />
                    </el-col>
                </el-row>
            </el-aside>

            <el-main style="width: 800px; margin-top:30px;" >
                <Search />
            </el-main>
            <el-col :span="2"></el-col>
        </el-container>
    </el-container>
</template>

<script>
import ArtistFilter from '../../components/ArtistFilter.vue'
import Search from './search.vue' 

export default {
    components : { ArtistFilter, Search },
    data() {
        return {
            selected : 1,
            memberTier : '0',
            allSelected : ''
        }
    }, methods : {
        tabChange() {
            
        }
    }
}
</script>

<style scoped>

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
    }

    .sidebar-navi {
        margin: 0;
        padding: 0;
    }

</style>