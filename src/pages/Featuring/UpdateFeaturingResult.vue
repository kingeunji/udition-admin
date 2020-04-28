<template>
    <div class="sort-option2">

        <el-tabs v-model="activeName">
            <el-tab-pane :label="allLabel" name="all"></el-tab-pane>
            <el-tab-pane :label="singerLabel" name="prof_singer"></el-tab-pane>
            <el-tab-pane :label="actorLabel" name="prof_actor"></el-tab-pane>
            <el-tab-pane :label="dancerLabel" name="prof_dancer"></el-tab-pane>
            <el-tab-pane :label="musicianLabel" name="prof_musician"></el-tab-pane>
            <el-tab-pane :label="rapperLabel" name="prof_rapper"></el-tab-pane>
            <el-tab-pane :label="comedianLabel" name="prof_comedian"></el-tab-pane>
            <el-tab-pane :label="modelLabel" name="prof_model"></el-tab-pane>
            <el-tab-pane :label="announcerLabel" name="prof_announcer"></el-tab-pane>
            <el-tab-pane :label="otherLabel" name="prof_others"></el-tab-pane>
        </el-tabs>

        <div style="margin-bottom :20px;">
            <div class="col-6" style="display: inline-block; padding-right: 0px;">

                <span style="font-weight:600; font-size: 14px">전체 컬렉션 수 : {{ this.pagination.dbCount }} 개</span>
            </div>

            <div class="col-6" style="padding:0px; display:inline-block; float:right; text-align:right;">
                
            </div>
        </div>


        <el-table ref="multiTable" :data="featuringList" v-loading="loading" style="width:100%">

            <el-table-column label="순서" width="60" align="center">
                <template slot-scope="scope">
                    {{ scope.$index +1 }}
                </template>
            </el-table-column>

            <el-table-column label="이름" width="100" align="center">
                <template slot-scope="scope">
                <div>
                    {{ scope.row.stageName }}
                </div>
                </template>
            </el-table-column>

            <el-table-column label="사진" width="180" align="center">
                <template slot-scope="scope">
                <div>
                    <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + scope.row.image" style="width:162px; height:162px;" class="img-fluid">
                </div>
                </template>
            </el-table-column>

            <el-table-column label="기간" width="180" align="center">
                <template slot-scope="scope">
                <div>
                    {{ scope.row.term }}
                </div>
                </template>
            </el-table-column>

            <el-table-column label="프로필 완성도" width="120" align="center">
                <template slot-scope="scope">
                <div>
                    {{ scope.row.perfection }} %
                </div>
                </template>
            </el-table-column>

            <el-table-column label="순서변경" align="center">
                <span slot-scope="scope">
                    <div style="height: 80px">
                        <el-button size="mini" @click="sortUp(scope.row)">위로</el-button><br/><br/>
                        <el-button size="mini" @click="sortDown(scope.row)">아래로</el-button>
                    </div>
                </span>
            </el-table-column>

            <el-table-column align="center">
                <span slot-scope="scope">
                <div style="padding: 30px;">
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
            allLabel : '',
            singerLabel : '',
            actorLabel : '',
            dancerLabel : '',
            musicianLabel : '',
            rapperLabel : '',
            comedianLabel : '',
            modelLabel : '',
            announcerLabel : '',
            otherLabel : '',

            dialogDelete : false,
            activeName : 'all',
            allSelect : false,
            featuringList : [],

            cntList : {
                allCnt : 0,
                singerCnt : 0,
                actorCnt : 0,
                dancerCnt : 0,
                musicianCnt : 0,
                rapperCnt : 0,
                comedianCnt : 0,
                modelCnt : 0,
                announcerCnt : 0,
                otherCnt : 0,
            },

            keyValue : '',
            sortValue : '',
            targetKey : '',
            targetSort : '',
            featuringInfo :{
                featuringNo : '',
                uid : '',
                webUrl : '',
                stageName : '',
                image : '',
                perfection : '',
                code : '',
                sortOrder : '',
                term : '',
            },
            formData : {
                
            },
            pagination : '',
            loading : true,
            selectedProfile : [],
        }
    }, 
    created() {
        this.fetchData();
        this.featuringCount();
        // console.log(this.cntResult.allCnt);
        
    },
    mounted() {
        EventBus.$on("emitEvent", formData => {
            this.formData = formData;
            this.settingLocalData();
            this.fetchData();
        });
        this.featuringCount();
    },
    watch : {
        activeName : function() {
            // console.log(this.activeName)
            this.formData = {}
            this.formData.code = this.activeName
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            this.loading = true
            featuring.search(this.formData)
                      .then(data => {
                          this.featuringList = data.results
                          this.pagination = data.page
                          this.loading = false
                      })
                      .catch(err => {
                      this.error = err.data
                  })
            if(this.formData.code) {
                this.activeName = this.formData.code.toString()
            }
            this.allSelect = false
            this.selectedProfile = []
            this.formData.allFlag = 0
        },
        featuringCount(){
            featuring.sideCnt()
                     .then(data => {
                        //  this.loading = false
                         this.allLabel =  '전체(' + data.result.allCnt + ')'; 
                         this.singerLabel = '가수(' + data.result.singerCnt + ')';
                         this.actorLabel = '배우/연기자(' + data.result.actorCnt + ')';
                         this.dancerLabel = '댄서(' + data.result.dancerCnt + ')';
                         this.musicianLabel = '연주자(' + data.result.musicianCnt + ')';
                         this.rapperLabel = '래퍼(' + data.result.rapperCnt + ')';
                         this.comedianLabel = '개그맨(' + data.result.comedianCnt + ')';
                         this.modelLabel = '모델(' + data.result.modelCnt + ')';
                         this.announcerLabel = '아나운서(' + data.result.announcerCnt + ')';
                         this.otherLabel = '다른 재능(' + data.result.otherCnt + ')';

                        // this.cntResult = data.results

                        //  console.log(this.cntList.allCnt);
                     })
                     .catch(err => {
                         this.error = err.data
                     })
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        deleteDialog(featuringNo) {
            this.dialogDelete = true
            this.featuringNo = featuringNo
        },
        deleteFeaturing() {
            featuring.delete(this.featuringNo) 
                  .then(data => {
                      if(data.status.code == 0) {
                          this.$message("피처링이 삭제되었습니다")
                          this.dialogDelete = false
                          this.fetchData()
                      }
                  })
        },
        sortUp : function(detail){
            var indexL = this.featuringList.findIndex(function(featuring){
                return featuring.featuringNo == detail.featuringNo;
            })

            if(indexL == "0"){
                this.$message("이전의 피처링된 아티스트가 없습니다.")
                return false
            }

            var indexPre = indexL - 1;

            var preFeaturingNo = this.featuringList[indexPre].featuringNo;
            var preSortNo = this.featuringList[indexPre].sortOrder;
            var nowFeaturingNo = this.featuringList[indexL].featuringNo;
            var nowSortNo = this.featuringList[indexL].sortOrder;

            const formData = new FormData();
            formData.append("keyValue", nowFeaturingNo);
            formData.append("sortValue", nowSortNo);
            formData.append("targetKey", preFeaturingNo);
            formData.append("targetSort", preSortNo);

            featuring.updateSort(formData)
                .then(data => {
                    if(data.status.code == "0"){
                        this.$message("피처링된 아티스트의 순서를 변경하였습니다")
                        this.fetchData()
                    }
                })
        },
        sortDown: function(detail){
            var indexL = this.featuringList.findIndex(function(featuring){
                return featuring.featuringNo == detail.featuringNo;
            })
            if(indexL == this.featuringList.length-1){
                this.$message("이후의 피처링된 아티스트가 없습니다")
                return false
            }

            var indexPre = indexL + 1;

            var preFeaturingNo = this.featuringList[indexPre].featuringNo;
            var preSortNo = this.featuringList[indexPre].sortOrder;
            var nowFeaturingNo = this.featuringList[indexL].featuringNo;
            var nowSortNo = this.featuringList[indexL].sortOrder;

            const formData = new FormData();
            formData.append("keyValue", nowFeaturingNo);
            formData.append("sortValue", nowSortNo);
            formData.append("targetKey", preFeaturingNo);
            formData.append("targetSort", preSortNo);

            featuring.updateSort(formData)
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