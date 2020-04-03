<template>
    <div class="sort-option">

        <div class="details-info-wrap">
            <!-- <h6 class="title" style="margin-bottom: 5px;"> {{ auditionDetail.title }} </h6>
            <p style="margin-bottom: 0px;"> {{ auditionDetail.term }} </p>
            <p style="margin-bottom: 0px;"> 지원자수 : {{ auditionDetail.applyCnt }}명 </p> -->
        </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="전체 지원자" name="0"></el-tab-pane>
            <el-tab-pane label="서류 통과자" name="1"></el-tab-pane>
            <el-tab-pane label="보류" name="2"></el-tab-pane>
            <el-tab-pane label="불합격" name="3"></el-tab-pane>
        </el-tabs>
       
        <div class="list-group-gallery auditon-detail-list">
            <div class="row" v-loading="loading">
                
                
                <div class="col-3" v-for="item in this.artistList" v-bind:key="item.uid">
                    <div class="list-type-action">
                        <div v-if="item.passed == 1" class="list-option-info" style="background-color: #50b0b1;
                                                             padding: 1px 5px 1px;
                                                             font-weight : 400;
                                                             color: #fff; float : left;">
                                    서류 통과
                        </div>
                        <div v-else-if="item.passed == 2" class="list-option-info" style="padding: 0.5px 5px 1px;
                                                                    color: #e73c3e;
                                                                    font-weight : 400;
                                                                    float : left;
                                                                    border: solid 1px;">
                                    보류
                        </div>
                        <div v-else-if="item.passed == 3" class="list-option-info" style="background-color: #e73c3e;
                                                                    padding: 1px 5px 1px;
                                                                    font-weight : 400;
                                                                    float : left;
                                                                    color: #fff;">
                                    불합격
                        </div>
                        <div class="custom-control custom-none">
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

            <div style="text-align: center; margin-top: 15px;">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    page-size="40"
                    :total="this.pagination.dbCount"
                    @current-change="pageChange"
                    @next-click="pageChange"
                    @prev-click="pageChange">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { apply } from '@/api/apply'
import image from '@/assets/img/img_default_user@3x.png'

export default {
    data() {
        return {
            activeName : "0",
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
            artistList : [],
            error : '',
            form : { auditionNo : this.$route.params.auditionNo,
                     passed : 0 },
            pagination : '',
            loading: true,
            auditionNo : ''
        }
    },
    created() {
        this.fetchData()
    },
    watch : {
        activeName : function() {
            this.form.passed = this.activeName
            this.loading = true
            this.fetchData()
        }
    },
    methods : {
        async fetchData() {
            const response = await apply.search(this.form);
            this.auditionDetail = response.data.results.auditionInfo
            this.artistList = response.data.results.applyList;
            this.pagination = response.data.page;
            this.loading = false;
            
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.loading = true
            this.form.requestPage = (val-1)
            this.fetchData()
        },
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .details-info-wrap {
        margin-top: 50px;
        position: relative;
        padding: 18px 28px;
        border: solid 1px #ddd;
        background-color: #fff;
        margin-bottom: 15px;
    }

    .custom-none {
        pointer-events: none!important;
        cursor: auto!important;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        color: #565a5c;
        margin: 0;
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