<template>
    <div>
        <div class="sort-option"> 
            <div class="col-6" style="display: inline-block;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-radio v-model="formData.modelType" label="0" @change="changeFilter">모든 기업</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="formData.modelType" label="1" @change="changeFilter">스탠다드 기업</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="formData.modelType" label="2" @change="changeFilter">어드밴스 기업</el-radio> </el-form-item>    
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
                        <el-button size="small" type="primary" :disabled="!actionSelect" v-on:click="actionDialog">확인</el-button>
                    </el-form-item>            
                </el-form>
            </div>
        </div>
        <div class="option">
            <el-table ref="multiTable" :data="bizList" v-loading="loading" style="width:100%"
                    @selection-change="handleSelectChange">
                <el-table-column type="selection" width="55">
                    <!-- <template slot-scope="scope"> -->
                        <!-- <el-checkbox v-model="selectedProfile" :value=scope.row.bizNo :id=scope.row.bizNo></el-checkbox> -->
                        <!-- <input type="checkbox" v-model="selectedProfile" :value=scope.row.bizNo :id=scope.row.bizNo> -->
                    <!-- </template> -->
                </el-table-column>

                <el-table-column label="기업 로고"  width="120">
                    <template slot-scope="scope">
                        <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + scope.row.logo"  class="img-fluid" @error="imageLoadOnError">
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
                    <template slot-scope="scope">
                        <div style="padding: 30px;">
                            <el-button size="mini" @click="businessDetail(scope.row.bizUrl)">기업 상세</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table> 
        </div>

        <div style="text-align: center; margin-top: 15px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.formData.requestPage + 1"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

        <el-dialog
            title="이메일 보내기"
            :visible.sync="mailDialog"
            width="40%">
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="title" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-10 col-lg-9">
                        <el-input type="textarea" v-model="content" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                    <span>
                        <el-button @click="mailDialog = false">취소</el-button>
                        <el-button type="primary" @click="mailSend" >보내기</el-button>
                    </span>
            </div>
        </el-dialog>


        <el-dialog
            title="푸시 보내기"
            :visible.sync="pushDialog"
            width="40%">
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="title" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-10 col-lg-9">
                        <el-input type="textarea" v-model="content" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                <span>
                    <el-button @click="pushDialog = false">취소</el-button>
                    <el-button type="primary" @click="pushSend" >보내기</el-button>
                </span>
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
            getRowKeys(row){
                return row.orderId;
            },
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
                modelType : '0',
                requestPage : 0,
                searchTts : '',
                allFlag : 0,
            },
            pagination : '',
            loading: true,
            selectedProfile : [],
            mailDialog : false,
            pushDialog : false,
            title : '',
            content : '',
            bizNoSelected : [],
            bizNoList : [],
            bizNo : '',
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
            this.allSelect = false
            this.selectedProfile = []
            this.formData.allFlag = 0
        },
        
        handleSelectChange(rows) {
            // console.log("nowBizNo: " + val[val.length-1].bizNo);
            // this.bizNoSelected.push(val[val.length-1].bizNo);
            // this.bizNoList = this.bizNoSelected;
            // console.log("bizList: " + this.bizNoList);
            
            this.multipleSelection = rows;
            this.select_order_number = this.multipleSelection.length;
            this.bizNoList = [];
            if(rows){
                rows.forEach(row =>{
                    if(row){
                    this.bizNoList.push(row.bizNo);
                }
                });
                
            }
            this.selectedProfile = this.bizNoList;
            console.log(this.bizNoList)
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        businessDetail(bizUrl) {
            let route = this.$router.resolve({path: '/business/'+ bizUrl});
            window.open(route.href, '_blank');
        },
        changeFilter(val){
            this.formData.modelType = val
            this.fetchData()
        },
        actionDialog() {
            console.log(this.formData.allFlag + ", " + this.selectedProfile.length)
            if(this.allSelect == 0 && this.selectedProfile == 0 ) {
                this.$message("선택한 기업이 존재하지 않습니다!")
                return false
            } else{
                this.formData.bizNoList = this.selectedProfile
                if(this.actionSelect === 'mail'){
                    this.mailDialog = true
                } else if(this.actionSelect === 'push'){
                    this.pushDialog = true
                }
            }
        },
        mailSend(){
            this.formData.bizNoList = this.selectedProfile
            if(!this.title){
                this.$message("메일 제목을 입력해주세요")
                return false
            }
            if(!this.content){
                this.$message("메일 내용을 입력해주세요")
                return false
            }
            this.formData.title = this.title
            this.formData.content = this.content
            
            business.mail(this.formData)
                  .then(data => {
                      this.fetchData()
                      this.mailDialog = false
                      this.$message("선택하신 기업에게 메일을 전송하였습니다!")
                  })
                  .catch(err =>{
                      this.error = err.data
                  })
        },
        pushSend(){
            this.formData.bizNoList = this.selectedProfile
            if(!this.title){
                this.$message("푸시 제목을 입력해주세요")
                return false
            }
            if(!this.content){
                this.$message("푸시 내용을 입력해주세요")
                return false
            }
            this.formData.title = this.title
            this.formData.content = this.content
            
            business.push(this.formData)
                  .then(data => {
                      this.fetchData()
                      this.pushDialog = false
                      this.$message("선택하신 기업에게 푸시를 전송하였습니다!")
                  })
                  .catch(err =>{
                      this.error = err.data
                  })
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