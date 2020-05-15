<template>
  <div style="margin-top: 30px;">
    <el-table :data="bannerList" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column label="배너" width="200">
            <template slot-scope="scope">
                <div v-if="scope.row.isPaid == 1" id="paidCheck">Paid</div>
                <div v-if="bannerType != 'belt'">
                    <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + scope.row.image" class="img-fluid" />
                </div>
                <!-- <div style="text-align:center;"> <b> {{ scope.row.title }} </b> </div> -->
                <div style="text-align:center;">
                    <b><el-input type="textarea" autocomplete="off" rows="2" id="txtBorder" readonly="readonly" v-model="scope.row.title"></el-input></b>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="기간" width="140" align="center">
            <template slot-scope="scope">
                <div>
                    <b v-if="scope.row.isDelete == 0"> 대기중 </b>
                    <b v-else-if="scope.row.isDelete == 1"> Live Off </b>
                    <b v-else-if="scope.row.isDelete == 2" style="color:#50b0b1"> Live On </b>
                </div>
                <div>
                    <p> {{ scope.row.showStart }}  <br>
                    ~ {{ scope.row.showEnd }}</p>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="랜딩" width="240" align="center">
            <template slot-scope="scope">
                <div>
                    <b v-if="scope.row.kind == 1"> URL  </b>
                    <b v-else-if="scope.row.kind == 2"> 오디션  </b> 

                    <p v-if="scope.row.kind == 1"> {{ scope.row.execution}}  </p>
                    <p v-if="scope.row.kind == 2"> {{ scope.row.auditionName}}  </p>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="순서변경" width="120">
            <template slot-scope="scope">
                <div style="padding-left: 15px; padding-right: 15px; margin-bottom: 5px;">
                    <el-button size="mini" @click="sortUp(scope.row)">위로</el-button>
                </div>
                <div style="padding-left: 15px; padding-right: 15px;">
                    <el-button size="mini"  @click="sortDown(scope.row)">아래로</el-button>
                </div>
            </template>
        </el-table-column>

        <el-table-column width="120">
            <template slot-scope="scope">
                <div style="padding-left: 15px; padding-right: 15px;">
                    <el-button size="mini" type="danger" @click="deleteDialog(scope.row.pk)">삭제</el-button>
                </div>
            </template>
        </el-table-column>

    </el-table>

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

    <el-dialog title="알림" :visible.sync="dialogDelete" width="30%">
        <div class="detail_pannel">
            <span>
                해당 배너를 삭제하겠습니까? 
            </span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button style="width: auto" @click="dialogDelete = false">취소</el-button>
            <el-button style="width: auto" type="primary" @click="deleteBanner">삭제</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import { banner } from "@/api/banner";
import { EventBus } from '../../utils/event-bus'

export default {
  props: ["bannerType"],
  data() {
    return {
        bannerList: [],
        pagination : '',
        form: { requestPage : 0, pageSize: 10 },
        keyValue : '',
        sortValue : '',
        targetKey : '',
        targetSort : '',
        dialogDelete : false,
        dialogUpdate : false,
        bannerInfo :{
            pk: '',
            title: '',
            image: '',
            kind: this.bannerKind,
            execution: '',
            showStart: '',
            showEnd: '',
            isPaid: '',
            auditionName: '',
        },
        bannerKind: '',
    };
  },
  created() {
    this.fetchData();
    this.auditionOption2();
  },
  watch :{
      bannerType : function(data) {
          this.fetchData()
      }
  },
  mounted() {
        EventBus.$on("uploadForm", () => {
            this.fetchData()
        });
 },
  methods: {
    async fetchData() {
        const response = await banner.list(this.bannerType, this.form);
        this.bannerList = response.data.results;
        this.pagination = response.data.page;
        // console.log(response.data.results)
    },
    pageChange(val) {
        this.form.requestPage = (val-1)
        this.fetchData()
    },
    auditionOption2() {
        banner.auditionList(this.bannerType)
                .then(response => {
                    this.auditionOption = response.data.results;
                })
    },
    data : function() {
        return {
            auditionOption : []
        }
    },
    bannerDetailUpdate(detail) {
        this.dialogUpdate = true,
        this.bannerInfo.pk = detail.pk,
        this.bannerInfo.title = detail.title,
        this.bannerInfo.image = detail.image
        this.bannerKind = detail.kind,
        this.bannerInfo.execution = detail.execution,
        this.bannerInfo.showStart = detail.showStart,
        this.bannerInfo.showEnd = detail.showEnd,
        this.bannerInfo.isPaid = detail.isPaid,
        this.bannerInfo.auditionName = detail.auditionName
    },
    async fileUpload() {
            // 1. 파일 업로드 
            var formData = new FormData();
            formData.append("image", this.files[0]);
            const response = await file.upload(formData);
            this.form.image = response
            console.log(this.form.image);
        },
    deleteDialog(pk) {
        this.dialogDelete = true
        this.pk = pk
    },
    deleteBanner() {
        banner.delete(this.bannerType, this.pk)
                .then(response => {
                    if(response.data.status.code == "0") {
                        this.$message("배너가 삭제되었습니다")
                        this.dialogDelete = false
                        this.fetchData()
                    }
                })
    },

    sortUp : function(detail){
            var indexL = this.bannerList.findIndex(function(banner){
                return banner.pk == detail.pk;
            })

            if(indexL == "0"){
                this.$message.error("이전의 배너가 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var prepk = this.bannerList[indexPre].pk;
            var presortOrder = this.bannerList[indexPre].sortOrder;
            var nowpk = this.bannerList[indexL].pk;
            var nowsortOrder = this.bannerList[indexL].sortOrder;

            const form = new FormData();
            form.append("keyValue", nowpk);
            form.append("sortValue", nowsortOrder);
            form.append("targetKey", prepk);
            form.append("targetSort", presortOrder);

            banner.updateList(this.bannerType, form)
                .then(response => {
                    if(response.data.status.code == 0){
                        this.$message("배너의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.bannerList.findIndex(function(banner){
                return banner.pk == detail.pk;
            })
            if(indexL == this.bannerList.length-1){
                this.$message.error("이후의 배너가 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var prepk = this.bannerList[indexPre].pk;
            var presortOrder = this.bannerList[indexPre].sortOrder;
            var nowpk = this.bannerList[indexL].pk;
            var nowsortOrder = this.bannerList[indexL].sortOrder;

            const form = new FormData();
            form.append("keyValue", nowpk);
            form.append("sortValue", nowsortOrder);
            form.append("targetKey", prepk);
            form.append("targetSort", presortOrder);

            banner.updateList(this.bannerType, form)
                .then(response => {
                    if(response.data.status.code == 0){
                        this.$message("배너의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })

        },
  }
};
</script>

<style>
.el-button--danger {
    width: auto;
}

#paidCheck {
    background-color:#2d3039;
    color:#ffffff;
    position:absolute;
    padding: 0 5px;
    width: fit-content;
    font-size: 12px;
}

#txtBorder {
    border:none;
    text-align: center;
    resize: none;
    font-weight: bold;
}
</style>