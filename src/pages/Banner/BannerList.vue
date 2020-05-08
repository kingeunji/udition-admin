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
                <div style="text-align:center;"> <b> {{ scope.row.title }} </b> </div>
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
                <div style="padding-left: 15px; padding-right: 15px; margin-bottom: 5px;">
                    <el-button size="mini" @click="bannerDetailUpdate(scope.row)">수정</el-button>
                </div>
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

    <el-dialog width="65%" :visible.sync="dialogUpdate" title="배너" >
        <div class="banner-form">
            <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="1) 기간 설정" style="margin-top: 13px;">
                        <el-col :span="8">
                            <el-date-picker type="date" v-model="bannerInfo.showStart" style="width: 100%;" ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                        <el-col :span="8">
                            <el-date-picker type="date" v-model="bannerInfo.showEnd" style="width: 100%;" ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="2) 랜딩 설정" style="margin-top: 13px;">
                        <div class="row" style="margin-left: 5px;">
                            <el-col :span="4">
                                <el-radio v-model="bannerInfo.kind" label="2" :value="2" style="font-size: 13px;">오디션 랜딩 </el-radio>
                            </el-col>
                            <el-col :span="12">
                                <!-- <el-input :disabled="form.kind != 1"  placeholder="오디션을 선택해 주세요"></el-input> -->
                                <el-select v-model="bannerInfo.execution" :disabled="bannerInfo.kind != 2" placeholder="오디션을 선택해주세요" style="width:100%;">
                                    <el-option
                                        v-for="item in auditionOption"
                                        :key="item.auditionNo"
                                        :value="item.auditionNo"
                                        :label="item.title">
                                    </el-option>
                                </el-select>
                            </el-col>
                            
                        </div>
                        <div class="row" style="margin-left: 5px; margin-top: 5px;">
                            <el-col :span="4">
                                <el-radio v-model="bannerInfo.kind" label="1" :value="1" style="font-size: 13px;">URL 랜딩 </el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="bannerInfo.execution" :disabled="bannerInfo.kind != 1" placeholder="URL 주소 복붙"></el-input>
                            </el-col>
                        </div>
                    </el-form-item>

                    <div v-if ="bannerType != 'belt'">
                        <!-- <div v-if="bannerType != 'big'"> -->
                            <el-form-item label="3) 이미지 설정" style="margin-top: 13px;">
                                <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                            </el-form-item>
                        <!-- </div> -->

                        <!-- <div v-if="bannerType == 'big'">
                            <el-form-item label="3-1) 큰 이미지 설정" style="margin-top: 13px;">
                                <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                            </el-form-item>

                            <el-form-item label="3-2) 썸네일 설정" style="margin-top: 13px;">
                                <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                            </el-form-item>
                        </div> -->

                        <el-form-item label="4) 타이틀 설정" style="margin-top: 15px;">
                            <div class="row" style="margin-left: 5px;">
                                <el-input placeholder="배너 타이틀을 입력해 주세요" v-model="bannerInfo.title"></el-input>
                            </div>
                        </el-form-item>
                        

                        <el-form-item label="5) 유료 광고" style="margin-top: 13px;">
                            <div class="row" style="margin-left: 5px; margin-top: 5px;">
                                <el-checkbox v-model="bannerInfo.isPaid">광고주 광고일 경우 체크</el-checkbox>
                            </div>
                        </el-form-item>
                    </div>
                        
                    <div v-if="bannerType == 'belt'">
                        <el-form-item label="3) 내용 설정" style="margin-top: 15px;">
                            <div class="row" style="margin-left: 5px;">
                                <el-input placeholder="내용을 입력해 주세요" v-model="bannerInfo.title"></el-input>
                            </div>
                        </el-form-item>

                        <el-form-item label="4) 유료 광고" style="margin-top: 13px;">
                            <div class="row" style="margin-left: 5px; margin-top: 5px;">
                                <el-checkbox v-model="bannerInfo.isPaid">광고주 광고일 경우 체크</el-checkbox>
                            </div>
                        </el-form-item>
                    </div>
                    

                    <el-form-item style="text-align: right;">
                        <div style="display: inline-block; margin-left: 10px;">
                            <el-button type="primary" @click="bannerUpdate">수정</el-button>
                            <el-button @click="dialogUpdate = false">취소</el-button>
                        </div>
                    </el-form-item>
            </el-form>
        </div>
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
        isPaidCheck : '',
        bannerInfo :{
            pk: '',
            title: '',
            image: '',
            kind: '',
            execution: '',
            showStart: '',
            showEnd: '',
            isPaid: '',
            auditionName: '',
        }
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
        this.bannerInfo.kind = detail.kind,
        this.bannerInfo.execution = detail.execution,
        this.bannerInfo.showStart = detail.showStart,
        this.bannerInfo.showEnd = detail.showEnd,
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
    async bannerUpdate() {
        if(this.bannerType != 'belt') {
            if(!this.bannerInfo.showStart || !this.bannerInfo.showEnd) {
                this.$message.error("배너 기간 설정을 입력해 주세요!")
                return false
            }
            if(!this.bannerInfo.kind) {
                this.$message.error("배너 랜딩 설정은 필수입니다!")
                return false
            } else {
                if(!this.bannerInfo.execution) {
                    this.$message.error("배너 랜딩 설정은 필수입니다!")
                    return false
                }
            }
            if(!this.bannerInfo.image) {
                this.$message.error("배너 이미지를 업로드 해주세요!")
                return false
            }
            if(!this.bannerInfo.title) {
                this.$message.error("배너 타이틀을 입력해 주세요!")
                return false
            }
            let form={
                title : this.bannerInfo.title,
                image : this.bannerInfo.image,
                kind : this.bannerInfo.kind,
                execution : this.bannerInfo.execution,
                showStart : this.bannerInfo.showStart,
                showEnd : this.bannerInfo.showEnd,
                isPaid : this.bannerInfo.isPaid
            }

            await this.fileUpload();
                if(this.form.image) {
                    banner.update(this.bannerType, this.form)
                        .then(response => {
                        if(response.data.status.code == 0) {
                            alert("배너가 정상적으로 수정되었습니다.");
                            EventBus.$emit('uploadForm', true);
                            this.dialogUpdate = false
                        }
                    });
                } else {
                    this.$message.error("배너 이미지를 업로드 해주세요!")
                }
        } else if(this.bannerType == 'belt') {
            if(!this.bannerInfo.showStart || !this.bannerInfo.showEnd) {
                this.$message.error("배너 기간 설정을 입력해 주세요!")
                return false
            }
            if(!this.bannerInfo.kind) {
                this.$message.error("배너 랜딩 설정은 필수입니다!")
                return false
            } else {
                if(!this.bannerInfo.execution) {
                    this.$message.error("배너 랜딩 설정은 필수입니다!")
                    return false
                }
            }
            if(!this.bannerInfo.title) {
                this.$message.error("배너 내용을 입력해 주세요!")
                return false
            }
            let form={
                title : this.bannerInfo.title,
                kind : this.bannerInfo.kind,
                execution : this.bannerInfo.execution,
                showStart : this.bannerInfo.showStart,
                showEnd : this.bannerInfo.showEnd,
                isPaid : this.bannerInfo.isPaid
            }
            banner.update(this.bannerType, this.form)
                .then(response => {
                if(response.data.status.code == 0) {
                    alert("배너가 정상적으로 수정되었습니다.");
                    EventBus.$emit('uploadForm', true);
                    this.dialogUpdate = false
                }
            });
        }

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
</style>