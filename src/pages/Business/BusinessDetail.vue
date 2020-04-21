<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <card class="card-user">
                <div class="image" style="text-align:center; border-radius: 0px; height: auto; width: auto;">
                    <div v-if="loading">
                        <el-image :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.logo" alt="..."> </el-image>
                    </div>
                </div>

                <div>
                    <div class="author" style="margin-top: -120px;">
                        <div class="avatar" alt="..."> </div>
                        <h4 class="title">{{ detailInfo.bizName }}
                        <br>
                        <small>@{{ detailInfo.bizUrl }}</small>
                        </h4>
                    </div>

                    <p class="description text-center">
                        {{ detailInfo.simple }}
                    </p>
                </div>
                <hr>

                <div class="text-center">
                    <div class="row">
                        <div class="col-lg-3 offset-lg-1">
                            <h5> {{ detailInfo.viewCnt}}  <br>
                            <small>조회수</small>
                            </h5>
                        </div>
                        <div class="col-lg-4">
                            <h5>{{ detailInfo.shareCnt }} <br>
                            <small> 공유수 </small>
                            </h5>
                        </div>
                        <div class="col-lg-3">
                            <h5>{{ detailInfo.pokeCnt }}  <br>
                            <small> 북마크수 </small>
                            </h5>
                        </div>
                    </div>
                </div>
            </card>
        </div>

        <!-- 상세정보 -->
        <div class="col-xl-8 col-lg-7 col-md-6">
            <card class="card">
                <el-tabs type="card">
                    <el-tab-pane label="상세정보">
                        <Detail v-if="loading" v-bind:detailInfo="detailInfo" v-bind:bizNo="detailInfo.bizNo" />
                    </el-tab-pane>
                    <el-tab-pane label="오디션">
                        <AuditionList v-if="loading" v-bind:bizNo="detailInfo.bizNo" />
                    </el-tab-pane>
                    <el-tab-pane label="소속 아티스트">
                        <MemberList v-if="loading" v-bind:bizNo="detailInfo.bizNo" />
                    </el-tab-pane>
                    <el-tab-pane label="계정이력">
                        <Log v-if="loading" v-bind:bizNo="detailInfo.bizNo" />
                    </el-tab-pane>
                </el-tabs>

                
            </card>
        </div>

    </div>
</template>

<script>
import {business} from '../../api/business'
import Detail from './Detail.vue'
import AuditionList from './AuditionList.vue'
import Log from './Log.vue'
import MemberList from './MemberList.vue'


export default {
    components : {Detail, AuditionList, Log, MemberList},
    data() {
        return {
            bizUrl : 0,
            loading : false,
            detailInfo : {
                phoneInfos : [],
                modelType : 0,
                filterType : 0
            },
            activeName : "first",
        }
    },
    created() {
        this.bizUrl = this.$route.params.bizUrl
        this.fetchData()
    },
    methods : {
        fetchData() {
            business.detail({ bizUrl : this.bizUrl })
                    .then(data => {
                        this.detailInfo = data.result
                        console.log(this.detailInfo.bizNo);
                        this.loading = true
                    })
        }
    }


}
</script>

<style>

</style>