<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <card class="card-user">
                <div slot="image">
                    <div v-if="loading">
                        <el-image :src="'http://35.243.93.121:8080/fileFolder/' + detailInfo.image" alt="..."> </el-image>
                    </div>
                </div>
                <div>
                    <div class="author" style="margin-top: -120px;">
                        <div class="avatar" alt="..."> </div>
                        <h4 class="title">{{ detailInfo.title }}
                        <br>
                        <small>@{{ detailInfo.bizName }}</small>
                        </h4>
                    </div>
                    <p class="description text-center">
                        {{ detailInfo.intro }}
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
            <card class="card" title="오디션 상세정보">
                <div class="detail_pannel">
                    <div class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>제목</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.title }}
                        </div>
                    </div>
                    <div class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>모집 기간</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.term }}
                        </div>
                    </div>
                    <div v-if="detailInfo.host != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>프로젝트 주관</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.host }}
                        </div>
                    </div>
                    <div v-if="detailInfo.addr != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>주소</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.addr }}
                        </div>
                    </div>
                    <div v-if="detailInfo.auditionTts != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>상세정보</b>
                        </div>
                        <div v-html="detailInfo.auditionTts" class="col-lg-10">
                        </div>
                    </div>
                    <div v-if="detailInfo.minAge > 0 || detailInfo.maxAge > 0" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>연령대</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.minAge }} ~ {{ detailInfo.maxAge}}
                        </div>
                    </div>
                    <div v-if="detailInfo.entryCnt != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>모집인원</b>
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.entryCnt }} 
                        </div>
                    </div>

                    <div v-if="detailInfo.genderType > 0" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>성별</b>
                        </div>
                        <div class="col-lg-10">
                            <span v-if="detailInfo.genderType == 1">
                                남성
                            </span>
                            <span v-else-if="detailInfo.genderType == 2">
                                여성
                            </span>
                            <span v-else>
                                남녀무관
                            </span>
                        </div>
                    </div>
                    
                    <div v-if="detailInfo.defray != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>선발 후 비용</b> 
                        </div>
                        <div class="col-lg-10">
                            {{ detailInfo.defray }} 
                        </div>
                    </div>

                    <div v-if="detailInfo.roleInfos != ''" class="row loop-row">
                        <div class="col-9 col-lg-2">
                            <b>모집 역할 </b> 
                        </div>
                        <div class="col-lg-10">
                            <span v-for="role in detailInfo.roleInfos" v-bind:key="role">
                                {{ role }}
                            </span>
                        </div>
                    </div>
                </div>
            </card>    
        </div>

    </div>
</template>

<script>
import {audition} from '../../api/audition'
export default {
    data() {
        return {
            auditionNo : 0,
            detailInfo : '',
            loading : false
        }
    },
    created() {
        this.auditionNo = this.$route.params.auditionNo
        this.fetchData()
    },
    methods : {
        fetchData() {
            audition.detail({auditionNo : this.auditionNo})
                    .then(data => {
                        this.detailInfo = data.result
                        this.loading = true
                        this.detailInfo.auditionTts = this.detailInfo.auditionTts.replace(/(?:\r\n|\r|\n)/g, '<br>')
                    })
        }
    }
}
</script>

<style scoped>
    .detail_pannel {
        padding: 10px 10px;
    }

    .detail_pannel .loop-row {
        margin-bottom: 20px;
    }
        
    iframe {
        width: 100%;
    }
</style>