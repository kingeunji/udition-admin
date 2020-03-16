<template>
    <div class="detail_pannel">
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

        <div class="row loop-row">
            <div class="col-9 col-lg-2">
                <b>구독플랜</b>
            </div>
            <div class="col-lg-10">
                {{ subscriptionInfo }}
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
            subscriptionInfo : '',
        }   
    },
    mounted() {
        this.fetchSubInfo(this.bizNo)
    }, 
    methods : {
        fetchSubInfo(bizNo) {
            let form = {
                bizNo : bizNo
            }
            business.subDetail(form)
                    .then(data => {
                        this.subscriptionInfo = data.results
                    })
        }
    }
}
</script>

<style>

</style>