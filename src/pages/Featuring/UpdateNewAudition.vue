<template>
    <div class="sort-option2">

        <div class="row" style="margin-bottom : 20px;">
            <div class="col-6" style="display: inline-block; padding-right :0px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-radio v-model="form.bizFilter" label="0" @change="changeFilter">모든 결과 선택</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="form.bizFilter" label="1" @change="changeFilter">스탠다드 기업</el-radio> </el-form-item>
                    <el-form-item> <el-radio v-model="form.bizFilter" label="2" @change="changeFilter">어드밴스 기업</el-radio> </el-form-item>    
                </el-form>
                
                <span style="font-weight:600; font-size: 13px">필터/검색 아티스트 결과 : {{ this.pagination.dbCount }} 개 </span>
            </div>
            <div class="col-6" style="padding :0px; display: inline-block; float: right; text-align: right; margin-top:-20px;">

                <div style="margin: 15px;">
                    <el-select v-model="form.pageSize" size="mini" style="width: 100px;" @change="changePageSize">
                        <el-option
                            v-for="item in pageSizeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                </div>       
            </div>
        </div>  


        <el-table ref="multiTable" :data="auditionList" v-loading="loading" style="width:100%">

            <el-table-column label="순서" width="50" align="center">
                <template slot-scope="scope">
                    {{ scope.$index +1 }}
                </template>
            </el-table-column>

            <el-table-column label="오디션 명" width="230" align="center">
                <template slot-scope="scope">
                <div>
                    <b> {{ scope.row.title }} </b>
                </div>
                </template>
            </el-table-column>

            <el-table-column label="기업 명" width="190" align="center">
                <template slot-scope="scope">
                <div>
                    <b> {{ scope.row.bizName }} </b>
                </div>
                </template>
            </el-table-column>

            <el-table-column label=" 피처링 기간" width="110" align="center">
                <template slot-scope="scope">
                <div>
                    {{ scope.row.term }}
                </div>
                </template>
            </el-table-column>

            <el-table-column label="지원자 수" width="100" align="center">
                <template slot-scope="scope">
                <div>
                    {{ scope.row.applyCnt }} 명
                </div>
                </template>
            </el-table-column>

            <el-table-column label="순서변경" align="center" width="110">
                <span slot-scope="scope">
                    <div style="height: 80px">
                        <el-button size="mini" @click="sortUp(scope.row)">위로</el-button><br/><br/>
                        <el-button size="mini" @click="sortDown(scope.row)">아래로</el-button>
                    </div>
                </span>
            </el-table-column>

            <el-table-column align="center" width="110">
                <span slot-scope="scope">
                <div>
                    <el-button size="mini" @click="deleteDialog(scope.row.featuringNo)">삭제</el-button>
                </div>
                </span>
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

        <el-dialog title="알림" :visible.sync="dialogDelete" width="30%">
            <div class="detail_pannel">
                <span>
                    해당 피처링을 삭제하겠습니까? 
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogDelete = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="deleteFeaturing">삭제</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
import { featuring } from '../../api/featuring.js'
import image from '../../assets/img/img_default_user@3x.png'
import { EventBus } from '../../utils/event-bus'

export default {
    data() {
        return {
            pageSizeOption : [{
                value : 40,
                label : '40개씩'
            },{
                value : 120,
                label : '120개씩'
            },{
                value : 240,
                label : '240개씩'
            }],

            dialogDelete : false,
            auditionList : [],

            keyValue : '',
            sortValue : '',
            targetKey : '',
            targetSort : '',
            form : { bizFilter : '0',  pageSize : 40, term : '', filterType : '2' },
            pagination : '',
            loading : true,
        }
    }, 
    created() {
        this.fetchData();
        
    },
    mounted() {
        EventBus.$on("emitEvent", formData => {
            this.formData = formData;
            this.settingLocalData();
            this.fetchData();
        });
    },
    methods : {
        fetchData() {
            this.loading = true
            featuring.auditionSearch(this.form)
                      .then(data => {
                          this.auditionList = data.results
                          this.pagination = data.page
                          this.loading = false
                      })
                      .catch(err => {
                      this.error = err.data
                  })
            this.allSelect = false
            this.selectedProfile = []
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        changePageSize(val) {
            this.form.pageSize = val
            this.fetchData()
        },
        changeFilter(val) {
            this.form.bizFilter = val
            this.fetchData()
        },
        deleteDialog(featuringNo) {
            this.dialogDelete = true
            this.featuringNo = featuringNo
        },
        deleteFeaturing() {
            featuring.auditionDelete(this.featuringNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("피처링이 삭제되었습니다")
                          this.dialogDelete = false
                          this.fetchData()
                      }
                  })
        },
        sortUp : function(detail){
            var indexL = this.auditionList.findIndex(function(featuring){
                return featuring.featuringNo == detail.featuringNo;
            })

            if(indexL == "0"){
                this.$message("이전의 피처링된 아티스트가 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var preFeaturingNo = this.auditionList[indexPre].featuringNo;
            var preSortNo = this.auditionList[indexPre].sortOrder;
            var nowFeaturingNo = this.auditionList[indexL].featuringNo;
            var nowSortNo = this.auditionList[indexL].sortOrder;

            const formData = new FormData();
            formData.append("keyValue", nowFeaturingNo);
            formData.append("sortValue", nowSortNo);
            formData.append("targetKey", preFeaturingNo);
            formData.append("targetSort", preSortNo);

            featuring.auditionUpdateSort(formData)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("피처링된 아티스트의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.auditionList.findIndex(function(featuring){
                return featuring.featuringNo == detail.featuringNo;
            })
            if(indexL == this.auditionList.length-1){
                this.$message("이후의 피처링된 아티스트가 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var preFeaturingNo = this.auditionList[indexPre].featuringNo;
            var preSortNo = this.auditionList[indexPre].sortOrder;
            var nowFeaturingNo = this.auditionList[indexL].featuringNo;
            var nowSortNo = this.auditionList[indexL].sortOrder;

            const formData = new FormData();
            formData.append("keyValue", nowFeaturingNo);
            formData.append("sortValue", nowSortNo);
            formData.append("targetKey", preFeaturingNo);
            formData.append("targetSort", preSortNo);

            featuring.auditionUpdateSort(formData)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("피처링된 아티스트의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })

        },
        
    }

}
</script>

<style>

    .sort-option2{
        width: 900px;
    }

    .featCateList {
        padding: 0;
    }

    .featCateList > li{
        display: inline-block;
        padding-right: 30px;
    };

</style>