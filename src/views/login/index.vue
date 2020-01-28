<template>
  <div class="login-container">
      <div class="wrap-login">
        <span class="form-title">Udition 운영툴</span>
        <form @submit.prevent="onSubmit">
            <div class="wrap-input"> 
                <input class="input100" type="text" name="email" v-model="email" placeholder="Email" autofocus />
            </div>
            <div class="wrap-input rs1"> 
                <input class="input100"  type="password" name="password" v-model="password" placeholder="Password" autofocus />
            </div>
            <div class="wrap-login-btn">
                <button class="login-btn" :class="{'btn-success' : !invalidForm}" type="submit" :disabled="invalidForm"> SIGN IN </button>
            </div>

            <div class="wrap-text-center">
                <span class="text">
                    계정을 잃어버린 경우 <span class="text2">관리자(Genie)</span>에게 문의하세요! 😎
                </span>
            </div>

            <div class="text-center">
                <span class="text">
                    유디션 관리자 💻 등록하기 <a href="#" class="text2">Sign up</a>
                </span>
            </div>

        </form>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email : '',
            password : '',
        }
    },
    computed: {
        invalidForm() {
            return !this.email || !this.password
        }
    }, 
    methods : {
        onSubmit() {
            console.log(this.email);
        }
    }
}
</script>

<style>
    html, body {
        height: 100%;
        margin: 0px;
        
    }

    .login-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background: #e9faff;
        overflow: hidden;
    }

    .wrap-login {
        width : 380px;
        background: #fff;
        border-radius: 10px;
        padding: 55px;
        box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    }

    .wrap-input {
        width: 100%;
        position: relative;
        background-color: #fff;
        border: 1px solid #e6e6e6;
    }

    .wrap-input.rs1 {
        border-top: none;
    }

    .input100 {
        height: 68px;
        padding: 0 25px 0 25px;
        display: block;
        width: 100%;
        background: transparent;
        font-size: 15px;
        color: #666666;
        line-height: 1.2;
        outline: none;
        border: none;
    }

    .form-title {
        display: block;
        font-size: 28px;
        color: #555555;
        line-height: 1.2;
        text-align: center;
        padding-bottom: 33px;
    }

    .wrap-login-btn {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .login-btn.btn-success {
        background-color: #4272d7;
    }

    .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 60px;
        background-color: #d3d3d3;
        font-size: 14px;
        color: #fff;
        line-height: 1.2;
        text-transform: uppercase;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    button {
        outline: none !important;
        border: none;
        background: transparent;
    }

    .wrap-text-center {
        text-align: center;
        padding-top: 45px;
        padding-bottom: 4px;
    }

    .text-center {
        text-align: center;
    }


    .text {
        font-size: 14px;
        line-height: 1.4;
        color: #999999;
    }

    .text2 {
        font-size: 14px;
        line-height: 1.4;
        color: #4272d7;
    }

    a {
        text-decoration: none;
    }
</style>
