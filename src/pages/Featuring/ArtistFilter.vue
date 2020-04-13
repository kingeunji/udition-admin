<template>
    <el-form ref="form" :model="form">
        <div class="sidebar-search-wrap">
            <div class="sidebar-search-inner">
                <div class="sidebar-search">
                    <el-input v-model="form.searchTts" placeholder="검색어를 입력하세요"> </el-input>
                </div>
                <div class="sidebar-search-option">
                    <div>
                        <el-row style="padding-top : 10px; text-align:center;">
                             <el-button type="primary" icon="el-icon-search" v-on:click="search">조건 검색</el-button>
                        </el-row>
                    </div>
                </div>

            </div>
        </div>
    </el-form>
</template>

<script>
import { EventBus } from '../../utils/event-bus'

export default {
    data() {
        return {
            pickerOptions: { },
            value1: '',
            value2: '',
            form : {
                searchTts : '',
                filterType : '',
                memberTier : '',
                orderType : ''
            }
        }
    },
    watch : {
        form : function() {
            search()
        }
    },
    methods : {
        search() {
            EventBus.$emit('emitEvent', this.form) 
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

    .sidebar-search-wrap {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 30px 0 40px;
    }

    .sidebar-search-inner {
        padding: 10px;
    }

    .el-input__inner {
        position: relative;
        padding: 9px;
        margin-bottom: 2px;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 12px !important;
    }

    .sidebar-search-option {
        padding: 15px 10px;
    }

    .areaTts el-input input {
        height: 30px !important;
    }

    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    span {
        font-weight: 400;
        font-family: 'Noto Sans KR';
    }

    .el-button--primary {
        width: 100%;
    }

    .el-button--default {
        width: 100%;
    }
</style>