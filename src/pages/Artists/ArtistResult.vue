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
                    <el-form-item style="display: block;"> <el-checkbox v-model="allSelect" label="1" @change="selectAll" >모든 결과 선택 </el-checkbox> </el-form-item>
                    
                    <el-form-item> 
                        <el-checkbox v-model="profileFlg" @change="profileFlgHandle">프로필 사진</el-checkbox>
                        <el-radio :disabled="!profileFlg" v-model="profileSelect" @change="changeFilter" label="1">등록</el-radio>
                        <el-radio :disabled="!profileFlg" v-model="profileSelect" @change="changeFilter" label="2">미등록</el-radio>
                    </el-form-item>

                    <div>
                        <el-checkbox v-model="perfectionFlg" @change="perfectionFlgHandle">완성도</el-checkbox>
                        <span v-if="perfectionFlg" style="font-size: 10px;">&nbsp;&nbsp; {{ perfection[0] }} % ~ {{ perfection[1] }} % </span>
                        <div v-if="perfectionFlg" class="row" style="margin-left: 5px;">
                            <div class="col-8">
                                <el-slider
                                        range
                                        @change="changePerfection"
                                        v-model="perfection"
                                        :step="5">
                                </el-slider>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                        
                    <el-form-item style="display : block;"> 
                        
                        
                    </el-form-item>
                    
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
                        <el-button size="small" type="primary" :disabled="!actionSelect" v-on:click="actionDialog">확인</el-button>
                    </el-form-item>            
                </el-form> 

                <div style="margin: 15px;">
                    <el-select v-model="form.pageSize" size="mini" style="width: 100px;" @change="changePageSize">
                        <el-option
                            v-for="item in pageSizeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                </div>       
            </div>
        </div>            

        <div class="list-group-gallery auditon-detail-list">
            <div class="row" v-loading="loading">
                
                
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
                    <div class="list-type-inner">
                        <div class="list-thumbnail">
                            <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + item.image" style="width:162px; height:162px;" class="img-fluid" @error="imageLoadOnError">
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
                :page-size="this.form.pageSize"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

        <el-dialog
            title="알림"
            :visible.sync="dialogVisible"
            width="40%">
            <div class="detail_pannel">
                <div v-if="!allSelect">
                    <span>
                        총  <b>{{ selectedProfile.length }}</b>명의 아티스트 티어를 변경하겠습니까?
                    </span>
                </div>
                <div v-else>
                    <div>
                        <span>
                            총  <b>{{ pagination.dbCount }}</b>명의 아티스트 티어를 변경하겠습니까?
                        </span>
                    </div>
                    <div style="margin-top: 15px;">
                        검색 조건 :  &nbsp;&nbsp;
                        <el-tag type="success" style="margin-right:5px;" v-if="profileSelect == '1'"> 프로필 등록</el-tag>
                        <el-tag type="success" style="margin-right:5px;" v-if="profileSelect == '2'"> 프로필 미등록</el-tag>
                        <el-tag v-if="perfectionFlg"> 
                            <span v-if="perfectionFlg == '1'">
                                완성도 {{ perfection[0] }} ~ {{ perfection[1]}}
                            </span>
                            
                        </el-tag>
                    </div>
                </div>
                
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogVisible = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="profileAction">변경</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { artist } from '../../api/artist.js'
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
            pageSizeOption : [{
                value : 40,
                label : '40개씩'
            },{
                value : 120,
                label : '120개씩'
            },{
                value : 240,
                label : '240개씩'
            }],
            selectedProfile : [],
            allSelect : false,
            pageSelect : false,
            perfectionFlg : false,
            perfection : [0, 40],
            profileFlg : false,
            profileSelect : false,
            perfectionSelect : "1",
            actionSelect : '',
            artistList : [],
            error : '',
            form : { filterType : 0, allFlag : 0, pageSize : 40 },
            pagination : '',
            localType : {
                filterType : '',
                memberTier : ''
            },
            loading: true,
            dialogVisible : false
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
            this.form = {}
            this.form.memberTier = this.activeName
            this.form.pageSize = 40
            this.localType.memberTier = this.activeName

            this.perfectionFlg = false
            this.profileFlg = false

            this.profileSelect = false
            this.perfection = [0, 40]
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            this.loading = true
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
            // form 값 초기화
            this.allSelect = false
            this.selectedProfile = []
            this.form.allFlag = 0
            
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
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
            } else {
                this.form.allFlag = 0
            }
            this.selectedProfile = selectedProfile
        },
        perfectionFlgHandle() {
            // 완성도 플래그 선택시 
            if(this.perfectionFlg) {
                
            } else {
                this.perfection = ''
                this.perfectionSelect = '1'

                this.form.minPerfection = 0
                this.form.maxPerfection = 0

                this.form.perfectionType = ''
                this.fetchData()
            }
        },
        profileFlgHandle() {
            // 이미지 플래그 선택시 
            if(this.profileFlg) {

                
            } else {
                this.form.filterType = ''
                this.profileSelect = ''
                this.fetchData()
            }
        },
        changePerfection(val) {
            this.form.minPerfection = val[0]
            this.form.maxPerfection = val[1]
            this.form.perfectionType = this.perfectionSelect
            this.fetchData()
        },
        changeFilter(val) {
            this.form.filterType = val
            this.fetchData()
        },
        changePageSize(val) {
            this.form.pageSize = val
            this.fetchData()
        },
        actionDialog() {
            console.log(this.form.allFlag + ", " + this.selectedProfile.length)
            if(this.allSelect == 0 && this.selectedProfile.length == 0 ) {
                this.$message("선택한 아티스트가 존재하지 않습니다!")
                return false
            }

            this.dialogVisible=true

        },
        profileAction() {
            this.form.webUrlList = this.selectedProfile
            if(this.actionSelect === 'Tier1') {
                this.form.updateMemberTier = 1
            } else if(this.actionSelect === 'Tier2') {
                this.form.updateMemberTier = 2
            } else if(this.actionSelect === 'Tier3') {
                this.form.updateMemberTier = 3
            } else if(this.actionSelect === 'TierB') {
                this.form.updateMemberTier = 4
            }

            artist.update(this.form)
                  .then(data => {
                      this.fetchData()
                      this.dialogVisible = false
                      this.$message("선택하신 아티스트의 티어를 설정하였습니다!")
                  })
                  .catch(err => {
                      this.error = err.data
                  })

        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .el-form-item__content {
        line-height: 25px !important;
        position: relative;
        font-size: 14px;
    }

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