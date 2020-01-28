<template>
  <el-container>
        <el-header  style="padding: 0px; background-color: #fff;">
            <el-container style="padding-top: 20px;">
                <el-col :span="2"></el-col>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">관리자 페이지</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">기업 회원</a></el-breadcrumb-item>
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
                                <a href="#" @click="selected = 1">기업 목록 </a>
                            </li>
                            <li :class="{active:selected == 2}">
                                <a href="#" @click="selected = 2" >승인 대기 중 기업 </a>
                            </li>
                            <li :class="{active:selected == 3}">
                                <a href="#" @click="selected = 3">결제 현황 </a>
                            </li>
                            <li :class="{active:selected == 4}">
                                <a href="#" @click="selected = 4">마케팅 요청 </a>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </el-aside>

            <el-main style="width: 800px; margin-top:30px;" >
                <el-row>
                    <div style="display: inline-block; width: 60%;">
                        <el-checkbox v-model="allChecked" @change="checkAllChange">모든 결과 선택</el-checkbox>
                        <el-checkbox v-model="standardChecked">스탠다드 기업</el-checkbox>
                        <el-checkbox v-model="advancedChecked">어드밴스 기업</el-checkbox>
                    </div>
                    <div style="display: inline-block; width: 40%;">
                        <el-row>
                            <el-col :span="8">
                                <el-select v-model="actionSelect" placeholder="-">
                                    <el-option
                                        size="small"
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" style="padding-left:6px; padding-right:6px;">
                                <el-button size="mini" type="primary" @click="actionModal" >확인</el-button>
                            </el-col>
                            
                        </el-row>
                    </div>
                </el-row>

                <div style="margin-top:10px;">
                    <div class="bold-text" style="width:300px; display:inline-block;">
                        <span>필터/검색 결과 기업 : 134개 </span>
                    </div>
                     <div class="bold-text" style="width:500px; display:inline-block;float: left;">
                        <span>필터/검색 결과 기업 : 134개 </span>
                    </div>
                </div>

                <div class="col-3">
                    asfasf
                </div>
            </el-main>

            <el-col :span="2"></el-col>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            options : [{
                value : 'mail',
                label : '이메일 보내기'
                
            }, {
                value : 'push',
                label : '푸시 보내기'
            }],
            selected : "1",
            businessList : [],
            allChecked : false,
            standardChecked : false,
            advancedChecked : false,
            modelType : 0,
            actionSelect : ''
        }
    },
    watch : {
        $route() {
            this.fetchData()
        }
    },
    methods : {
        fetchData() {

        },
        checkAllChange() {
            //전체 결과 선택
        },
        actionModal() {
            // 메일 / 푸시 모달 
        }
    }


}
</script>

<style>

    .bold-text {
        font-weight: 500;
        font-size: 13px;
    }

    .el-input__inner {
        height: 30px !important;
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
    }

    .sidebar-navi {
        margin: 0;
        padding: 0;
    }

</style>