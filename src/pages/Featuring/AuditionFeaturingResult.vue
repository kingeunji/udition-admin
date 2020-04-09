<template>
    <div class="sort-option">
        <div class="search-wrap">
            <div class="search-inner">
                <el-radio v-model="form.featuringType" label="specialAud">눈여겨볼 오디션</el-radio>
                <el-radio v-model="form.featuringType" label="newAud">새로운 오디션</el-radio>

                <div class="block">
                    <span class="demonstration">기간 설정</span>
                    <el-date-picker v-model="rangeDate" type="daterange" 
                    :value-format="datepickerFormat"
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
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-radio v-model="form.bizFilter" label="0" @change="changeFilter">모든 결과 선택</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="form.bizFilter" label="1" @change="changeFilter">스탠다드 기업</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="form.bizFilter" label="2" @change="changeFilter">어드밴스 기업</el-radio> </el-form-item>    
                </el-form>
                
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

        <div class="option">
            <el-table ref="multiTable" :data="noFeatAuditionList" v-loading="loading" style="width:100%; padding-left:20px;" @selection-change="handleSelectChange">
                <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column label=""  width="25">
                    <template slot-scope="scope" >
                    <el-radio v-model="form.auditionSelected" :label="scope.row.auditionNo" ></el-radio>
                    </template>
                    <!-- <template slot-scope="scope">
                        <div style="padding-left:15px;"><input type="radio" :id="scope.row.auditionNo" name="auditionSelected"/></div>
                    </template> -->
                </el-table-column>

                <el-table-column label="오디션 명"  width="300" align="center">
                    <template slot-scope="scope">
                        <div> <b>{{ scope.row.title }}</b> </div>
                    </template>
                </el-table-column>

                <el-table-column label="기업 명"  width="200" align="center">
                    <template slot-scope="scope">
                        <div> <b> {{ scope.row.bizName }} </b> </div>
                    </template>
                </el-table-column>

                <el-table-column label="기간"  width="110" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.term }} </div>
                    </template>
                </el-table-column>

                <el-table-column label="지원자 수"  width="110" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.applyCnt }} 명</div>
                    </template>
                </el-table-column>
            </el-table> 
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

export default {
    data() {
        return {
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
            profileFlg : false,
            profileSelect : false,
            actionSelect : '',
            noFeatAuditionList : [],
            error : '',
            form : { bizFilter : '0', allFlag : 0, pageSize : 40, term : '', auditionSelected: '' },
            pagination : '',
            localType : {
                bizFilter : 0,
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
    watch : {
        activeName : function() {
            this.form = {}
            this.form.pageSize = 40

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
            featuring.noFeatAuditionList(this.form)
                  .then(data => {
                      this.noFeatAuditionList = data.results
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
        handleSelectChange(rows) {
            this.multipleSelection = rows;
            this.auditionNoList = '';
            if(rows){
                rows.forEach(row =>{
                    if(row){
                    this.auditionNoList.push(row.auditionNo);
                }
                });
            }
            this.selectedProfile = this.auditionNoList;
            console.log(this.auditionNoList)
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        settingLocalData() {
            if(!this.localType.bizFilter) {
                this.form.bizFilter = this.localType.bizFilter
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
        profileFlgHandle() {
            // 이미지 플래그 선택시 
            if(this.profileFlg) {

                
            } else {
                this.profileSelect = ''
                this.fetchData()
            }
        },
        changeFilter(val) {
            this.form.bizFilter = val
            this.fetchData()
        },
        changePageSize(val) {
            this.form.pageSize = val
            this.fetchData()
        },
        addFeaturing() {
            console.log(this.rangeDate[0]);
            console.log(this.rangeDate[1]);
            console.log(this.form.auditionSelected);
            console.log(this.form.featuringType);
            if(!this.form.featuringType){
                this.$message("피처링을 추가할 카테고리를 선택해주세요")
                return false
            }
            if(!this.form.auditionSelected){
                this.$message("피처링을 추가할 오디션을 선택해주세요")
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
                auditionNo : this.form.auditionSelected,
                featuringType : this.form.featuringType,
                showStart : new Date(this.rangeDate[0]),
                showEnd : new Date(this.rangeDate[1])
            }

            featuring.auditionInsert(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("오디션 피처링 등록이 완료되었습니다.")
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