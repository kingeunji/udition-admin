<template>
    <div class="sort-option">

        <div class="row" style="margin-bottom : 20px;">
            <div class="col-6" style="display: inline-block; padding-right :0px;">

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-radio v-model="form.filterType" label="0" @change="changeFilter">모든 아티스트</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="form.filterType" label="1" @change="changeFilter">승인 대기 중인 아티스트</el-radio> </el-form-item>
                </el-form>
                
                <span style="font-weight:600; font-size: 13px">필터/검색 아티스트 결과 : {{ this.pagination.dbCount }} 개 </span>
            </div>
        </div>

        <div class="list-group-gallery auditon-detail-list" v-loading="loading">
            <div class="row" v-for="item in this.memberList" v-bind:key="item.uid" style="margin-bottom:20px;">

                <div class="col-3">
                    <div class="list-type-inner">
                        <div class="list-thumbnail">
                            <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + item.image" style="width:162px; height:162px;" class="img-fluid" @error="imageLoadOnError">
                        </div>
                    </div>
                </div>

                <div class="col-md-9">

                    <div class="row no-gutters mt-1">
                        <div class="col-9 col-lg-3">
                            <b>활동명</b>
                        </div>
                        <div class="col-lg-9">
                            {{ item.stageName }}
                        </div>
                    </div>

                    <div class="row no-gutters mt-1">
                        <div class="col-9 col-lg-3">
                            <b>현재 직급</b>
                        </div>
                        <div class="col-lg-9">

                            <div v-if="item.request == 0">
                                승인 대기중
                            </div>
                            <div v-if="item.isManager == 1">
                                메인 매니저
                            </div>
                            <div v-if="item.isManager == 2">
                                서브 매니저
                            </div>
                            <div v-if="item.isManager == 3">
                                회원 가입이 되어 있는 아티스트
                            </div>
                            <div v-if="item.isManager == 4">
                                회원 가입이 되어 있지 않은 아티스트
                            </div>
                        
                        </div>
                    </div>

                    <div class="row no-gutters mt-1" v-if="item.status == 0">
                        <div class="col-9 col-lg-3">
                            <b>변경 신청 직급</b>
                        </div>
                        <div class="col-lg-9">

                            <div v-if="item.requestRank == 1">
                                메인 매니저
                            </div>
                            <div v-if="item.requestRank == 2">
                                서브 매니저
                            </div>
                            <div v-if="item.requestRank == 3">
                                회원 가입이 되어 있는 아티스트
                            </div>
                            <div v-if="item.requestRank == 4">
                                회원 가입이 되어 있지 않은 아티스트
                            </div>
                        
                        </div>
                    </div>

                    <div v-if="item.status == 0" class="row mt-1 mt-md-4 mt-xl-4">
                    <div  class="col-md-11 text-md-right">

                        <el-tooltip placement="top" content="직급 변경 신청을 거절합니다.">
                            <el-button type="danger" @click="rejectDialog(item)">신청 거절</el-button>
                        </el-tooltip>

                        <el-tooltip placement="bottom" content="직급 변경 신청을 승인합니다.">
                            <el-button type="info" @click="updateRank(item.bizMemberNo)">신청 승인</el-button>
                        </el-tooltip>

                    </div>
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

        <el-dialog width="40%" title="거절 사유 메일 보내기" :visible.sync="dialogReject" append-to-body>
            <el-form>
                <el-form-item label="거절 사유 (추가 자료) :" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="rejectReason" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogReject = false">취소</el-button>
                <el-button type="primary" @click="rejectRank(memberInfo.bizMemberNo)" >보내기</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import image from '../../assets/img/img_default_user@3x.png'
import { business } from '../../api/business.js'

export default {
    props: ['detailInfo', 'bizNo'],
    data() {
        return {
            selectedProfile : [],
            profileSelect : false,
            actionSelect : '',
            memberList : [],
            form : { filterType : '0', bizNo : this.bizNo },
            pagination : '',
            loading: true,
            dialogReject : false,
            rejectReason : '',
            stageName : '',
            memberInfo : {
                bizMemberNo : '',
            }
        }
    },
    created() {
        this.fetchData()

    },
    methods : {
        fetchData() {
            console.log(this.bizNo)
            this.loading = true
            business.memberSearch(this.form)
                  .then(data => {
                      this.memberList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
                  .catch(err => {
                      this.error = err.data
                  })
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
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
        rejectDialog(detail){
            this.dialogReject = true,
            this.memberInfo.bizMemberNo = detail.bizMemberNo,
            this.memberInfo.bizNo = detail.bizNo
        },
        updateRank(bizMemberNo){
            let form = {
                bizMemberNo : bizMemberNo,
                status : 1
            }
            business.memberUpdate(form)
                    .then(data => {
                        if(data.status.code == "0"){
                            this.$message("해당 아티스트의 직급을 변경하였습니다.")
                            this.fetchData()
                        }
                    })
        },
        rejectRank(bizMemberNo){
            if(!this.rejectReason){
                this.$message("메일 내용을 입력해주세요")
                return false
            }
            let form = {
                bizMemberNo : bizMemberNo,
                status : 2,
                rejectReason : this.rejectReason
            }
            console.log(form)
            business.memberUpdate(form)
                    .then(data => {
                        if(data.status.code == "0"){
                            this.$message("해당 아티스트의 직급을 변경 신청을 거절했습니다.")
                            this.dialogReject = false;
                            this.fetchData()
                        }
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

    /* .el-form-item {
        margin-bottom: 0px !important;
    } */

</style>