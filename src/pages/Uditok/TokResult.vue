<template>
    <div>
        <el-table ref="multiTable" :data="tokList" v-loading="loading" style="width:100%">

            <el-table-column label="#" width="80" align="center">
                <template slot-scope="scope">
                    {{ scope.row.tokNo }}
                </template>
            </el-table-column>

            <el-table-column label="사용자이름" width="130" align="center">
                <template slot-scope="scope">
                <div>
                    <b>{{ scope.row.stageName }}</b>
                </div>
                </template>
            </el-table-column>

            <el-table-column label="카테고리" width="100" align="center">
                <template slot-scope="scope">
                <div>{{ scope.row.boardTts }}</div>
                </template>
            </el-table-column>

            <el-table-column label="내용" width="350" align="center">
                <template slot-scope="scope">
                <div>{{ scope.row.tts }}</div>
                </template>
            </el-table-column>

            <el-table-column label="박수 수" width="80" align="center">
                <template slot-scope="scope">
                <div>{{ scope.row.likeCnt }} 회</div>
                </template>
            </el-table-column>

            <el-table-column label="신고 수" width="80" align="center">
                <template slot-scope="scope">
                <div>{{ scope.row.reportCnt }} 회</div>
                </template>
            </el-table-column>

            <el-table-column align="center">
                <template slot-scope="scope">
                <div style="padding: 30px;">
                    <el-button size="mini" @click="deleteDialog(scope.row.tokNo)">삭제</el-button>
                </div>
                </template>
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




        <el-dialog
            title="알림"
            :visible.sync="dialogVisible"
            width="30%">
            <div class="detail_pannel">
                <span>
                    해당 유디톡을 삭제하겠습니까? 
                </span>
                
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogVisible = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="deleteTok">삭제</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {uditok} from '../../api/uditok'

export default {
    data() {
        return {
            tokList : {},
            loading : true,
            pagination : '',
            formData : {
                requestPage : 0
            },
            dialogVisible : false,
            tokNo : ''
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            uditok.search(this.formData)
                  .then(data => {
                      this.tokList = data.results
                      this.pagination = data.page
                      this.loading = false
                  })
        },
        deleteDialog(tokNo) {
            this.dialogVisible = true
            this.tokNo = tokNo
        },
        deleteTok() {
            uditok.delete(this.tokNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("유디톡이 삭제되었습니다")
                          this.dialogVisible = false
                          this.fetchData()
                      }
                  })
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
    }
};
</script>

<style>
</style>