<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <card class="card-user">
                <div slot="image">
                    <img id="myImage" :src=" 'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.image" alt="..." @error="imageLoadOnError"/>
                    <!-- <img id="myImage" :src=" 'http://webapi.udition.co/api/file/getFile?downloadFileName=' + detailInfo.image" alt="..." /> -->
                </div>
                <div>
                    <div class="author">
                        <div class="avatar" alt="..."> </div>
                        <h4 class="title">{{ detailInfo.fullName }}
                        <br>
                        <small id="fileName">@{{ detailInfo.stageName }}</small>
                        </h4>
                    </div>
                    <p class="description text-center">
                        {{ detailInfo.intro }}
                    </p>
                </div>
                <hr>
                <div class="text-center">
                    <div class="row">
                        <div class="col-lg-3 offset-lg-1">
                            <h5> {{ detailInfo.viewCnt}}  <br>
                            <small>조회수</small>
                            </h5>
                        </div>
                        <div class="col-lg-4">
                            <h5>{{ detailInfo.shareCnt }} <br>
                            <small> 공유수 </small>
                            </h5>
                        </div>
                        <div class="col-lg-3">
                            <h5>{{ detailInfo.pokeCnt }}  <br>
                            <small> 북마크수 </small>
                            </h5>
                        </div>
                    </div>
                </div>
            </card>

            <el-button style="width:360px; height: 50px; font-size: large;" type="primary" @click="makePDF">프로필 PDF 다운로드</el-button>

        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
            <card class="card">
                <el-tabs type="card">
                    <el-tab-pane label="Profile">
                        <Profile v-if="!loading" v-bind:detailInfo="detailInfo" />
                    </el-tab-pane>
                    <el-tab-pane label="Career">
                        <Career v-bind:careerForm="careerForm" />
                    </el-tab-pane>
                    <el-tab-pane label="Collection">
                        <Collection v-bind:collectionForm="collectionForm" />
                    </el-tab-pane>
                </el-tabs>

                
            </card>
        </div>

    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.7.2/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://unpkg.com/html2canvas@1.0.0-rc.5/dist/html2canvas.js"></script>

<script>
import {artist} from '../../api/artist.js'
import Profile from './Profile.vue'
import Career from './Career.vue'
import Collection from './Collection.vue'
import image from '../../assets/img/img_default_user@3x.png'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import CardVue from '../../components/Cards/Card.vue'


export default {
    components : { Profile, Career, Collection },
    data() {
        return {
            webUrl : '',
            detailInfo : '',
            loading : true,
            careerForm : {
                requestType : 'career',
                webUrl : ''
            },
            collectionForm : {
                requestType : 'collection',
                webUrl : ''
            },
            error : '',
        }
    },
    created() {
        this.webUrl = this.$route.params.webUrl
        this.careerForm.webUrl = this.$route.params.webUrl
        this.collectionForm.webUrl = this.$route.params.webUrl
        this.fetchData()
    },
    methods : {
        fetchData() {
            artist.detail({webUrl : this.webUrl})
                  .then(data => {
                      this.detailInfo = data.result
                      this.loading = false
                  })
                  .catch(err => {
                      this.error = err.data
                  })
        },
        imageLoadOnError(e) {
            e.target.src = image
        },
        makePDF(){
            var fullName = this.detailInfo.fullName
            var stageName = this.detailInfo.stageName

            if(document.getElementById("myImage").getAttribute("src") !== "/img/img_default_user@3x.e2f0ae3d.png"){
                var originImage = document.getElementById("myImage").getAttribute('src');
                console.log("originImage= " + originImage);
                var imgUrl = originImage.split("/").reverse()[0];
                console.log("imgUrl= " + imgUrl);
                document.getElementById("myImage").setAttribute('src', 'http://webapi.udition.co/api/file/getFile?downloadFileName=' + imgUrl);
                console.log("local= " + document.getElementById("myImage").getAttribute('src'));
            }

            if(document.getElementById("myImage1") != null) {
                var originImage1 = document.getElementById("myImage1").getAttribute('src');
                var imgUrl1 = originImage1.split("/").reverse()[0];
                document.getElementById("myImage1").setAttribute('src', 'http://webapi.udition.co/api/file/getFile?downloadFileName=' + imgUrl1);
            }

            if(document.getElementById("myImage2") != null){
                var originImage2 = document.getElementById("myImage2").getAttribute('src');
                var imgUrl2 = originImage2.split("/").reverse()[0];
                document.getElementById("myImage2").setAttribute('src', 'http://webapi.udition.co/api/file/getFile?downloadFileName=' + imgUrl2);
            }

            if(document.getElementById("myImage3") != null){
                var originImage3 = document.getElementById("myImage3").getAttribute('src');
                var imgUrl3 = originImage3.split("/").reverse()[0];
                document.getElementById("myImage3").setAttribute('src', 'http://webapi.udition.co/api/file/getFile?downloadFileName=' + imgUrl3);
            }

            html2canvas(document.querySelector(".content"), {
                allowTaint : true,
                useCORS : true,
            }).then(function(canvas) {
                
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210;
                var pageHeight = imgWidth * 1.414;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var doc = new jsPDF('p', 'mm', 'a4');

                doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                doc.save(fullName + "(@" + stageName + ").pdf");
                
            });

            if(document.getElementById("myImage").getAttribute("src") !== "/img/img_default_user@3x.e2f0ae3d.png"){
                document.getElementById("myImage").setAttribute('src', originImage);
                artist.deleteFile(imgUrl);
            }
            if(document.getElementById("myImage1") != null){
                document.getElementById("myImage1").setAttribute('src', originImage1);
                artist.deleteFile(imgUrl1);
            }
            if(document.getElementById("myImage2") != null){
                document.getElementById("myImage2").setAttribute('src', originImage2);
                artist.deleteFile(imgUrl2);
            }
            if(document.getElementById("myImage3") != null){
                document.getElementById("myImage3").setAttribute('src', originImage3);
                artist.deleteFile(imgUrl3);
            }
        },
        
        
    }
}
</script>

<style scoped>
    .card-image {
        height: 100% !important;
    }

    
    .avatar {
        height: 50px !important ;
    }

    small {
        font-size: 70% !important;
    }

    .detail_pannel {
        padding: 10px 10px;
    }

    .detail_pannel .loop-row {
        margin-bottom: 20px;
    }

</style>