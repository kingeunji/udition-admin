<template>
  <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#2d3039" @select="handleSelect">
          <el-menu-item v-model="isCollapse">
                <div class="navbar-brand">
                    <span class="beta-ico">Admin</span>
                    <img class="u-header__navbar-brand-default" src="../assets/logo.svg">
                </div>    
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
            activeIndex : '0'
        }
    },
    methods : {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style>

    .navbar-brand {
      position: relative;
      flex: 0 0 auto;
      width: auto;
      max-width: none;
      -ms-flex-order: 1;
      order: 1;
      display: inline-block;
      padding-left: .5rem;
      padding-bottom: .5rem;
      margin-right: 1rem;
      font-size: 1rem;
      line-height: inherit;
      white-space: nowrap;
    }

    .navbar-brand img {
          width: 6rem;
    }

    .beta-ico {
      right: -30px;
      top: 50%;
      margin-top: -39px;
      color: #50b0b1;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: .05em;
      position: absolute;
    }

    .el-menu-item {
        padding : 0 110px !important;
    }

</style>