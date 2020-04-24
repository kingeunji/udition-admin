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
        <div class="list-group-gallery auditon-detail-list" v-if="!loading"> 
            <div class="row">
                <div class="col-3" v-for="item in this.collectionList" v-bind:key="item.expNo">
                    <div class="list-type-action">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="selectedProfile" :value=item.expNo :id=item.expNo>
                            <label class="custom-control-label" :for=item.expNo>
                                {{ item.webUrl }}
                            </label>
                        </div>
                    </div>
                    <div class="list-type-inner" v-loading="loading">
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
                :page-size=40
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
            formData : {
                
            },
            pagination : '',
            activeName : "0",
            loading : false,
            selectedProfile : [],
        }
    }, 
    created() {
        this.fetchData()
    },
    watch : {
        activeName : function() {
            this.formData.collectionTier = this.activeName
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            collection.list(this.formData)
                      .then(data => {
                          this.loading = false
                          this.collectionList = data.results
                          this.pagination = data.page  
                      })                                 
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
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
                this.collectionList.forEach(function(collection) {
                    selectedProfile.push(collection.expNo)
                })
            }

            this.selectedProfile = selectedProfile
        },
        changeFilter() {
            if(this.likeSelect) {
                this.formData.filterType = 1
            } else {
                this.formData.filterType = 0
            }
            this.fetchData()
        },
        collectionAction() {
            let form = {
                expNoList : [],
                isBizView : 0
            }
            if(this.actionSelect === 'Tier1') {
                form.expNoList = this.selectedProfile
                form.isBizView = 1

            } else if(this.actionSelect === 'TierB') {
                form.expNoList = this.selectedProfile
                form.isBizView = 0
            }

            collection.update(form)
                          .then(data => {
                              if(data.status.code == "0") {
                                  this.fetchData()
                                  this.$message("선택하신 컬렉션의 티어가 선택되었습니다")
                              }
                          })

            this.selectedProfile = []
            this.allSelect = false
        }
    }

}
</script>

<style>

</style>