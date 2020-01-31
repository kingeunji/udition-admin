<template>
    <div>
        <div class="sort-option"> 
            <div class="col-6" style="display: inline-block;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-checkbox v-model="allSelect" label="1" @change="handleCheckAllChange">모든 결과 선택</el-checkbox> </el-form-item>
                    <el-form-item> <el-radio v-model="formData.modelType" label="1">스탠다드 기업</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="formData.modelType" label="2">어드밴스 기업</el-radio> </el-form-item>    
                </el-form>
                
                <span style="font-weight:600">필터/검색 결과 기업 : {{ this.pagination.dbCount }} 개 </span>
            </div>
            <div class="col-6" style="display: inline-block; float: right; text-align: right;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> 
                        <span style="margin-right:10px;">체크한 기업에게 일괄</span>
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
                        <el-button size="small" type="primary">확인</el-button>
                    </el-form-item>            
                </el-form>
            </div>
        </div>

        <div class="option">
            <el-table ref="multiTable" :data="bizList" style="width:100%" v-loading="loading" @selection-change="handleSelectChange">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column label="기업 로고"  width="120">
                    <template slot-scope="scope">
                        <img :src="'http://35.243.93.121:8080/fileFolder/' + scope.row.logo"  class="img-fluid" @error="imageLoadOnError">
                    </template>
                </el-table-column>

                <el-table-column label="정보"  width="230">
                    <template slot-scope="scope">
                        <div> <b> {{ scope.row.bizName }} </b> </div>
                        <div> {{ scope.row.email }} </div>
                    </template>
                </el-table-column>

                <el-table-column label="회원 가입일"  width="140" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.createDate }} </div>
                    </template>
                </el-table-column>

                <el-table-column label="기업 정보 승인"  width="140" align="center">
                    <template slot-scope="scope">
                        <div> <span> <b> {{ scope.row.modelType }} </b> </span> </div>
                        <div v-if="scope.row.status == 0"> 
                            <span> 가입 대기 중 </span> 
                        </div>
                        <div style="margin-top:5px;">
                            <el-button size="mini" type="success" v-on:click="businessDetail(scope.row)">기업정보확인</el-button>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="1회 오디션" align="center" >
                    <div style="padding: 30px;">
                        <el-button size="mini">기업 상세</el-button>
                    </div>
                </el-table-column>
            </el-table> 
        </div>

        <div style="text-align: center; margin-top: 15px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogVisible" title="기업 정보 확인" >
            <div class="profile-header">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <div class="thumbnail mr-0 mr-md-2">
                                <el-image :src="'http://35.243.93.121:8080/fileFolder/' + detailInfo.logo"  class="img-fluid" @error="imageLoadOnError">
                                </el-image>
                            </div>
                        </div>
                        
                        <div class="col-md-8 col-lg-4 col-xl-5">
                            <div class="profile-information">
                                <div class="profile-name"> {{ detailInfo.bizName }}</div>
                                <div class="profile-memo">{{ detailInfo.simple }}</div>
                                <div class="profile-detail">{{ detailInfo.intro }}</div>
                            </div>
                        <div>

                        <div class="col-lg-5 col-xl-4 text-center text-md-right">
                            <div class="profile-btn-group-wrap">
                                <div class="profile-btn-group">
                                    
                                </div>
                            </div>
                        </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            

            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 사업자 등록 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ bizInfo.ein }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 가입 신청일 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ bizInfo.createDate }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                      <b>  담당자 성함 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ bizInfo.stageName }}
                    </div>
                </div>
                <div class="row loop-row" v-if="bizInfo.phoneInfo.length">
                    <div class="col-9 col-lg-2">
                       <b> 담당자 연락처 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <span v-for="item in bizInfo.phoneInfo" v-bind:key="item.phoneTts">
                            {{ item.phoneTts }}
                        </span> 
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 담당자 이메일 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ bizInfo.email }}
                    </div>                
                </div>           
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 사업자 등록증 </b>
                    </div>
                    <div class="col-md-11 col-lg-9" v-viewer>
                        <div class="images">
                            <image :src="'http://35.243.93.121:8080/legal/' + bizInfo.einFileName" style="width: 200px;"  class="img-fluid" />
                        </div>
                    </div>                
                </div>       
                         
            </div>
            
            

        </el-dialog>
    </div>
