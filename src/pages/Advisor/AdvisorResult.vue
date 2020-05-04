<template>
    <div>
        <el-table ref="multiTable" :data="advisorList" v-loading="loading" style="width:100%">

            <el-table-column label="#" width="80" align="center">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>

            <el-table-column label="제목" width="450" align="center">
                <template slot-scope="scope">
                <div>
                    <b v-on:click="advisorDetail(scope.row)">{{ scope.row.title }}</b>
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
                    <el-button size="mini" @click="advisorDetailUpdate(scope.row)">수정</el-button>
                    <el-button size="mini" @click="deleteDialog(scope.row.id)">삭제</el-button>
                </div>
                </span>
            </el-table-column>

        </el-table>

        <div class="col-6" style="display: inline-block; float: right; text-align: right; margin-top:10px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item> 
                    <el-button size="small" type="primary" @click="dialogInsert=true">어드바이저의 팁 추가</el-button>
                </el-form-item>            
            </el-form>
        </div>

        <div style="text-align: center; margin-top: 50px;">
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

        <el-dialog width="50%" :visible.sync="dialogVisible" title="어드바이저의 팁" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ advisorInfo.id }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ advisorInfo.title }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> url </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <a v-bind:href="advisorInfo.url" onclick="window.open(this.href, '_blank'); return false;"> {{ advisorInfo.url }} </a>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 이름 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ advisorInfo.advisor }}
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
                <el-button style="width: auto" type="primary" @click="deleteAdvisor">삭제</el-button>
            </span>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogInsert" title="어드바이저의 팁" >
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
                       <b> url </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="url" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 이름 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="advisor" autocomplete="off"></el-input>
                    </div>
                </div>
                    <div style="text-align:end;">
                        <el-button @click="dialogInsert = false">취소</el-button>
                        <el-button type="primary" @click="advisorInsert" >보내기</el-button>
                    </div>
            </div>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogUpdate" title="어드바이저의 팁" >
            <div class="detail_pannel">
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 번호 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        {{ advisorInfo.id }}
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 제목 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="advisorInfo.title" autocomplete="off"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 주소 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="advisorInfo.url" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                <div class="row loop-row">
                    <div class="col-9 col-lg-2">
                       <b> 이름 </b>
                    </div>
                    <div class="col-md-11 col-lg-9">
                        <el-input type="text" v-model="advisorInfo.advisor" autocomplete="off" rows="20"></el-input>
                    </div>
                </div>
                <div style="text-align:end;">
                    <el-button @click="dialogUpdate = false">취소</el-button>
                    <el-button type="primary" @click="advisorUpdate" >수정하기</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog width="65%" :visible.sync="dialogUrl" title="어드바이저의 팁" >
            <div class="detail_pannel">

            </div>
        </el-dialog>



    </div>
</template>

<script>
import {advisor} from '../../api/advisor.js'

export default {
    data() {
        return {
            advisorList : [],
            loading : true,
            pagination : '',
            form : {
                requestPage : 0, pageSize: 20
            },
            dialogVisible : false,
            dialogDelete : false,
            dialogInsert : false,
            dialogUpdate : false,
            dialogUrl : false,
            title : '',
            url : '',
            advisor : '',
            keyValue : '',
            sortValue : '',
            targetKey : '',
            targetSort : '',
            advisorInfo : {
                id : '',
                title : '',
                url : '',
                advisor: '',
                sortOrder : ''
            }
            
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            advisor.search(this.form)
                  .then(data => {
                      this.advisorList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
        },
        deleteDialog(id) {
            this.dialogDelete = true
            this.id = id
        },
        deleteAdvisor() {
            advisor.delete(this.id) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("어드바이저의 팁이 삭제되었습니다")
                          this.dialogDelete = false
                          this.fetchData()
                      }
                  })
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        advisorDetail(detail) {
            this.dialogVisible = true,
            this.advisorInfo.id = detail.id,
            this.advisorInfo.title = detail.title,
            this.advisorInfo.url = detail.url,
            this.advisorInfo.advisor = detail.advisor
        },
        advisorDetailUpdate(detail) {
            this.dialogUpdate = true,
            this.advisorInfo.id = detail.id,
            this.advisorInfo.title = detail.title,
            this.advisorInfo.url = detail.url,
            this.advisorInfo.advisor = detail.advisor
        },
        urlDetail(detail){
            this.dialogUrl = true,
            this.dialogUrl = detail.url

            window.open(detail.url);
        },
        openUrl : function(detail) {
            var openUrl = detail.url;

            window.open(openUrl, "", "width=65%;");
        },


        advisorInsert(){
            if(!this.title){
                this.$message("어드바이저의 팁 제목을 입력해주세요")
                return false
            }
            if(!this.url){
                this.$message("어드바이저의 팁 url을 입력해주세요")
                return false
            }
            if(!this.advisor){
                this.$message("어드바이저의 팁 이름을 입력해주세요")
                return false
            }
            let form = {
                title :  this.title,
                url : this.url,
                advisor :  this.advisor
            }
            
            advisor.insert(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("어드바이저의 팁 등록이 완료되었습니다.")
                        this.dialogInsert = false
                        this.fetchData()
                    }
                })
        },
        sortUp : function(detail){
            var indexL = this.advisorList.findIndex(function(advisor){
                return advisor.id == detail.id;
            })

            if(indexL == "0"){
                this.$message("이전의 어드바이저의 팁이 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var preid = this.advisorList[indexPre].id;
            var preSortOrder = this.advisorList[indexPre].sortOrder;
            var nowid = this.advisorList[indexL].id;
            var nowSortOrder = this.advisorList[indexL].sortOrder;

            const form = new FormData();
            form.append("keyValue", nowid);
            form.append("sortValue", nowSortOrder);
            form.append("targetKey", preid);
            form.append("targetSort", preSortOrder);

            advisor.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("어드바이저의 팁 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.advisorList.findIndex(function(advisor){
                return advisor.id == detail.id;
            })
            if(indexL == this.advisorList.length-1){
                this.$message("이후의 어드바이저의 팁이 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var preid = this.advisorList[indexPre].id;
            var preSortOrder = this.advisorList[indexPre].sortOrder;
            var nowid = this.advisorList[indexL].id;
            var nowSortOrder = this.advisorList[indexL].sortOrder;

            const form = new FormData();
            form.append("keyValue", nowid);
            form.append("sortValue", nowSortOrder);
            form.append("targetKey", preid);
            form.append("targetSort", preSortOrder);

            advisor.updateList(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("어드바이저의 팁 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })

        },
        advisorUpdate() {
            if(this.advisorInfo.title == null){
                this.$message("어드바이저의 팁 제목을 입력해주세요")
                return false
            }
            if(this.advisorInfo.url == null){
                this.$message("어드바이저의 팁 url을 입력해주세요")
                return false
            }
            if(this.advisorInfo.advisor == null){
                this.$message("어드바이저의 팁 이름을 입력해주세요")
                return false
            }
            let form = {
                id : this.advisorInfo.id,
                title : this.advisorInfo.title,
                url : this.advisorInfo.url,
                advisor : this.advisorInfo.advisor
            }

            advisor.update(form)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("어드바이저의 팁 수정이 완료되었습니다.")
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