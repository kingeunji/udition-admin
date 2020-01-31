<template>
    <div class="sort-option">
        <el-alert
            title="Tier 분류에 대한 안내 "
            type="info"
            show-icon
            effect="dark">
        </el-alert>

        <el-tabs v-model="activeName">
            <el-tab-pane label="전체 회원" name="0"></el-tab-pane>
            <el-tab-pane label="Tier 01" name="1"></el-tab-pane>
            <el-tab-pane label="Tier 02" name="2"></el-tab-pane>
            <el-tab-pane label="Tier 03" name="3"></el-tab-pane>
            <el-tab-pane label="Tier B" name="4"></el-tab-pane>
            <el-tab-pane label="기업고객의 View" name="5"></el-tab-pane>
        </el-tabs>

        <div class="row" style="margin-bottom : 20px;">
            <div class="col-6" style="display: inline-block; padding-right :0px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-checkbox v-model="allSelect" label="1" @change="selectAll" >모든 결과 선택</el-checkbox> </el-form-item>
                    <el-form-item> <el-checkbox v-model="perfectionSelect" label="1" @change="changeFilter(1)">완성도 50% 이상</el-checkbox> </el-form-item>
                    <el-form-item> <el-checkbox v-model="profileSelect" label="1" @change="changeFilter(2)">프로필 등록자</el-checkbox> </el-form-item>    
                </el-form>
                
                <span style="font-weight:600; font-size: 13px">필터/검색 아티스트 결과 : {{ this.pagination.dbCount }} 개 </span>
            </div>
            <div class="col-6" style="padding :0px; display: inline-block; float: right; text-align: right;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> 
                        <span style="margin-right:10px; font-size: 13px">아티스트에게 일괄</span>
                        <el-select v-model="actionSelect" placeholder="-">
                            <el-option
                                    size="mini"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>    
                    </el-form-item>
                    <el-form-item> 
                        <el-button size="small" type="primary" v-on:click="profileAction">확인</el-button>
                    </el-form-item>            
                </el-form>
            </div>
        </div>            

        <div class="list-group-gallery auditon-detail-list">
            <div class="row">
                
                
                <div class="col-3" v-for="item in this.artistList" v-bind:key="item.uid">
                    <div class="list-type-action">
                        <div style="display:inline;">{{ item.perfection }} %</div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="selectedProfile" :value=item.webUrl :id=item.uid>
                            <label class="custom-control-label" :for=item.uid>
                                {{ item.webUrl }}
                            </label>
                        </div>
                    </div>
                    <div class="list-type-inner" v-loading="loading">
                        <div class="list-thumbnail">
                            <img :src="'http://35.243.93.121:8080/fileFolder/' + item.image" style="width:162px; height:162px;" class="img-fluid" @error="imageLoadOnError">
                        </div>

                        <div class="list-profile-play">
                            <router-link :to='"/artists/"+ item.webUrl' tag="button" class="btn-profile-view"><a style="color: #606266" target="_blank">프로필 보기 </a></router-link>
                            <button type="button" class="btn-profile-play"> <i class="el-icon-caret-right"></i> </button>
                        </div>
                        <div class="clearfix"></div>
                    </div>    
                </div>

            </div>
        </div>

        <div style="text-align: center; margin-top: 15px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size=40
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>


    </div>
</template>

<script>
import {artist} from '../../api/artist.js'
import image from '../../assets/img/img_default_user@3x.png'
import { EventBus } from '../../utils/event-bus'

