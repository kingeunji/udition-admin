<template>
    
    <div class="detail_pannel" v-if="dbload=true">
        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>상세소개</b>
            </div>
            <div class="col-lg-10">
                {{ detailInfo.intro }}
            </div>
        </div>

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>이메일</b>
            </div>
            <div class="col-lg-10">
                {{ detailInfo.email }}
            </div>
        </div>

        <div class="row loop-row" v-if="detailInfo.phoneInfos.length >0">
            <div class="col-9 col-lg-2">
                <b>연락처</b>
            </div>
            <div class="col-lg-10">
                <span v-for="item in detailInfo.phoneInfos" v-bind:key="item"> 
                    {{ item.phoneTts }}
                </span>
            </div>
        </div>

        <!-- <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>기업 회원 가입일</b>
            </div>
        </div> -->

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>기업 회원 가입일</b>
            </div>
            <div class="col-lg-10">
                {{ subscriptionInfo.createDate }}
            </div>
        </div>

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>구독 플랜</b>
            </div>
            <div class="col-lg-10">
                <el-radio-group v-model="modelType1">
                    <el-radio :value="beta" label="beta">무료 기간</el-radio>
                    <el-radio :value="standard" label="standard">스탠다드</el-radio>
                    <el-radio :value="advanced" label="advanced">어드밴스</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>구독 기간</b>
            </div>
            <div class="col-lg-10">
                <span>
                    <span class="demonstration"></span>
                    <el-date-picker
                    v-model="startDate1"
                    type="date"
                    :value="startDate1" :readonly="readonly">
                    </el-date-picker>
                </span>
                <span style="padding: 20px;">~</span>
                <span>
                    <span class="demonstration"></span>
                    <el-date-picker
                    v-model="endDate1"
                    type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                    :value="endDate1">
                    </el-date-picker>
                </span>
            </div>
        </div>

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>오디션 티켓</b>
            </div>
            <div class="col-lg-10" style="padding-bottom: 10px;">
                현재 보유 {{ subscriptionInfo.auditionCnt }}개
            </div>
            <div class="col-9 col-lg-2"></div>
            <div class="col-lg-10">
                <el-input-number size="mini" v-model="formData.auditionCnt" @change="handleChange" :min="1"></el-input-number>                
                <el-radio-group v-model="formData.auditionFlag" style="padding-left: 20px;">
                    <el-radio :label="0">지급</el-radio>
                    <el-radio :label="1">회수</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>캐스팅 인터뷰 티켓</b>
            </div>
            <div class="col-lg-10" style="padding-bottom: 10px;">
                현재 보유 {{ subscriptionInfo.ticketCnt }}개
            </div>
            <div class="col-9 col-lg-2"></div>
            <div class="col-lg-10">
                <el-input-number size="mini" v-model="formData.ticketCnt" @change="handleChange" :min="1"></el-input-number>                
                <el-radio-group v-model="formData.ticketFlag" style="padding-left: 20px;">
                    <el-radio :label="0">지급</el-radio>
                    <el-radio :label="1">회수</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div style="text-align:center; padding-top:30px;">
            <el-button type="primary" style="text-align:center;" @click="dialogUpdate=true">저장</el-button>
        </div>

        <el-dialog width="45%" :visible.sync="dialogUpdate" title="기업 수정">
            <div class="detail_pannel">
                <span>
                    해당 기업의 변경 사항을 저장하시겠습니까?
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="width: auto" @click="dialogUpdate = false">취소</el-button>
                <el-button style="width: auto" type="primary" @click="bizSubUpdate()">저장</el-button>
            </span>
        </el-dialog>
                {{ this.subscriptionInfo.createDate }}
            </div>
        </div>

    </div>
</template>

<script>
import {business} from '../../api/business.js'

export default {
    props: ['detailInfo', 'bizNo'],
    data() {
        return {
            dialogUpdate : false,
            bizSubNo : '',
            createDate : '',
            startDate1 : '',
            endDate1 : '',
            modelType1 : '',
            auditionCnt : 0,
            ticketCnt : 0,
            subscriptionInfo : {
                createDate : '',
                startDate : '',
                endDate : '',
                modelType : this.modelType1,
            },
            beta : '',
            standard : '',
            advanced : '',
            state : 'readonly',
            formData : {
                auditionCnt : 0,
                auditionFlag : '',
                ticketCnt : 0,
                ticketFlag : '',
            },
            dbload : false,
            // loading : true,
            loading: false,
            subscriptionInfo : {
                
            },
            formData : {
                
            },
            bizNo : '',
        }   
    },
    created() {
        console.log(this.bizNo);
        this.fetchSubInfo();
    },
    computed: {
        readonly() {
            return this.state === 'readonly'
        }
    },
    methods : {
        fetchSubInfo() {
            // this.loading = true
            business.subDetail(this.bizNo)
                    .then(data => {
                        this.subscriptionInfo = data.result
                        this.startDate1 = data.result.startDate
                        this.endDate1 = data.result.endDate
                        this.modelType1 = data.result.modelType
                        this.dbload = true
                        // this.loading = false
                    })
            this.formData.auditionFlag = '',
            this.formData.ticketFlag = ''
        },
        handleChange(val){
        },
        bizSubUpdate(){
            
            var startDate2 = this.startDate1.split('-');
            var startD = new Date(parseInt(startDate2[0]),parseInt(startDate2[1]),parseInt(startDate2[2]));
            var endDate2 = this.endDate1.split('-');
            var endD = new Date(parseInt(endDate2[0]),parseInt(endDate2[1]),parseInt(endDate2[2]));

            var cMonth = 24 * 60 * 60 * 1000 * 30;
            var updateCnt = parseInt((endD - startD)/cMonth) - 1;

            let formData = {
                bizSubNo : this.subscriptionInfo.bizSubNo,
                modelType : this.modelType1,
                startDate : this.startDate1,
                endDate : this.endDate1,
                updateRemainCnt : updateCnt,
                auditionCnt : this.formData.auditionCnt,
                auditionFlag : this.formData.auditionFlag,
                ticketCnt : this.formData.ticketCnt,
                ticketFlag : this.formData.ticketFlag
            }
            business.subUpdate(formData)
                    .then(data =>{
                        if(data.status.code == "0"){
                            this.$message("기업 수정이 완료되었습니다.")
                            this.dialogUpdate = false
                            this.fetchSubInfo()
                        }
                    })
        },

        this.fetchSubInfo()
    }, 
    methods : {
        fetchSubInfo() {
            business.subDetail({bizNo : this.bizNo})
                    .then(data => {
                        this.subscriptionInfo = data.result
                        this.loading = true
                    })
            console.log(this.subscriptionInfo);
        }
    }
}
</script>

<style>

</style>