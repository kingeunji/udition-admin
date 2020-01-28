<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-switch v-model="allSelect" active-text="모든 결과 선택">
                </el-switch>
            </el-col>
            <el-col :span="4">
                <el-switch v-model="pageSelect" active-text="현재페이지 선택">
                </el-switch>
            </el-col>
            <el-col :span="4">
                <el-switch v-model="perfectionSelect" active-text="완성도 50% 이상">
                </el-switch>
            </el-col>
            <el-col :span="4">
                <el-switch v-model="profileSelect" active-text="프로필 미등록자">
                </el-switch>
            </el-col>
            <el-col :span="4">
                <el-select v-model="actionSelect" placeholder="-">
                    <el-option
                    size="small"
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="primary">확인</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>
                    필터/검색 결과 유지 : 1323명
                </span>
            </el-col>
            <el-col :span="14">
                <span>
                    
                </span>
            </el-col>
        </el-row>
    </div>

  
</template>

<script>
export default {
    data() {
        return {
            options : [{
                value : 'mail',
                label : '이메일 보내기'
                
            }, {
                value : 'push',
                label : '푸시 보내기'
            }, {
                value : 'Tier1',
                label : 'Tier1 설정'
            }, {
                value : 'Tier2',
                label : 'Tier2 설정'
            }, {
                value : 'Tier3',
                label : 'Tier3 설정'
            }, {
                value : 'TierB',
                label : 'TierB 설정'
            }],
            allSelect : false,
            pageSelect : false,
            perfectionSelect : false,
            profileSelect : false,
            actionSelect : ''
        }
    }
}
</script>

<style scoped>
    span {
        font-size: 13px;
        font-weight: 500;
    }
</style>