export default {
    data() {
        return {
            activeName : "0",
            options : [{
                value : 'mail',
                label : '이메일 보내기'
                
            }, {
                value : 'push',
                label : '푸시 보내기'
            }, {
                value : 'Tier1',
                label : 'Tier1 설정'
            }, {
                value : 'Tier2',
                label : 'Tier2 설정'
            }, {
                value : 'Tier3',
                label : 'Tier3 설정'
            }, {
                value : 'TierB',
                label : 'TierB 설정'
            }],
            selectedProfile : [],
            allSelect : false,
            pageSelect : false,
            perfectionSelect : false,
            profileSelect : false,
            actionSelect : '',
            artistList : [],
            error : '',
            form : { filterType : 0, allFlag : 0 },
            loading: true,
            pagination : '',
            localType : {
                filterType : '',
                memberTier : ''
            }
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {
        EventBus.$on("emitEvent", form => {
            this.form = form;
            this.settingLocalData()
            this.fetchData()
        });
    },
    watch : {
        activeName : function() {
            this.form.memberTier = this.activeName
            this.localType.memberTier = this.activeName
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            artist.search(this.form)
                  .then(data => {
                      this.artistList = data.results
                      this.pagination = data.page
                      this.loading = false
                      
                  })
                  .catch(err => {
                      this.error = err.data
                  })
            if(this.form.memberTier) {
                this.activeName = this.form.memberTier.toString()
            }
            this.allSelect = false
            this.selectedProfile = []
            
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        changeFilter(val) {
            if(this.perfectionSelect == true && this.profileSelect == true) {
                // 둘다 선택된 경우 
                this.form.filterType = 3
            } else if(this.perfectionSelect == true) {
                this.form.filterType = 1
            } else if(this.profileSelect == true) {
                this.form.filterType = 2
            } else {
                this.form.filterType = 0
            }
            this.localType.filterType = this.form.filterType
            this.fetchData()
        },
        settingLocalData() {
            if(!this.localType.filterType) {
                this.form.filterType = this.localType.filterType
            }
            if(!this.localType.memberTier) {
                this.form.memberTier = this.localType.memberTier
            }
        },
        selectAll() {
            // 전체 선택 
            var selectedProfile = [];
            if(this.allSelect) {
                this.form.allFlag = 1
                this.artistList.forEach(function(artist) {
                    selectedProfile.push(artist.webUrl)
                })
            }
            this.selectedProfile = selectedProfile
        },
        profileAction() {
            this.form.webUrlList = this.selectedProfile
            if(this.actionSelect === 'Tier1') {
                this.form.updateMemberTier = 1
                artist.update(this.form)
                  .then(data => {
                      this.fetchData()
                      alert("선택하신 아티스트의 티어를 설정하였습니다!");
                  })
                  .catch(err => {
                      this.error = err.data
                  })
            } else if(this.actionSelect === 'Tier2') {
                this.form.updateMemberTier = 2
                artist.update(this.form)
                  .then(data => {
                      this.fetchData()
                      alert("선택하신 아티스트의 티어를 설정하였습니다!");
                  })
                  .catch(err => {
                      this.error = err.data
                  })
            } else if(this.actionSelect === 'Tier3') {
                this.form.updateMemberTier = 3
                artist.update(this.form)
                  .then(data => {
                      this.fetchData()
                      alert("선택하신 아티스트의 티어를 설정하였습니다!");
                  })
                  .catch(err => {
                      this.error = err.data
                  })
            } else if(this.actionSelect === 'TierB') {
                this.form.updateMemberTier = 4
                artist.update(this.form)
                  .then(data => {
                      this.fetchData()
                      alert("선택하신 아티스트의 티어를 설정하였습니다!");
                  })
                  .catch(err => {
                      this.error = err.data
                  })
            }
            
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .el-alert {
        margin-bottom: 13px !important;
    }
    .el-switch__label * {
        font-size: 13px !important;
    }

    .list-group-gallery {
        padding: 0 0 22px;
    }

    .el-switch__label--right {
        margin-left: 2px !important;
    }
    .sort-option {
        margin-top: 23px;
        margin-bottom: 13px;
    }

    .option {
        margin-top: 3px;
    }

    .el-switch {
        margin-right: 11px;
    }

    .list-profile-play .btn-profile-play {
        float: right;
        width: 30px;
        color: #e0e0e0;
        font-size: 11px;
    }
    
    a {
        font-family: 'Noto Sans KR';
        font-weight: 400;
    }

    .list-type-loop .custom-control-label::after {
        left: -21px;
    }

    .btn-profile-play, .btn-profile-view {
        font-family: 'Noto Sans KR';
        float: left;
        width: 79%;
        height: 31px;
        color: #777;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        overflow: hidden;
        padding: 0;
        padding-bottom: 1px;
        background-color: #fff;
        transition: all .2s ease-in-out;
    }

    .list-profile-play {
        clear: both;
    }

    .img-fluid {
        max-width: 100%;
    }

    .list-type-inner {
        position: relative;
        top: -7px;
        clear: both;
        border: solid 1px #ddd;
        background-color: #fff;
        padding: 5px;
        transition: all .2s ease-in-out;
    }

    .list-thumbnail {
        margin-bottom: 5px;
        background-color: #fdfdfd;
    }

   
    label {
        display: inline-block;
    }

    .custom-control-label {
        width: 58px;
        color: #fff;
        font-size: 10px;
        padding-left: 0;
        background-color: #bbb;
        line-height: 19px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        height: 20px;
        position: relative;
        letter-spacing: .02em;
        margin-bottom: 0;
    }

    .custom-control {
        float: right;
        position: relative;
        display: block;
        min-height: 1.7rem;
        padding-left: 1.5rem;
    }

    .list-type-action {
        height: 20px;
        font-size: 10px;
        font-weight: 500;
        color: #565a5c;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 162px;
        height: 162px;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }

    .el-checkbox__label {
        font-size: 13px !important;
    }

    .el-form-item {
        margin-bottom: 0px !important;
    }
</style>