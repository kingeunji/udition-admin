<template>
  <div class="banner-form">
      <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="1) 기간 설정" style="margin-top: 13px;">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="시작" v-model="form.showStart" style="width: 100%;" ></el-date-picker>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="종료" v-model="form.showEnd" style="width: 100%;" ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="2) 랜딩 설정" style="margin-top: 13px;">
                <div class="row" style="margin-left: 5px;">
                    <el-col :span="4">
                        <el-radio v-model="form.kind" label="2" name="2" value="2" style="font-size: 13px;">오디션 랜딩 </el-radio>
                    </el-col>
                    <el-col :span="12">
                        <!-- <el-input :disabled="form.kind != 1"  placeholder="오디션을 선택해 주세요"></el-input> -->
                        <el-select v-model="form.execution" :disabled="form.kind != 2" placeholder="오디션을 선택해주세요" style="width:100%;">
                            <el-option
                                v-for="item in auditionOption"
                                :key="item.auditionNo"
                                :value="item.auditionNo"
                                :label="item.title">
                            </el-option>
                        </el-select>
                    </el-col>
                    
                </div>
                <div class="row" style="margin-left: 5px; margin-top: 5px;">
                    <el-col :span="4">
                        <el-radio v-model="form.kind" label="1" style="font-size: 13px;">URL 랜딩 </el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-input :disabled="form.kind != 1" placeholder="URL 주소 복붙" v-model="form.execution"></el-input>
                    </el-col>
                </div>
            </el-form-item>

            <div v-if ="bannerType != 'belt'">
                <!-- <div v-if="bannerType != 'big'"> -->
                    <el-form-item label="3) 이미지 설정" style="margin-top: 13px;">
                        <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                    </el-form-item>
                <!-- </div> -->

                <!-- <div v-if="bannerType == 'big'">
                    <el-form-item label="3-1) 큰 이미지 설정" style="margin-top: 13px;">
                        <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                    </el-form-item>

                    <el-form-item label="3-2) 썸네일 설정" style="margin-top: 13px;">
                        <input type="file" ref="imageUpload" @change="onChangeImage(item, $event)" />
                    </el-form-item>
                </div> -->

                <el-form-item label="4) 타이틀 설정" style="margin-top: 15px;">
                    <div class="row" style="margin-left: 5px;">
                        <el-input placeholder="배너 타이틀을 입력해 주세요" v-model="form.title"></el-input>
                    </div>
                </el-form-item>
                

                <el-form-item label="5) 유료 광고" style="margin-top: 13px;">
                    <div class="row" style="margin-left: 5px; margin-top: 5px;">
                        <el-checkbox v-model="form.isPaid" true-label="1" false-label="0">광고주 광고일 경우 체크</el-checkbox>
                    </div>
                </el-form-item>
            </div>
                
            <div v-if="bannerType == 'belt'">
                <el-form-item label="3) 내용 설정" style="margin-top: 15px;">
                    <div class="row" style="margin-left: 5px;">
                        <el-input placeholder="내용을 입력해 주세요" v-model="form.title"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="4) 유료 광고" style="margin-top: 13px;">
                    <div class="row" style="margin-left: 5px; margin-top: 5px;">
                        <el-checkbox v-model="form.isPaid" true-label="1" false-label="0">광고주 광고일 경우 체크</el-checkbox>
                    </div>
                </el-form-item>
            </div>
            

            <el-form-item style="text-align: right;">
                <div style="display: inline-block;">
                    <el-button @click="bannerInsert">배너 등록</el-button>
                </div>
                <div style="display: inline-block; margin-left: 10px;">
                    <el-button type="primary" @click="bannerInsertNow">즉시 등록</el-button>
                </div>
            </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { file } from '../../api/file'
import { banner } from '../../api/banner'
import { EventBus } from '../../utils/event-bus'

