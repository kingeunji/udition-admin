<template>
  <div>
      <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="1) 기간 설정">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="시작" v-model="form.showStart" style="width: 100%;" ></el-date-picker>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="종료" v-model="form.showEnd" style="width: 100%;" ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="2) 랜딩 설정">
                <div class="row" style="margin-left: 5px;">
                    <el-radio v-model="form.kind" label="1">오디션 랜딩 </el-radio>  
                    
                </div>
                <div class="row" style="margin-left: 5px;">
                    <el-radio v-model="form.kind" label="2">URL 랜딩 </el-radio>
                </div>
            </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form : {
                kind : '',
                execution : '',
                showStart : '',
                showEnd : '',
                title: ''
            }
        }
    }
}
</script>

<style scoped>
</style>