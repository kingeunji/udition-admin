<template>
  <div>
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1" route="/artists">
                <i class="el-icon-star-on"></i>
                <span slot="title">전체 아티스트 관리</span>
          </el-menu-item>
          <el-menu-item index="2">
                <i class="el-icon-user-solid"></i>
                <span slot="title">기업회원 관리</span>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-s-platform"></i>
                <span slot="title">오디션 관리</span>
          </el-menu-item>
          <el-menu-item index="4">
                <i class="el-icon-message-solid"></i>
                <span slot="title">광고 요청</span>
          </el-menu-item>
          
      </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
    
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 1000px;
    }

    .el-menu-vertical-demo {
        min-height: 1000px;
    }
</style>