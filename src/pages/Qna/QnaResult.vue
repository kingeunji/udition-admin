<template>
    <div>
        <el-table ref="multiTable" :data="qnaList" v-loading="loading" style="width:100%">

            <el-table-column label="#" width="80" align="center">
                <template slot-scope="scope">
                    {{ scope.row.qnaNo }}
                </template>
            </el-table-column>

            <el-table-column label="제목" width="450" align="center">
                <template slot-scope="scope">
                <div>
                    <b v-on:click="qnaDetail(scope.row)">{{ scope.row.title }}</b>
                </div>
                </template>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                    <div style="padding: 30px;">
                        <el-button size="mini" @click="sortUp(scope.row)">위로</el-button>
                        <el-button size="mini" @click="sortDown(scope.row)">아래로</el-button>
                    </div>
                </span>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                <div style="padding: 30px;">
                    <el-button size="mini" @click="qnaDetailUpdate(scope.row)">수정</el-button>
                    <el-button size="mini" @click="deleteDialog(scope.row.qnaNo)">삭제</el-button>
                </div>
                </span>
            </el-table-column>

        </el-table>

        <div class="col-6" style="display: inline-block; float: right; text-align: right; margin-top:10px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item> 
                    <el-button size="small" type="primary" @click="dialogInsert=true">자주하는 질문 추가</el-button>
                </el-form-item>            
            </el-form>
        </div>

        <div style="text-align: center; margin-top: 50px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

        <el-dialog width="65%" :visible.sync="dialogVisible" title="자주하는 질문" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ qnaInfo.qnaNo }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ qnaInfo.title }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="textarea" v-model="qnaInfo.tts" autocomplete="off" rows="20" style="border: none;" readonly="readonly"></el-input>
                        <!-- {{ qnaInfo.tts }} -->
                    </div>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="알림" :visible.sync="dialogDelete" width="30%">
            <div class="detail_pannel">
                <span>
                    해당 게시글을 삭제하겠습니까? 
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogDelete = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="deleteQna">삭제</el-button>
            </span>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogInsert" title="자주하는 질문" >
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
                        <el-input type="textarea" v-model="tts" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                    <span>
                        <el-button @click="dialogInsert = false">취소</el-button>
                        <el-button type="primary" @click="qnaInsert" >보내기</el-button>
                    </span>
            </div>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogUpdate" title="자주하는 질문" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ qnaInfo.qnaNo }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="qnaInfo.title" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="textarea" v-model="qnaInfo.tts" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                <span>
                    <el-button @click="dialogUpdate = false">취소</el-button>
                    <el-button type="primary" @click="qnaUpdate" >수정하기</el-button>
                </span>
            </div>
        </el-dialog>



    </div>
</template>

<script>
import {qna} from '../../api/qna.js'

export default {
    data() {
        return {
            qnaList : [],
            loading : true,
            pagination : '',
            form : {
                requestPage : 0
            },
            dialogVisible : false,
            dialogDelete : false,
            dialogInsert : false,
            dialogUpdate : false,
            title : '',
            tts : '',
            keyValue : '',
            sortValue : '',
            targetKey : '',
            targetSort : '',
            qnaInfo : {
                qnaNo : '',
                title : '',
                tts : '',
                sortNo : ''
            }
            
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            qna.search(this.form)
                  .then(data => {
                      this.qnaList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
        },
        deleteDialog(qnaNo) {
            this.dialogDelete = true
            this.qnaNo = qnaNo
        },
        deleteQna() {
            qna.delete(this.qnaNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("자주하는 질문이 삭제되었습니다")
                          this.dialogDelete = false
                          this.fetchData()
                      }
                  })
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        qnaDetail(detail) {
            this.dialogVisible = true,
            this.qnaInfo.qnaNo = detail.qnaNo,
            this.qnaInfo.title = detail.title,
            this.qnaInfo.tts = detail.tts
        },
        qnaDetailUpdate(detail) {
            this.dialogUpdate = true,
            this.qnaInfo.qnaNo = detail.qnaNo,
            this.qnaInfo.title = detail.title,
            this.qnaInfo.tts = detail.tts
        },
        qnaInsert(){
            if(!this.title){
                this.$message("자주하는 질문 제목을 입력해주세요")
                return false
            }
            if(!this.tts){
                this.$message("자주하는 질문 내용을 입력해주세요")
                return false
            }
            let form = {
                title :  this.title,
                tts : this.tts
            }
            
            qna.insert(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("자주하는 짏문 등록이 완료되었습니다.")
                        this.dialogInsert = false
                        this.fetchData()
                    }
                })
        },
        sortUp : function(detail){
            var indexL = this.qnaList.findIndex(function(qna){
                return qna.qnaNo == detail.qnaNo;
            })

            if(indexL == "0"){
                this.$message("이전의 자주하는 질문이 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var preQnaNo = this.qnaList[indexPre].qnaNo;
            var preSortNo = this.qnaList[indexPre].sortNo;
            var nowQnaNo = this.qnaList[indexL].qnaNo;
            var nowSortNo = this.qnaList[indexL].sortNo;

            const form = new FormData();
            form.append("keyValue", nowQnaNo);
            form.append("sortValue", nowSortNo);
            form.append("targetKey", preQnaNo);
            form.append("targetSort", preSortNo);

            qna.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("자주하는 짏문의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.qnaList.findIndex(function(qna){
                return qna.qnaNo == detail.qnaNo;
            })
            if(indexL == this.qnaList.length-1){
                this.$message("이후의 자주하는 질문이 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var preQnaNo = this.qnaList[indexPre].qnaNo;
            var preSortNo = this.qnaList[indexPre].sortNo;
            var nowQnaNo = this.qnaList[indexL].qnaNo;
            var nowSortNo = this.qnaList[indexL].sortNo;

            const form = new FormData();
            form.append("keyValue", nowQnaNo);
            form.append("sortValue", nowSortNo);
            form.append("targetKey", preQnaNo);
            form.append("targetSort", preSortNo);

            qna.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("자주하는 질문의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })

        },
        qnaUpdate() {
            if(this.qnaInfo.title == null){
                this.$message("자주하는 질문 제목을 입력해주세요")
                return false
            }
            if(this.qnaInfo.tts == null){
                this.$message("자주하는 잘문 내용을 입력해주세요")
                return false
            }
            let form = {
                qnaNo : this.qnaInfo.qnaNo,
                title : this.qnaInfo.title,
                tts : this.qnaInfo.tts
            }

            qna.update(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("자주하는 질문 수정이 완료되었습니다.")
                        this.dialogUpdate = false
                        this.fetchData()
                    }
                })
            }
        }

    }

</script>

<style>
</style>