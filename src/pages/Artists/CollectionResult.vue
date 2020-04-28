<template>
    <div class="sort-option">
        <el-tabs v-model="activeName">
            <el-tab-pane label="전체 컬렉션" name="0"></el-tab-pane>
            <el-tab-pane label="TierC 01" name="1"></el-tab-pane>
            <el-tab-pane label="TierC B" name="2"></el-tab-pane>
            <el-tab-pane label="기업고객의 View" name="3"></el-tab-pane>
        </el-tabs>

        <div class="row" style="margin-bottom :20px;">
            <div class="col-6" style="display: inline-block; padding-right: 0px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-checkbox v-model="allSelect" label="1" @change="selectAll">현재 페이지 선택</el-checkbox> </el-form-item>
                    <el-form-item> <el-checkbox v-model="likeSelect" label="1" @change="changeFilter">박수 1회의 컬렉션</el-checkbox> </el-form-item>

                </el-form>

                <span style="font-weight:600; font-size: 14px">전체 컬렉션 수 : {{ this.pagination.dbCount }} 개</span>
            </div>

            <div class="col-6" style="padding:0px; display:inline-block; float:right; text-align:right;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> 
                        <span style="margin-right:10px; font-size: 13px">체크한 컬렉션을 일괄</span>
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
                        <el-button size="small" type="primary" :disabled="!actionSelect" @click="collectionAction">확인</el-button>
                    </el-form-item>            
                </el-form>
            </div>
        </div>

        <!-- 컬렉션 리스트 -->
        <div class="list-group-gallery auditon-detail-list"> 
            <div class="row"  v-loading="loading">
                <div class="col-3" v-for="item in this.collectionList" v-bind:key="item.expNo">
                    <div class="list-type-action">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="selectedProfile" :value=item.expNo :id=item.expNo>
                            <label class="custom-control-label" :for=item.expNo>
                                {{ item.webUrl }}
                            </label>
                        </div>
                    </div>
                    <div class="list-type-inner" >
                        <div class="list-thumbnail" v-if="videoFileCheck(item.referencesItems[0])">
                            <youtube :video-id="videoFileCheck(item.referencesItems[0])" style="width:162px; height:162px;" class="img-fluid"> </youtube>
                        </div>
                        <div class="list-thumbnail" v-else>
                            <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + item.referencesItems[0]" style="width:162px; height:162px;" class="img-fluid">
                        </div>


                        <div class="list-profile-play">
                            <router-link :to='"/artists/"+ item.webUrl' tag="button" class="btn-profile-view"><a style="color: #606266" target="_blank">프로필 보기 </a></router-link>
                            <button type="button" class="btn-profile-play"> <i class="el-icon-caret-right"></i> </button>
                        </div>
                        <div class="clearfix"></div>
                    </div>    
                </div>

            </div>
        </div>

        <div style="text-align: center; margin-top: 15px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.form.requestPage + 1"
                :page-size="this.form.pageSize"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import { collection } from '../../api/collection.js'
import { getIdFromUrl } from 'vue-youtube'

export default {
    data() {
        return {
            allSelect : false,
            likeSelect :false,
            options : [{
                value : 'Tier1',
                label : 'Tier C 01 설정'
                
            }, {
                value : 'TierB',
                label : 'TierB 설정'
            }],
            actionSelect : '',
            collectionList : '',
            form : {
                pageSize : 40
            },
            localType : {
                memberTier : ''
            },
            pagination : '',
            activeName : "0",
            loading: true,
            selectedProfile : [],
        }
    }, 
    created() {
        this.fetchData()
    },
    watch : {
        activeName : function() {
            this.form = {}
            this.form.collectionTier = this.activeName
            this.form.pageSize = 40
            this.localType.collectionTier = this.activeName

            this.profileSelect = false
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            this.loading = true
            collection.list(this.form)
                      .then(data => {
                          this.collectionList = data.results
                          this.pagination = data.page  
                          this.loading = false
                      })
                      .catch(err => {
                          this.error = err.data
                      })
            if(this.form.collectionTier) {
                this.activeName = this.form.collectionTier.toString()
            }
                this.allSelect = false
                this.selectedProfile = []
                this.form.allFlag = 0
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        settingLocalData() {
            if(!this.localType.collectionTier) {
                this.form.collectionTier = this.localType.collectionTier
            }
        },
        videoFileCheck(fileName) {
            if(fileName.indexOf("https://youtu.be") == 0 || fileName.indexOf("http://youtu.be") == 0) {
                return getIdFromUrl(fileName)
            } else {
                return false
            }
        },
        selectAll(){
            var selectedProfile = []
            if(this.allSelect) {
                this.form.allFlag = 1
                this.collectionList.forEach(function(collection) {
                    selectedProfile.push(collection.expNo)
                })
            } else {
                this.form.allFlag = 0
            }
            this.selectedProfile = selectedProfile
        },
        changeFilter() {
            if(this.likeSelect) {
                this.form.filterType = 1
            } else {
                this.form.filterType = 0
            }
            this.fetchData()
        },
        collectionAction() {
            console.log(this.form.allFlag + ", " + this.selectedProfile.length)
            if(this.allSelect == 0 && this.selectedProfile.length == 0 ) {
                this.$message("선택한 컬렉션이 존재하지 않습니다!")
                return false
            } else{

                if(this.actionSelect === 'Tier1') {
                    this.form.expNoList = this.selectedProfile
                    this.form.isBizView = 1

                } else if(this.actionSelect === 'TierB') {
                    this.form.expNoList = this.selectedProfile
                    this.form.isBizView = 0
                }

                collection.update(form)
                          .then(data => {
                              if(data.status.code == "0") {
                                  this.fetchData()
                                  this.$message("선택하신 컬렉션의 티어가 선택되었습니다")
                              }
                          })
            }

            this.selectedProfile = []
            this.allSelect = false
        }
    }

}
</script>

<style>

</style>