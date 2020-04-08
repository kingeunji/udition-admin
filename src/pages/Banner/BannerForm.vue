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
                        <el-radio v-model="form.kind" label="1" style="font-size: 13px;">오디션 랜딩 </el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-input :disabled="form.kind != 1"  placeholder="오디션을 선택해 주세요"></el-input>
                    </el-col>
                    
                </div>
                <div class="row" style="margin-left: 5px; margin-top: 5px;">
                    <el-col :span="4">
                        <el-radio v-model="form.kind" label="2" style="font-size: 13px;">URL 랜딩 </el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-input :disabled="form.kind != 2" placeholder="URL 주소 복붙" v-model="form.execution"></el-input>
                    </el-col>
                </div>
            </el-form-item>

            <el-form-item label="3) 이미지 설정" style="margin-top: 13px;">
                    <el-upload action="#" list-type="picture-card" :on-change="imageUpload" :auto-upload="false" :limit=1>
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)" >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
            </el-form-item>

            <el-form-item label="4) 타이틀 설정" style="margin-top: 15px;">
                <div class="row" style="margin-left: 5px;">
                    <el-input placeholder="배너 타이틀을 입력해 주세요" v-model="form.title"></el-input>
                </div>
            </el-form-item>

            <el-form-item label="5) 유료 광고" style="margin-top: 13px;">
                <div class="row" style="margin-left: 5px; margin-top: 5px;">
                    <el-checkbox v-model="form.isPaid">광고주 광고일 경우 체크</el-checkbox>
                </div>
            </el-form-item>

            <el-form-item style="text-align: right;">
                <el-button @click="bannerInsert">배너 등록</el-button>
                <el-button type="primary">즉시 등록</el-button>
            </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { file } from '../../api/file'

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
            imageFile : null
        }
    },
    methods : {
        handleRemove(file) {
            this.dialogImageUrl = '';
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imageUpload(file) {
            this.imageFile = file
            console.log(file)
        },
        bannerInsert() {
            if(this.validCheck()) {
                // 1. 파일 업로드 
                console.log(this.imageFile)
                file.upload(this.imageFile)
                    .then(data => {
                        this.form.image = data.fileName
                        console.log(this.form.image)
                    })
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
            if(!this.imageFile) {
                this.$message.error("배너 이미지를 업로드 해주세요!")
                return false
            }
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