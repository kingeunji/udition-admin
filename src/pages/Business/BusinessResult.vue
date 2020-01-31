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
            <el-table ref="multiTable" :data="bizList" v-loading="loading" style="width:100%" @selection-change="handleSelectChange">
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

                <el-table-column label="회원 가입일"  width="120" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.createDate }} </div>
                    </template>
                </el-table-column>

                <el-table-column label="구독 현황"  width="120" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.modelType }} </div>
                    </template>
                </el-table-column>

                <el-table-column label="오디션 개설수"  width="120" align="center">
                    <template slot-scope="scope">
                        <div> {{ scope.row.auditionCnt }} 회</div>
                    </template>
                </el-table-column>

                <el-table-column align="center" >
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
            actionSelect : '',
            bizList : [],
            error : '',
            formData : {
                modelType : '',
                requestPage : 0,
                searchTts : ''
            },
            pagination : '',
            loading: true
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
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

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
</style>