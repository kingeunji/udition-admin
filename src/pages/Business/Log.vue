<template>
    <div class="detail_pannel" v-if="dbload=true">

        <div class="logForm">
        <el-form v-model="logForm" status-icon label-width="120px">
            <el-input type="text" v-model="logData" autocomplete="off" style="width:610px"></el-input>
            <el-button type="primary" @click="logSubmit" style="float: right;">입력</el-button>
        </el-form>
        </div>

        <div class="row loop-row" v-for="log in this.logList" v-bind:key="log.bizNo">
            <div class="col-9 col-lg-2">
                <b>{{ log.createDate }}</b>
            </div>
            <div class="col-lg-10">
                {{ log.logTts }}
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
import { business } from '../../api/business'

export default {
    props: ['bizNo'],
    data() {
        return {
            logList : [],
            form : {
                requestPage : 0,
                pageSize : 10,
                bizNo : this.bizNo
            },
            pagination : '',
            logData : '',
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            // var form = { bizNo : this.bizNo, pageSize : 10 }
            // console.log(form + ", " + this.bizNo)
            business.logSearch(this.form)
                    .then(data => {
                        this.logList = data.results
                        this.pagination = data.page
                    })
            this.logData = ''
        },
        pageChange(val) {
            this.form.requestPage = (val-1)
            this.fetchData()
        },
        logSubmit(){
            console.log(this.bizNo);
            if(!this.logData){
                this.$message("로그 내용을 입력해주세요")
                return false
            }
            let form = {
                bizNo : this.bizNo,
                logTts : this.logData
            }
            business.logInsert(form)
                    .then(data => {
                        if(data.status.code == "0"){
                            this.$message("로그 등록이 완료되었습니다")
                            this.fetchData()
                        }
                    })
        }
    }

}
</script>

<style scoped>
/* .el-button--default {
    width: 130px !important;
} */

.logForm {
    margin-bottom: 30px;
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


/* .el-button--primary {
    width: 130px !important; 
} */
</style>