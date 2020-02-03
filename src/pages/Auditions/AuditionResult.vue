<template>
    <div class="sort-option">
        <div class="list-type-loop1" v-for="item in this.auditionList" v-bind:key="item.auditionNo" >
            <div class="list-type-inner1s px-3 px-sm-5 py-3 py-sm-5">
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-6 offset-3 col-md offset-md-0">
                                <div class="mb-3 mb-md-0 mr-0 mr-md-3 mr-xl-4">
                                    <img :src="'http://35.243.93.121:8080/fileFolder/' + item.image"  class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row no-gutters mt-1">
                            <div class="col-6">
                                <span v-if="filterType == 1" class="badge rounded badge-success">진행중 / D-{{ item.dday }}</span>
                                <span v-else-if="filterType == 2" class="badge rounded badge-success">승인대기중</span>
                                <span v-else-if="filterType == 4" class="badge rounded badge-success">종료</span>
                                <span v-else-if="filterType == 3" class="badge rounded badge-success">
                                    <div v-if="item.dday >= 0">
                                        진행중 / D-{{ item.dday }}
                                    </div>
                                    <div v-if="item.dday < 0">
                                        종료
                                    </div>
                                </span>
                            </div>        
                        </div>
                        <h4 class="list-subject mb-1 mb-xl-1">
                            {{ item.title }}
                        </h4>
                        <ul class="list-info">
                            <li> <strong>접수기간</strong> {{ item.term }} </li>
                            <li> <strong>기업명</strong> {{ item.bizName }} </li>
                            <li> <strong>조회수</strong> {{ item.viewCnt }} </li>
                        </ul>
                        <div class="row mt-1 mt-md-4 mt-xl-4">
                            <div class="col-md-3 text-center text-md-left">
                                <el-button @click="auditionDetail(item.auditionNo)">오디션 내용</el-button>
                            </div>
                            <div v-if="filterType == 2" class="col-md-9 text-center text-md-right">
                                <el-button type="info">오디션 승인</el-button>
                            </div>
                            <div v-else class="col-md-9 text-center text-md-right">
                                <el-button v-if="item.reportCnt != 0" type="danger">신고확인</el-button>
                                <el-tooltip v-if="item.isDelete == 0" content="진행중인 오디션을 정지합니다" placement="top">
                                    <el-button type="danger" @click="pauseAudition(item.auditionNo, 1)">정지</el-button>
                                </el-tooltip>
                                <el-tooltip v-else-if="item.isDelete == 1" content="정지된 오디션을 게시합니다" placement="top">
                                    <el-button type="danger" @click="pauseAudition(item.auditionNo, 0)">게시</el-button>
                                </el-tooltip>
                                <el-button type="info">지원자보기</el-button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 15px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="10"
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { audition } from '../../api/audition.js'
export default {
    props : ['filterType'],
    data() {
        return {
            auditionList : '',
            pagination : '',
            formData : {
                requestPage : 0,
                pageSize : 10,
                filterType : 1
            }
        }
    },
    created(){
        this.formData.requestPage = 0
        this.formData.filterType = this.filterType
        this.fetchData()
    },
    watch : {
        filterType : function() {
            this.formData.requestPage = 0
            this.formData.filterType = this.filterType
            this.fetchData()
        }
    },
    methods : {
        fetchData() {
            audition.search(this.formData)
                    .then(data => {
                        this.auditionList = data.results
                        this.pagination = data.page
                    })
        },
        pageChange(val) {
            this.formData.requestPage = (val-1)
            this.fetchData()
        },
        pauseAudition(auditionNo, flag) {
            let form = {
                auditionNo : auditionNo,
                isDelete : flag
            }
            audition.pauseAudition(form)
                    .then(data => {
                        this.fetchData()
                        if(flag == 1) alert("해당 오디션이 정지되었습니다!")
                        else if(flag == 0) alert("해당 오디션이 게시되었습니다!")
                    })

        },
        auditionDetail(auditionNo) {
            let route = this.$router.resolve({path: '/auditions/'+ auditionNo});
            window.open(route.href, '_blank');
        }
    }
}
</script>

<style scoped>
.el-button--default {
    width: 130px !important;
}

h4 {
    font-size: 18px;
    margin-top: 15px !important;
    margin-bottom: 15px !important;
}

.list-type-loop1 {
    clear: both;
    border: solid 1px #ddd;
    background-color: #fff;
    margin: 0 0 20px;
    transition: all .2s ease-in-out;
}

.list-type-inner1 {
    padding: 15px 31px;
}

.badge-success {
    background-color: #50b0b1;
}

.badge {
    padding: 5px 10px !important;
    font-size: 12px;
    font-weight: 500;
    border-radius: 0px !important;
}

.list-group-hb .list-subject {
    font-size: 16px;
    font-weight: 500;
    color: #565a5c;
    margin: 10px 0;
}

.list-info {
    margin: 0;
    padding: 1px 0;
    color: #666;
    font-size: 12px;
}

.list-info li {
    margin: 0;
    padding: 1px 0;
    color: #666;
    font-size: 12px;
}
</style>