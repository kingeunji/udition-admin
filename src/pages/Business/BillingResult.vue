<template>
    <div>
        <div class="sort-option">
            <div style="font-size: 12px;">
                <span class="text-danger">*</span> 운영 담당자님은 무통장 입금 확인 시, 결제 요청일과 입금 마감일을 꼼꼼하게 확인 후 [입금확인함] 버튼을 누르면, 해당 기업에게 티켓이 바로 지급됩니다. <br>
                &nbsp;&nbsp; 입금 마감일 이후에도 입금이 확인되지 않을시에는 해당 기업에게 전화를 하고, 진행의사 여부를 판단 후 [메일:거부사유]를 작성합니다.
            </div>
            <div class="col-6" style="display: inline-block; margin-top:20px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> <el-checkbox v-model="isPaidFlg" label="1">입금 확인 필요 :무통장</el-checkbox> </el-form-item>
                </el-form>

                <span style="font-weight:600; font-size:14px;">필터/검색 결과 기업 : 12 개 </span>
            </div>

            <div class="col-6" style="display: inline-block; float: right; text-align: right; margin-top:20px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item> 
                        <span style="margin-right:10px;">체크한 기업에게 일괄</span>
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
                        <el-button size="small" type="primary">확인</el-button>
                    </el-form-item>            
                </el-form>
            </div>

            <div class="option">
                <el-table ref="multiTable" :data="billingList" v-loading="loading" style="width:100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                </el-table>

                <el-table-column label="기업 정보"  width="120">
                    <template slot-scope="scope">
                        <div><b>{{ scope.row.bizName }}</b></div>
                    </template>
                </el-table-column>

                <el-table-column label="결제 항목">
                    <template slot-scope="scope">
                        <div><b>{{ scope.row.itemName }}</b> {{ scope.row.billingMethod }}</div>
                    </template>
                </el-table-column>
            </div>

        </div>
    </div>
</template>

<script>
import {business} from '../../api/business'

export default {
    data() {
        return {
            isPaidFlg : false,
            actionSelect : '',
            options : [{
                value : 'mail',
                label : '이메일 보내기'
                
            }, {
                value : 'push',
                label : '푸시 보내기'
            }],
            billingList : '',
            pagination : '',
            loading : true,
            formData : {

            }
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            business.billingSearch(this.formData) 
                    .then(data => {
                        this.billingList = data.results
                        this.pagination = data.page
                        this.loading = false
                    })
        }
    }
}
</script>

<style>
    .text-danger {
        color: tomato;
    }
</style>