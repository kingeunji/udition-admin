<template>
  <div style="margin-top: 30px;">
    <el-table :data="bannerList" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column label="배너" width="200">
            <template slot-scope="scope">
                <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + scope.row.image" class="img-fluid" />
                <div style="text-align:center;"> <b> {{ scope.row.title }} </b> </div>
            </template>
        </el-table-column>

        <el-table-column label="기간" width="140" align="center">
            <template slot-scope="scope">
                <div>
                    <b v-if="scope.row.isDelete == 0"> 대기중 </b>
                    <b v-else-if="scope.row.isDelete == 1"> Live Off </b>
                    <b v-else-if="scope.row.isDelete == 2"> Live On </b>
                </div>
                <div>
                    <p> {{ scope.row.showStart }}  <br>
                    ~ {{ scope.row.showEnd }}</p>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="랜딩" width="240" align="center">
            <template slot-scope="scope">
                <div>
                    <b v-if="scope.row.kind == 1"> URL  </b>
                    <b v-else-if="scope.row.kind == 2"> 오디션  </b> 

                    <p v-if="scope.row.kind == 1"> {{ scope.row.execution}}  </p>
                    <p v-if="scope.row.kind == 2"> {{ scope.row.auditionName}}  </p>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="순서변경" width="120">
            <template slot-scope="scope">
                <div style="padding-left: 15px; padding-right: 15px; margin-bottom: 5px;">
                    <el-button size="mini">위로</el-button>
                </div>
                <div style="padding-left: 15px; padding-right: 15px;">
                    <el-button size="mini">아래로</el-button>
                </div>
            </template>
        </el-table-column>

        <el-table-column width="120">
            <template slot-scope="scope">
                <div style="padding-left: 15px; padding-right: 15px; margin-bottom: 5px;">
                    <el-button size="mini">수정</el-button>
                </div>
                <div style="padding-left: 15px; padding-right: 15px;">
                    <el-button size="mini" type="danger">삭제</el-button>
                </div>
            </template>
        </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { banner } from "@/api/banner";

export default {
  props: ["bannerType"],
  data() {
    return {
      bannerList: [],
      form: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await banner.list(this.bannerType, this.form);
      this.bannerList = response.data.results;
    }
  }
};
</script>

<style>
.el-button--danger {
    width: auto;
}
</style>