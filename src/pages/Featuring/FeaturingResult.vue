<template>
    <div class="sort-option">
        <div class="search-wrap">
            <div class="search-inner">
                <el-radio v-model="form.keyCodes" label="all">전체</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_singer">가수</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_actor">배우</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_dancer">댄서</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_musician">연주자</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_rapper">래퍼</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_comedian">개그맨</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_model">모델</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_announcer">아나운서</el-radio>
                <el-radio v-model="form.keyCodes" label="prof_others">다른 재능</el-radio>

                <div class="block">
                    <span class="demonstration">기간 설정</span>
                    <el-date-picker v-model="rangeDate" type="daterange" 
                    :value-format="datepickerFormat"
                    :disabledDates="disableDate"
                    range-separator="~"
                    start-placeholder="Start date"
                    end-placeholder="End date">
                    </el-date-picker>
                </div>

                <div class="featuringButton">
                <el-row style="padding-top : 10px;">
                    <el-button type="primary" @click="addFeaturing">피처링 추가하기</el-button>
                </el-row>
                </div>

            </div>
        </div>        
        

        <div class="row" style="margin-bottom : 20px;">
            <div class="col-6" style="display: inline-block; padding-right :0px;">
                
                
                <span style="font-weight:600; font-size: 13px">필터/검색 아티스트 결과 : {{ this.pagination.dbCount }} 개 </span>
            </div>
            <div class="col-6" style="padding :0px; display: inline-block; float: right; text-align: right; margin-top:-20px;">

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
                
                
                <div class="col-3" v-for="item in this.noFeatArtistList" v-bind:key="item.uid">
                    <div class="list-type-action">
                        <div style="display:inline;">{{ item.perfection }} %</div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="selectedProfile" :value=item.uid :id=item.uid>
                            <label class="custom-control-label" :for=item.uid>
                                {{ item.stageName }}
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

    </div>
</template>

<script>
import { featuring } from '../../api/featuring.js'
import image from '../../assets/img/img_default_user@3x.png'
import { EventBus } from '../../utils/event-bus'

export default {
    data() {
        return {
            activeName : "0",
            datepickerFormat : 'yyyy-MM-dd',
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
            form : { filterType : 0, allFlag : 0, pageSize : 40, keyCodes : 'all', term : '' },
            pagination : '',
            localType : {
                filterType : '',
                memberTier : ''
            },
            loading: true,
            dialogVisible : false,
            rangeDate : [],
            uid : '',
            code : '',
            showStart : '',
            showEnd : ''
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
            featuring.noFeatList(this.form)
                  .then(data => {
                      this.noFeatArtistList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
                  .catch(err => {
                      this.error = err.data
                  })
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
            } else{
                this.form.webUrlList = this.selectedProfile
                if(this.actionSelect === 'mail'){
                    this.mailDialog = true
                } else if(this.actionSelect === 'push'){
                    this.pushDialog = true
                } else{
                    this.dialogVisible=true
                }
            }

        },
        addFeaturing() {
            console.log(this.rangeDate[0]);
            console.log(this.rangeDate[1]);
            if(!this.form.keyCodes){
                this.$message("피처링을 추가할 카테고리를 선택해주세요")
                return false
            }
            if(!this.selectedProfile){
                this.$message("피처링을 추가할 아티스트르를 선택해주세요")
                return false
            }
            if(this.rangeDate[0] < new Date()){
                this.$message("시작 날짜를 올바르게 선택해주세요")
                return false
            }
            if(!this.rangeDate[0]) {
                this.$message("피처링을 추가할 날짜를 선택해주세요")
                return false
            }
            if(!this.rangeDate[1]) {
                this.$message("피처링을 추가할 날짜를 선택해주세요")
                return false
            }

            let form = {
                uid : this.selectedProfile[0],
                code : this.form.keyCodes,
                showStart : new Date(this.rangeDate[0]),
                showEnd : new Date(this.rangeDate[1])
            }

            featuring.insert(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("아티스트 피처링 등록이 완료되었습니다.")
                        this.fetchData()
                    }
                })

        },
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .search-wrap {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 30px 0 40px;
    }

    .search-inner {
        padding: 30px;
    }

    .el-range-editor.el-input__inner{
        margin: 15px;
    }

    .featuringButton {
        float: right;
        margin-top: -60px;
    }    

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