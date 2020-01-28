<template>
    <div style="width:170px; height:170px; ">
        <div class="list-type-action">
             <div class="custom-control custom-checkbox">
                 <div class="custom-control-label">
                     G29372
                 </div>
            </div>
        </div>
        <div class="list-type-inner">
            <div class="list-thumbnail">
                <img src="http://35.243.93.121:8080/fileFolder/20200122_f2f6033a_0ee9_4af9_90c7_974daabc09c1.jpeg" class="img-fluid">
            </div>

            <div class="list-profile-play">
                <button type="button" class="btn-profile-view"> 프로필 보기 </button>
                <button type="button" class="btn-profile-play"> <i class="el-icon-caret-right"></i> </button>
            </div>
            <div class="clearfix"></div>
        </div>    
    </div> 
</template>

<script>
export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .list-profile-play .btn-profile-play {
        float: right;
        width: 30px;
        color: #e0e0e0;
        font-size: 11px;
    }
    
    .btn-profile-play, .btn-profile-view {
        font-family: 'Noto Sans KR';
        float: left;
        width: 79%;
        height: 31px;
        color: #777;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        overflow: hidden;
        padding: 0;
        padding-bottom: 1px;
        background-color: #fff;
        transition: all .2s ease-in-out;
    }

    .list-profile-play {
        clear: both;
    }

    .img-fluid {
        height: 162px;
        max-width: 100%;
    }

    .list-type-inner {
        position: relative;
        top: -7px;
        clear: both;
        border: solid 1px #ddd;
        background-color: #fff;
        padding: 5px;
        transition: all .2s ease-in-out;
    }

    .list-thumbnail {
        margin-bottom: 5px;
        background-color: #fdfdfd;
    }

    .custom-control-label::before {
        position: absolute;
        pointer-events: none;
        user-select: none;
        content: "";
        border-radius: 0;
        left : -21px;
        top: 0;
        width: 21px;
        height: 20px;
        background-color: #fff;
        border: 1px solid #979797;
        transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

    }

    .custom-control-label::after {
        left: -21px;
        width: 21px;
        height: 20px;
        margin-top: 1px;
        background-image: none;
        color: #ccc;
        font-size: 10px;
        font-weight: 900;
        font-family: "Font Awesome 5 Free";
        content: "✔";
        top: 0;
        position: absolute;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
        display: block;
    }

    label {
        display: inline-block;
    }

    .custom-control-label {
        width: 58px;
        color: #fff;
        font-size: 10px;
        padding-left: 0;
        background-color: #bbb;
        line-height: 19px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        height: 20px;
        position: relative;
        letter-spacing: .02em;
        margin-bottom: 0;
    }

    .custom-control {
        float: right;
        position: relative;
        display: block;
        min-height: 1.7rem;
        padding-left: 1.5rem;
    }

    .list-type-action {
        height: 20px;
        font-size: 10px;
        font-weight: 500;
        color: #565a5c;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 162px;
        height: 162px;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }

  
</style>