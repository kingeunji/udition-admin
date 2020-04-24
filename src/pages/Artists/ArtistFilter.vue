<template>
    <el-form ref="form" :model="form">
        <div class="sidebar-search-wrap">
            <div class="sidebar-search-inner">
                <div class="sidebar-search">
                    <el-input v-model="form.searchTts" placeholder="검색어를 입력하세요"> </el-input>
                </div>
                <div class="sidebar-search-option">
                    <el-collapse>
                        <el-collapse-item title="카테고리" name="1">
                            <el-checkbox v-model="form.keyCodes" label="prof_singer">가수</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_actor">배우</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_dancer">댄서</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_musician">연주자</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_rapper">래퍼</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_comedian">개그맨</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_model">모델</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_announcer">아나운서</el-checkbox>
                            <el-checkbox v-model="form.keyCodes" label="prof_others">다른 재능</el-checkbox>
                        </el-collapse-item>
                        <el-collapse-item title="커리어 상태" name="2">
                            <el-radio v-model="form.readyToWork" label=1>구직중</el-radio>
                            <el-radio v-model="form.readyToWork" label=2>구직안함</el-radio>

                        </el-collapse-item>
                        <el-collapse-item title="영상프로필" name="3">
                            <el-radio v-model="form.movieType" label=0>미등록</el-radio>
                            <el-radio v-model="form.movieType" label=1>등록</el-radio>
                        </el-collapse-item>
                        <el-collapse-item title="3컷 대표이미지" name="4">
                            <el-radio v-model="form.cutImageType" label=0>미등록</el-radio>
                            <el-radio v-model="form.cutImageType" label=1>등록</el-radio>
                        </el-collapse-item>
                        <el-collapse-item title="경력 유무" name="5">
                            <el-radio v-model="form.careerType" label=0>미등록</el-radio>
                            <el-radio v-model="form.careerType" label=1>등록</el-radio>
                        </el-collapse-item>
                        
                        <el-collapse-item title="성별" name="7">
                            <el-radio v-model="form.genderType" label=1>남자</el-radio>
                            <el-radio v-model="form.genderType" label=2>여자</el-radio>
                        </el-collapse-item>
                    
                        <el-collapse-item title="나이" name="8">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.minAge"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.maxAge"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    세
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="키" name="9">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.tallMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.tallMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        
                        <el-collapse-item title="몸무게" name="10">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.weightMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.weightMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    kg
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="쓰리 사이즈" name="11">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.bastMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.bastMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm(B)
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.waistMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.waistMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm(W)
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.heapMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.heapMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm(H)
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="상의 사이즈" name="12">
                            <el-select v-model="form.uppserSize" placeholder="-">
                                <el-option
                                v-for="item in upperOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-collapse-item>

                        <el-collapse-item title="하의 사이즈" name="13">
                            <el-select v-model="form.lowerSize" placeholder="-">
                                <el-option
                                v-for="item in lowerOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-collapse-item>

                        <el-collapse-item title="발 사이즈" name="14">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.footMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.footMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="다리길이" name="15">
                            <el-row>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.legMin"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    ~
                                </el-col>
                                <el-col :span="8">
                                    <el-input size="mini" v-model="form.legMax"></el-input> 
                                </el-col>
                                <el-col :span="2">
                                    cm
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="피부톤" name="16">
                            <el-select v-model="form.skinType" placeholder="-">
                                <el-option
                                v-for="item in skinOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-collapse-item>

                        <el-collapse-item title="눈색" name="17">
                            <el-select v-model="form.eyeType" placeholder="-">
                                <el-option
                                v-for="item in eyeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-collapse-item>
                    </el-collapse>
                    <div>
                        <el-row style="padding-top : 10px;">
                             <el-button type="primary" style="width: 100%;" icon="el-icon-search" v-on:click="search">조건 검색</el-button>
                        </el-row>
                        <el-row>
                             <el-button plain>필터 초기화</el-button>
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
            upperOption : [{
                label : "XS",
                value : "1"
            }, {
                label : "S",
                value : "2"
            }, {
                label : "M",
                value : "3"
            }, {
                label : "L",
                value : "4"
            }, {
                label : "XL",
                value : "5"
            }],
            lowerOption : [{
                label : "XS",
                value : "1"
            }, {
                label : "S",
                value : "2"
            }, {
                label : "M",
                value : "3"
            }, {
                label : "L",
                value : "4"
            }, {
                label : "XL",
                value : "5"
            }],
            skinOption : [{
                label : "하얀편",
                value : "1"
            },{
                label : "어두운편",
                value : "2"
            },{
                label : "보통",
                value : "3"
            }],
            eyeOption : [{
                label : "검정색",
                value : "1"
            },{
                label : "갈색",
                value : "2"
            },{
                label : "파란색",
                value : "4"
            },{
                label : "녹색",
                value : "5"
            }],
            form : {
                searchTts : '',
                keyCodes: [],
                readyToWork: '',
                movieType : '',
                cutImageType : '',
                careerType : '',
                genderType : 0,
                minAge : '',
                maxAge : '',
                tallMin : '',
                tallMax : '',
                weightMin : '',
                weightMax : '',
                heapMin : '',
                heapMax : '',
                upperSize : '',
                lowerSize : '',
                legMin : '',
                legMax : '',
                footMin : '',
                footMax : '',
                skinType : '',
                eyeType : '',
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
    }
    .el-row :last-child { 
        margin-bottom: 0;
    }

    span {
        font-weight: 400;
        font-family: 'Noto Sans KR';
    }

    /* .el-button--primary {
        width: 100% !important;
    }

    .el-button--default {
        width: 100% !important;
    } */
</style>