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
                                <span class="badge rounded badge-success">진행중 / D-{{ item.dday }}</span>
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
                                <el-button>오디션 내용</el-button>
                            </div>
                            <div class="col-md-9 text-center text-md-right">
                                <el-button>오디션</el-button>
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
                :total="this.pagination.dbCount"
                @current-change="pageChange"
                @next-click="pageChange"
                @prev-click="pageChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import {audition} from '../../api/audition.js'
export default {
    data() {
        return {
            auditionList : '',
            pagination : '',
            formData : {
                requestPage : 0
            }
        }
    },
    created(){
        this.fetchData()
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
        }
    }
}
</script>

<style scoped>
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