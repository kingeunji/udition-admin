<template>
    <div>
        <div class="sort-option">
            <div style="font-size: 12px;">
                <span class="text-danger">*</span> 운영 담당자님은 무통장 입금 확인 시, 결제 요청일과 입금 마감일을 꼼꼼하게 확인 후 [입금확인함] 버튼을 누르면, 해당 기업에게 티켓이 바로 지급됩니다. <br>
                &nbsp;&nbsp; 입금 마감일 이후에도 입금이 확인되지 않을시에는 해당 기업에게 전화를 하고, 진행의사 여부를 판단 후 [메일:거부사유]를 작성합니다.
            </div>
            <div class="col-6" style="display: inline-block; margin-top:20px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-radio v-model="formData.isPaid" label="0" @change="changeFilter">전체 결제 내역</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="formData.isPaid" label="1" @change="changeFilter">입금 확인 필요: 무통장</el-radio> </el-form-item>
                </el-form>

                <span style="font-weight:600; font-size:14px;">필터/검색 결과 기업 : {{ this.pagination.dbCount }} 개 </span>
            </div>

            <div class="col-6" style="display: inline-block; float: right; text-align: right; margin-top:20px;">
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

            <div class="option" v-if="dbload=true">
                <el-table ref="multiTable" :data="billingList" v-loading="loading" style="width:100%"
                    @selection-change="handleSelectChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>

                    <el-table-column label="기업 정보"  width="150" align="center">
                        <template slot-scope="scope">
                            <div><b>{{ scope.row.bizName }}</b></div>
                        </template>
                    </el-table-column>

                    <el-table-column label="결제 항목" width="210" align="center">
                        <template slot-scope="scope">
                            <div><b>{{ scope.row.itemName }}</b><br/> {{ scope.row.billingMethod }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="결제 요청일" width="130" align="center">
                        <!-- <template slot-scope="scope"> -->
                            <div> </div>
                        <!-- </template> -->
                    </el-table-column>

                    <el-table-column label=" 입금 마감일" width="130" align="center">
                        <!-- <template slot-scope="scope"> -->
                            <div> </div>
                        <!-- </template> -->
                    </el-table-column>

                    <el-table-column label="입금 확인" width="130" align="center">
                        <div><a href="https://pgims.ksnet.co.kr/pg_inc/login/login.jsp"> KSP URL </a></div>
                    </el-table-column>

                    <el-table-column label="승인" align="center">
                        <template slot-scope="scope">
                            <div style="height: 80px">
                                <el-button size="mini" type="danger" @click="checkDialog(scope.row)">입금 확인함</el-button><br/><br/>
                                <el-button size="mini" @click="mailDialogOpen(scope.row)">메일: 거부 사유</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

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

                <el-dialog title="알림" :visible.sync="dialogCheck" width="30%">
                    <div class="detail_pannel">
                        <span>
                            해당 기업의 입금을 확인하시겠습니까?
                        </span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="width: auto" @click="dialogCheck = false">취소</el-button>
                        <el-button style="width: auto" type="primary" @click="payCheck">확인</el-button>
                    </span>
                </el-dialog>

                <el-dialog
                    title="이메일 보내기"
                    :visible.sync="rejectDialog"
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
                                <el-button @click="rejectDialog = false">취소</el-button>
                                <el-button type="primary" @click="rejectCheck" >보내기</el-button>
                            </span>
                    </div>
                </el-dialog>

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

        </div>
    </div>
</template>

<script>
import {business} from '../../api/business.js'

export default {
    data() {
        return {
            allSelect : false,
            actionSelect : '',
            options : [{
                value : 'mail',
                label : '이메일 보내기'
                
            }, {
                value : 'push',
                label : '푸시 보내기'
            }],
            billingList : [],
            pagination : '',
            loading : true,
            formData : {
                requestPage : 0,
                pageSize : 10,
                filterType : 0,
                orderType : 0,
                isPaid : '0',
                
            },
            dbload : false,
            selectedProfile : [],
            mailDialog : false,
            pushDialog : false,
            dialogCheck : false,
            rejectDialog : false,
            title : '',
            content : '',
            bizUrlList : [],
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            business.billingSearch(this.formData) 
                    .then(data => {
                        this.billingList = data.results
                        this.pagination = data.page
                        this.dbload = true
                        this.loading = false
                    })
        },
        handleSelectChange(rows) {            
            this.multipleSelection = rows;
            this.select_order_number = this.multipleSelection.length;
            this.bizUrlList = [];
            if(rows){
                rows.forEach(row =>{
                    if(row){
                    this.bizUrlList.push(row.bizUrl);
                }
                });
                
            }
            this.selectedProfile = this.bizUrlList;
            console.log(this.bizUrlList)
        },
        changeFilter(val){
            this.formData.isPaid = val
            console.log(this.formData.isPaid)
            this.fetchData()
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        actionDialog() {
            console.log(this.selectedProfile.length)
            if(this.selectedProfile == 0 ) {
                this.$message("선택한 기업이 존재하지 않습니다!")
                return false
            } else{
                this.formData.bizUrlList = this.selectedProfile
                if(this.actionSelect === 'mail'){
                    this.mailDialog = true
                } else if(this.actionSelect === 'push'){
                    this.pushDialog = true
                }
            }
        },
        mailDialogOpen(detail){
            this.rejectDialog = true
            this.formData.bizUrl = detail.bizUrl
            console.log(detail.bizUrl)
        },
        rejectCheck(){
            console.log(this.formData.bizUrl)
            this.formData.bizUrl = this.selectedProfile
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

            this.formData2.bizUrl = this.selectedProfile
            this.formData2.isPaid = 2
            business.billingUpdate(this.formData2)
                    .then(data => {
                        this.fetchData()
                    })
                    .catch(err =>{
                        this.error = err.data
                    })
            
            
            business.mail(this.formData)
                  .then(data => {
                      this.fetchData()
                      this.rejectDialog = false
                      this.$message("선택하신 기업에게 메일을 전송하고, 입금 확인을 거부하였습니다.")
                  })
                  .catch(err =>{
                      this.error = err.data
                  })
        },
        mailSend(){
            console.log(this.formData.bizUrlList)
            this.formData.bizUrlList = this.selectedProfile
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
            this.formData.bizUrlList = this.selectedProfile
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
        },
        checkDialog(detail){
            this.dialogCheck = true,
            this.billingNo = detail.billingNo,
            this.isPaid = 1
        },
        payCheck(){
            let form = {
                billingNo : this.billingNo,
                isPaid : this.isPaid
            }
            business.billingUpdate(form)
                    .then(data => {
                        if(data.status.code == 0){
                            this.$message("입금 확인이 완료 되었습니다.")
                            this.dialogCheck = false
                            this.fetchData()
                        }
                    })
        }

    }
}
</script>

<style>
    .text-danger {
        color: tomato;
    }

</style>