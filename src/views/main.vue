<template>
  <div>
      <el-container>
          <el-header style="padding : 0px;"> <Navbar /> </el-header>
          <el-main style="padding : 0px;">
              <router-view />
          </el-main>
      </el-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components : { Navbar }
}
</script>

<style>

</style>