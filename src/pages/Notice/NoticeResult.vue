<template>
    <div>
        <el-table ref="multiTable" :data="noticeList" v-loading="loading" style="width:100%">

            <el-table-column label="#" width="80" align="center">
                <template slot-scope="scope">
                    {{ scope.row.noticeNo }}
                </template>
            </el-table-column>

            <el-table-column label="제목" width="450" align="center">
                <template slot-scope="scope">
                <div>
                    <b v-on:click="noticeDetail(scope.row)">{{ scope.row.title }}</b>
                </div>
                </template>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                    <div style="padding: 25px;">
                        <el-button size="mini" @click="sortUp(scope.row)">위로</el-button>
                        <el-button size="mini" @click="sortDown(scope.row)">아래로</el-button>
                    </div>
                </span>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                <div style="padding: 25px;">
                    <el-button size="mini" @click="noticeDetailUpdate(scope.row)">수정</el-button>
                    <el-button size="mini" @click="deleteDialog(scope.row.noticeNo)">삭제</el-button>
                </div>
                </span>
            </el-table-column>

        </el-table>

        <div class="col-6" style="display: inline-block; float: right; text-align: right; margin-top:10px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item> 
                    <el-button size="small" type="primary" @click="dialogInsert=true">공지 추가</el-button>
                </el-form-item>            
            </el-form>
        </div>

        <div style="text-align: center; margin-top: 50px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="this.pagination.dbCount"
                :page-size="this.form.pageSize"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

        <el-dialog width="65%" :visible.sync="dialogVisible" title="공지사항" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ noticeInfo.noticeNo }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ noticeInfo.title }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="textarea" v-model="noticeInfo.tts" autocomplete="off" rows="20" style="border: none;" readonly="readonly"></el-input>
                        <!-- {{ noticeInfo.tts }} -->
                    </div>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="알림" :visible.sync="dialogDelete" width="30%">
            <div class="detail_pannel">
                <span>
                    해당 공지사항을 삭제하겠습니까? 
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogDelete = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="deleteNotice">삭제</el-button>
            </span>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogInsert" title="공지사항" >
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
                <div style="text-align:end;">
                    <el-button @click="dialogInsert = false">취소</el-button>
                    <el-button type="primary" @click="noticeInsert" >보내기</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogUpdate" title="공지사항" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ noticeInfo.noticeNo }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="noticeInfo.title" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 내용 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="textarea" v-model="noticeInfo.tts" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                <div style="text-align:end;">
                    <el-button @click="dialogUpdate = false">취소</el-button>
                    <el-button type="primary" @click="noticeUpdate" >수정하기</el-button>
                </div>
            </div>
        </el-dialog>



    </div>
</template>

<script>
import {notice} from '../../api/notice.js'

export default {
    data() {
        return {
            noticeList : [],
            loading : true,
            pagination : '',
            form : {
                requestPage : 0, pageSize: 10
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
            noticeInfo : {
                noticeNo : '',
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
            notice.search(this.form)
                  .then(data => {
                      this.noticeList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
        },
        deleteDialog(noticeNo) {
            this.dialogDelete = true
            this.noticeNo = noticeNo
        },
        deleteNotice() {
            notice.delete(this.noticeNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("공지사항이 삭제되었습니다")
                          this.dialogDelete = false
                          this.fetchData()
                      }
                  })
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        noticeDetail(detail) {
            this.dialogVisible = true,
            this.noticeInfo.noticeNo = detail.noticeNo,
            this.noticeInfo.title = detail.title,
            this.noticeInfo.tts = detail.tts
        },
        noticeDetailUpdate(detail) {
            this.dialogUpdate = true,
            this.noticeInfo.noticeNo = detail.noticeNo,
            this.noticeInfo.title = detail.title,
            this.noticeInfo.tts = detail.tts
        },
        noticeInsert(){
            if(!this.title){
                this.$message("공지사항 제목을 입력해주세요")
                return false
            }
            if(!this.tts){
                this.$message("공지사항 내용을 입력해주세요")
                return false
            }
            let form = {
                title :  this.title,
                tts : this.tts
            }
            
            notice.insert(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("공지사항 등록이 완료되었습니다.")
                        this.dialogInsert = false
                        this.fetchData()
                    }
                })
        },
        sortUp : function(detail){
            var indexL = this.noticeList.findIndex(function(notice){
                return notice.noticeNo == detail.noticeNo;
            })

            if(indexL == "0"){
                this.$message("이전의 공지사항이 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var preNoticeNo = this.noticeList[indexPre].noticeNo;
            var preSortNo = this.noticeList[indexPre].sortNo;
            var nowNoticeNo = this.noticeList[indexL].noticeNo;
            var nowSortNo = this.noticeList[indexL].sortNo;

            const form = new FormData();
            form.append("keyValue", nowNoticeNo);
            form.append("sortValue", nowSortNo);
            form.append("targetKey", preNoticeNo);
            form.append("targetSort", preSortNo);

            notice.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("공지사항의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.noticeList.findIndex(function(notice){
                return notice.noticeNo == detail.noticeNo;
            })
            if(indexL == this.noticeList.length-1){
                this.$message("이후의 공지사항이 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var preNoticeNo = this.noticeList[indexPre].noticeNo;
            var preSortNo = this.noticeList[indexPre].sortNo;
            var nowNoticeNo = this.noticeList[indexL].noticeNo;
            var nowSortNo = this.noticeList[indexL].sortNo;

            const form = new FormData();
            form.append("keyValue", nowNoticeNo);
            form.append("sortValue", nowSortNo);
            form.append("targetKey", preNoticeNo);
            form.append("targetSort", preSortNo);

            notice.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("공지사항의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })

        },
        noticeUpdate() {
            if(this.noticeInfo.title == null){
                this.$message("공지사항 제목을 입력해주세요")
                return false
            }
            if(this.noticeInfo.tts == null){
                this.$message("공지사항 내용을 입력해주세요")
                return false
            }
            let form = {
                noticeNo : this.noticeInfo.noticeNo,
                title : this.noticeInfo.title,
                tts : this.noticeInfo.tts
            }

            notice.update(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("공지사항 수정이 완료되었습니다.")
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