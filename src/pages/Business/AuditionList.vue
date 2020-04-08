<template>
    <div class="detail_pannel">

        <div class="row loop-row" v-for="audition in this.auditionList" v-bind:key="audition.auditionNo">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-6 offset-3 col-md offset-md-0">
                        <div class="mb-3 mb-md-0 mr-0 mr-md-3 mr-xl-4">
                            <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + audition.image"  class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-9">
                <div class="row no-gutters mt-1">
                    <div class="col-6">
                        <span v-if="form.filterType == 3" class="badge rounded badge-success">
                            <div v-if="audition.dday >= 0">
                                진행중 / D-{{ audition.dday }}
                            </div>
                            <div v-if="audition.dday < 0">
                                종료
                            </div>
                        </span>

                        <div v-if="form.filterType ==2" style="display : inline; margin-left:5px;">
                            <span v-if="audition.isPaid == 0" style="background-color: #db3535;" class="badge rounded badge-success">결제미완료</span>
                            <span v-else-if="audition.isPaid == 1" style="background-color: #db3535;" class="badge rounded badge-success">결제완료</span>

                        </div>
                    </div>        
                </div>
                <h4 class="list-subject mb-1 mb-xl-1">
                    {{ audition.title }}
                </h4>
                <ul class="list-info">
                    <li> <strong>접수기간</strong> {{ audition.term }} </li>
                    <li> <strong>기업명</strong> {{ audition.bizName }} </li>
                    <li> <strong>조회수</strong> {{ audition.viewCnt }} </li>
                </ul>
                <div class="row mt-1 mt-md-4 mt-xl-4">
                    <div class="col-md-3 text-center text-md-left">
                        <el-button @click="auditionDetail(audition.auditionNo)">오디션 내용</el-button>
                    </div>
                    <div v-if="filterType == 2" class="col-md-9 text-center text-md-right">

                        <el-tooltip placement="top" content="추가자료 메일로 요청하기">
                            <el-button type="danger" @click="rejectDialog(audition.auditionNo)">승인 거절</el-button>
                        </el-tooltip>

                        <el-tooltip placement="bottom" content="오디션을 바로 게시합니다.">
                            <el-button type="info" @click="updateDialog(audition.auditionNo)">오디션 승인</el-button>
                        </el-tooltip>

                    </div>
                    <div v-else class="col-md-9 text-center text-md-right">
                        <el-button v-if="audition.reportCnt != 0" type="danger">신고확인</el-button>
                        <el-tooltip v-if="audition.isDelete == 0" content="진행중인 오디션을 정지합니다" placement="top">
                            <el-button type="danger" @click="pauseAudition(audition.auditionNo, 1)">정지</el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="audition.isDelete == 1" content="정지된 오디션을 게시합니다" placement="top">
                            <el-button type="danger" @click="pauseAudition(audition.auditionNo, 0)">게시</el-button>
                        </el-tooltip>
                        <el-button type="info" >
                            <router-link style="color : #fff;font-weight: 400;" :to="'/apply/' + audition.auditionNo">지원자보기</router-link>  
                        </el-button>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {audition} from '../../api/audition.js'

export default {
    props: ['bizNo'],
    data() {
        return {
            auditionList : [],
            form : {
                filterType : 3,
                pageSize : 10
            },
            rejectReason : '',
            innerVisible : false,
            selectedAuditionNo : 0,
            dialogVisible : false
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            var form = { bizNo : this.bizNo, filterType : 3, pageSize : 10 }
            console.log(form + ", " + this.bizNo)
            audition.search(form)
                    .then(data => {
                        this.auditionList = data.results
                    })
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