</template>

<script>
import {business} from '../../api/business.js'
import image from '../../assets/img/img_default_user@3x.png'


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
            allSelect : false,
            loading: true,
            actionSelect : '',
            bizList : [],
            error : '',
            formData : {
                modelType : '',
                requestPage : 0,
                searchTts : '',
                filterType : 1
            },
            pagination : '',
            dialogVisible : false,
            detailInfo : '',
            bizInfo : {
                ein : '',
                einFileName : '',
                phoneInfo : '',
                bizUrl : '',
                createDate : '',
                stageName : '',
                email : ''
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            business.search(this.formData)
                    .then(data => {
                        this.bizList = data.results
                        this.pagination = data.page
                        this.loading = false
                    })
                    .catch(err => {
                        this.error = err.data
                    })
        },
        handleSelectChange() {

        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        handleCheckAllChange() {
        },
        businessDetail(detail) {
            this.dialogVisible = true
            this.bizInfo.ein = detail.ein
            this.bizInfo.phoneInfo = detail.phoneInfos
            this.bizInfo.einFileName = detail.einFileName
            this.bizInfo.bizUrl = detail.bizUrl
            this.bizInfo.createDate = detail.createDate
            this.bizInfo.stageName = detail.stageName
            this.bizInfo.email = detail.email

            business.detail({ bizUrl : this.bizInfo.bizUrl })
                    .then(data => {
                        this.detailInfo = data.result
                    })
                    .catch(err => {
                        this.error = err.data
                    })

        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .profile-btn-group {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .loop-row {
        margin-bottom: 13px;
    }

    .detail_pannel {
        padding: 40px 32px;
        margin-top: 30px;
        margin-bottom: 30px;
        background-color: #fff;
        border: solid 1px #ccc;
        border-radius: 8px;
    }

    .profile-tab .tab-modern {
        position: relative;
        top: -1px;
        padding: 0 !important;
        margin: 0 !important;
        border-bottom: none;
    }
    
    .nav-tabs .nav-item {
        margin-bottom: -1px;
    }

    .profile-tab .tab-modern .tab-modern__nav-link {
        margin: 0 !important;
        padding: 17px 30px 15px;
        color: #565a5c;
        font-size: 20px;
        font-weight: 300;
        text-align: center;
        letter-spacing: -.025em;
        border: none;
        border-bottom: 6px solid #fff;
        border-radius: 0;
    }

    .profile-tab {
        background-color: #fff;
        border-top: solid 1px #d1d1d1;
        border-bottom: solid 1px #d1d1d1;
        box-shadow: 0 4px 3px rgba(0, 0, 0, 0.04);
        transition: 0.4s;
    }

    .profile-information {
        min-height: 100px;
    }

    .profile-header .audition-name, .profile-header .profile-name {
        color: #1f2125;
        font-size: 24px;
        font-weight: 500;
        margin: 5px 0 0;
    }

    .profile-header .profile-memo {
        margin: 0 0 10px;
        line-height: 20px;
    }

    .profile-detail {
        line-height: 20px;
    }

    .profile-header {
        padding: 10px 0;
        font-size: 14px;
        color: #3b3f44;
        background-color: #fff;
    }

    div {
        font-family: 'Noto Sans KR';
    }

    span {
        font-family: 'Noto Sans KR';
    }

    .col-6 {
        padding : 0px !important;
    }

    .el-form-item {
        margin-bottom: 0px;
    }

    .sort-option {
        margin-bottom: 20px;
    }

    .thumbnail {
        padding: 7px;
        border: solid 1px #ddd;
        background-color: #fff;
        -webkit-transition: all 150ms linear 0s;
        transition: all 150ms linear 0s;
    }
    
    .profile-tab {
        background-color: #fff;
        border-top: solid 1px #d1d1d1;
        border-bottom: solid 1px #d1d1d1;
        box-shadow: 0 4px 3px rgba(0, 0, 0, 0.04);
        transition: 0.4s;
    }
</style>