export default {
    props : ['bannerType'],
    data() {
        return {
            form : {
                image : '',
                kind : '',
                execution : '',
                showStart : '',
                showEnd : '',
                title: '',
                isPaid : 0
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imageFile : null,
            selectAudition : '',
            auditionOption : {
                auditionNo: 0,
                auditionTitle: ''
            },
            files : []
        }
    },
    created() {
        this.auditionOption2();
        
    },
    methods : {
        handleRemove(file) {
            this.dialogImageUrl = '';
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onChangeImage(item, e) {
            // alert("!!");
            var files = e.target.files || e.dataTransfer.files;
            this.files.push(files[0]);
        },
        imageUpload(file) {
            this.imageFile = file
            console.log(file)
        },
        auditionOption2() {
            banner.auditionList(this.bannerType)
                    .then(response => {
                        this.auditionOption = response.data.results;
                    })
        },
        data : function() {
            return {
                auditionOption : []
            }
        },
        async fileUpload() {
            // 1. 파일 업로드 
            var formData = new FormData();
            formData.append("image", this.files[0]);
            const response = await file.upload(formData);
            this.form.image = response
            console.log(this.form.image);
        },
        async bannerInsert() {
            if(this.bannerType != 'belt'){
                if(this.validCheck()) {
                    
                    await this.fileUpload();
                    if(this.form.image) {
                        banner.insert(this.bannerType, this.form)
                        .then(response => {
                            if(response.data.status.code == 0) {
                                alert("배너가 정상적으로 등록되었습니다.");
                                EventBus.$emit('uploadForm', true);
                                this.form = {};
                                this.files[0] = '';
                            }
                        });
                    } else {
                    this.$message.error("배너 이미지를 업로드 해주세요!")
                    }
                }
            } else if(this.bannerType == 'belt') {
                if(this. validCheck()) {
                    banner.insert(this.bannerType, this.form)
                            .then(response => {
                                if(response.data.status.code == 0) {
                                    alert("배너가 정상적으로 등록되었습니다.")
                                    EventBus.$emit('uploadForm', true);
                                    this.form = {};
                                }
                            });
                }
            }
        },
        async bannerInsertNow() {
            if(this.bannerType != 'belt'){
                if(this.validCheck()) {
                    
                    await this.fileUpload();
                    if(this.form.image) {
                        banner.showBanner(this.bannerType, this.form)
                        .then(response => {
                            if(response.data.status.code == 0) {
                                alert("배너가 정상적으로 등록되었습니다.");
                                EventBus.$emit('uploadForm', true); 
                                this.form = {};
                                this.files[0] = '';
                            }
                        });
                    } else {
                        this.$message.error("배너 이미지를 업로드 해주세요!")
                    }
                }
            } else if(this.bannerType == 'belt') {
                if(this. validCheck()) {
                    banner.insert(this.bannerType, this.form)
                            .then(response => {
                                if(response.data.status.code == 0) {
                                    alert("배너가 정상적으로 등록되었습니다.")
                                    EventBus.$emit('uploadForm', true);
                                    this.form = {};
                                }
                            });
                }
            }
        },
        validCheck() {
            // 필수항목 유효성 체크
            
            if(!this.form.showStart || !this.form.showEnd) {
                this.$message.error("배너 기간 설정을 입력해 주세요!")
                return false
            }
            if(!this.form.kind) {
                this.$message.error("배너 랜딩 설정은 필수입니다!")
                return false
            } else {
                if(!this.form.execution) {
                    this.$message.error("배너 랜딩 설정은 필수입니다!")
                    return false
                }
            }
            // if(!this.form.image) {
            //     this.$message.error("배너 이미지를 업로드 해주세요!")
            //     return false
            // }
            if(!this.form.title) {
                this.$message.error("배너 타이틀을 입력해 주세요!")
                return false
            }

            return true
        }
    }
}
</script>

<style>
.banner-form {
    padding: 13px;
    background-color: white;
    border: 1px solid #DDDDDD;
}


.el-form-item__label {
    text-align: left !important;
    margin-left: 14px;
}

</style>