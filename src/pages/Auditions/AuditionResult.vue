<template>
    <div class="sort-option" v-loading="loading">
        <div class="list-type-loop1" v-for="item in this.auditionList" v-bind:key="item.auditionNo" >
            <div class="list-type-inner1s px-3 px-sm-5 py-3 py-sm-5">
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-6 offset-3 col-md offset-md-0">
                                <div class="mb-3 mb-md-0 mr-0 mr-md-3 mr-xl-4">
                                    <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + item.image"  class="img-fluid">
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

                                <div v-if="filterType ==2" style="display : inline; margin-left:5px;">
                                    <span v-if="item.isPaid == 0" style="background-color: #db3535;" class="badge rounded badge-success">결제미완료</span>
                                    <span v-else-if="item.isPaid == 1" style="background-color: #db3535;" class="badge rounded badge-success">결제완료</span>

                                </div>
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

                                <el-tooltip placement="top" content="추가자료 메일로 요청하기">
                                    <el-button type="danger" @click="rejectDialog(item.auditionNo)">승인 거절</el-button>
                                </el-tooltip>

                                <el-tooltip placement="bottom" content="오디션을 바로 게시합니다.">
                                    <el-button type="info" @click="updateDialog(item.auditionNo)">오디션 승인</el-button>
                                </el-tooltip>

                            </div>
                            <div v-else class="col-md-9 text-center text-md-right">
                                <el-button v-if="item.reportCnt != 0" type="danger">신고확인</el-button>
                                <el-tooltip v-if="item.isDelete == 0" content="진행중인 오디션을 정지합니다" placement="top">
                                    <el-button type="danger" @click="pauseAudition(item.auditionNo, 1)">정지</el-button>
                                </el-tooltip>
                                <el-tooltip v-else-if="item.isDelete == 1" content="정지된 오디션을 게시합니다" placement="top">
                                    <el-button type="danger" @click="pauseAudition(item.auditionNo, 0)">게시</el-button>
                                </el-tooltip>
                                <el-button type="info" >
                                    <router-link style="color : #fff;font-weight: 400;" :to="'/apply/' + item.auditionNo">지원자보기</router-link>  
                                </el-button>

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

        <el-dialog width="50%" title="거절 사유 메일 보내기" :visible.sync="innerVisible" append-to-body>
            <el-form>
                <el-form-item label="거절 사유 (추가 자료) :" >
                    <el-input type="textarea" v-model="rejectReason" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">취소</el-button>
                <el-button type="primary" @click="rejectAudition">보내기</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="알림"
            :visible.sync="dialogVisible"
            width="30%">
            <span>오디션을 바로 게시하겠습니까?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">취소</el-button>
                <el-button type="primary" @click="updateAudition">승인</el-button>
            </span>
        </el-dialog>
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
            },
            loading: true,
            rejectReason : '',
            innerVisible : false,
            selectedAuditionNo : 0,
            dialogVisible : false
        }
    },
    created(){
        this.formData.requestPage = 0
        this.formData.filterType = this.filterType
        this.fetchData()
    },
    watch : {
        filterType : function() {
            this.loading = true
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
                        this.loading = false
                    })
        },
        pageChange(val) {
            this.loading = true
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
                        if(flag == 1) this.$message("해당 오디션이 정지되었습니다!")
                        else if(flag == 0) this.$message("해당 오디션이 게시되었습니다!")
                    })

        },
        auditionDetail(auditionNo) {
            let route = this.$router.resolve({path: '/auditions/'+ auditionNo});
            window.open(route.href, '_blank');
        },
        rejectDialog(auditionNo) {
            this.innerVisible = true
            this.selectedAuditionNo = auditionNo
        },
        updateDialog(auditionNo) {
            this.dialogVisible = true
            this.selectedAuditionNo = auditionNo
        },
        updateAudition() {
            let form = {
                auditionNo : this.selectedAuditionNo,
                isDisplayStart : 1,
            }

             audition.update(form) 
                    .then(data => {
                        if(data.status.code == "0")
                            this.$message("오디션을 승인했습니다!")
                            this.innerVisible = false
                            this.rejectReason = ''
                            this.selectedAuditionNo = 0
                            this.fetchData()
                    })
        },
        rejectAudition() {
            if(!this.rejectReason) {
                this.$message("메일 내용을 입력해주세요!")
                return false
            }

            let form = {
                auditionNo : this.selectedAuditionNo,
                isDisplayStart : 2,
                rejectReason : this.rejectReason
            }

            audition.update(form) 
                    .then(data => {
                        if(data.status.code == "0")
                            this.$message("오디션 게시를 거절했습니다!")
                            this.innerVisible = false
                            this.rejectReason = ''
                            this.selectedAuditionNo = 0
                            this.fetchData()
                    })
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


.el-button--primary {
    width: 130px !important; 
}
</style>