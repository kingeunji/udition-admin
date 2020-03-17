<template>
    <div>
        <el-table ref="multiTable" :data="noticeList" v-loading="loading" style="width:100%">

            <el-table-column label="#" width="80" align="center">
                <template slot-scope="scope">
                    {{ scope.row.noticeNo }}
                </template>
            </el-table-column>

            <el-table-column label="제목" width="400" align="center">
                <template slot-scope="scope">
                <div>
                    <b v-on:click="noticeDetail(scope.row)">{{ scope.row.title }}</b>
                </div>
                </template>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                <div style="padding: 30px;">
                    <el-button size="mini">수정</el-button>
                    <el-button size="mini" @click="deleteDialog(scope.row.noticeNo)">삭제</el-button>
                </div>
                </span>
            </el-table-column>
        </el-table>

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
                        {{ noticeInfo.tts }}
                    </div>
                </div>
            </div>

        </el-dialog>
        <el-dialog
            title="알림"
            :visible.sync="dialogVisible2"
            width="30%">
            <div class="detail_pannel">
                <span>
                    해당 공지사항을 삭제하겠습니까? 
                </span>
                
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogVisible2 = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="deleteNotice">삭제</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
import {notice} from '../../api/notice'

export default {
    data() {
        return {
            noticeList : [],
            loading : true,
            pagination : '',
            formData : {
                requestPage : 0
            },
            dialogVisible : false,
            dialogVisible2 : false,
            innerVisivle : false,
            noticeInfo : {
                noticeNo : '',
                title : '',
                tts : ''
            }
            
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            notice.search(this.formData)
                  .then(data => {
                      this.noticeList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
        },
        deleteDialog(noticeNo) {
            this.dialogVisible2 = true
            this.noticeNo = noticeNo
        },
        deleteNotice() {
            notice.delete(this.noticeNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("공지사항이 삭제되었습니다")
                          this.dialogVisible = false
                          this.fetchData()
                      }
                  })
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        noticeDetail(detail) {
            this.dialogVisible = true,
            this.noticeInfo.noticeNo = detail.noticeNo,
            this.noticeInfo.title = detail.title,
            this.noticeInfo.tts = detail.tts
        }
    }
};
</script>

<style>
</style>