<template>
  <div class="detail_pannel">
    <div v-if="detailInfo.video != ''" class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>프로필 / 영상</b>
      </div>
      <div class="col-lg-10" v-if="videoFlg">
        <youtube :video-id="videoId" width="520px;"></youtube>
      </div>
      <div class="col-lg-10" v-else>
        <div class="images" v-viewer>
          <img
            :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.video"
            style="width: 150px;"
          />
        </div>
      </div>
    </div>
    <div v-if="detailInfo.email != ''" class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>이메일</b>
      </div>
      <div class="col-lg-10">{{ detailInfo.email }}</div>
    </div>
    <div v-if="detailInfo.basicInfo != ''" class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>기본 정보</b>
      </div>
      <div class="col-lg-10">
        생년월일 {{ detailInfo.basicInfo.birthday }}
        <br />
        <span v-if="detailInfo.basicInfo.gender == 1">남성</span>
        <span v-if="detailInfo.basicInfo.gender == 2">여성</span>
      </div>
    </div>
    <div v-if="detailInfo.phoneInfos != ''" class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>연락처</b>
      </div>
      <div class="col-lg-10">
        <span v-for="item in detailInfo.phoneInfos" v-bind:key="item.phoneTts">{{ item.phoneTts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.myStoryInfo.storyTts != ''" class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>나의 이야기</b>
      </div>
      <div class="col-lg-10">{{ detailInfo.myStoryInfo.storyTts }}</div>
    </div>

    <div v-if="detailInfo.myKeyInfos != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>키워드</b>
      </div>
      <div class="col-lg-10">
        <span v-for="item in detailInfo.myKeyInfos" v-bind:key="item.code">{{ item.tts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.appearInfos != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>외모 키워드</b>
      </div>
      <div class="col-lg-10">
        <span
          v-for="item in detailInfo.appearInfos"
          v-bind:key="item.appearTts"
        >#{{ item.appearTts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.careerInfo != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>커리어 상태</b>
      </div>
      <div class="col-lg-10">
        <span v-if="detailInfo.careerInfo.careerCode == 0">{{ detailInfo.careerInfo.careerTts }}</span>
        <span v-if="detailInfo.careerInfo.careerCode == 1">열심히 새로운 기회를 찾고 있어요</span>
        <span v-if="detailInfo.careerInfo.careerCode == 2">가끔 지원하는 중이에요</span>
        <span v-if="detailInfo.careerInfo.careerCode == 3">지원하고 있지 않지만 제안을 받는다면 고려할게요</span>
        <span v-if="detailInfo.careerInfo.careerCode == 4">지금은 모든 제안을 거절할게요</span>
      </div>
    </div>

    <div v-if="detailInfo.uniqueInfo.uniqueTts != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>취미</b>
      </div>
      <div class="col-lg-10">
        <span>{{ detailInfo.uniqueInfo.uniqueTts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.areaInfos != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>활동 가능 지역</b>
      </div>
      <div class="col-lg-10">
        <span v-for="item in detailInfo.areaInfos" v-bind:key="item.areaTts">#{{ item.areaTts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.physInfo != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>신체 정보</b>
      </div>
      <div class="col-lg-10">
        <div v-if="detailInfo.physInfo.height != null">
          <b>키</b>
           <span>  {{ detailInfo.physInfo.height }}</span>
        </div>
        <div v-if="detailInfo.physInfo.weight != null">
          <b>몸무게</b>
           <span>  {{ detailInfo.physInfo.weight }}</span>
        </div>
        <div v-if="detailInfo.physInfo.upperSize != null">
          <b>상의 사이즈</b>
          <span v-if="detailInfo.physInfo.upperSize == 1">  XS</span>
          <span v-if="detailInfo.physInfo.upperSize == 2">  S</span>
          <span v-if="detailInfo.physInfo.upperSize == 3">  M</span>
          <span v-if="detailInfo.physInfo.upperSize == 4">  L</span>
          <span v-if="detailInfo.physInfo.upperSize == 5">  XL</span>
        </div>
        <div v-if="detailInfo.physInfo.lowerSize != null">
          <b>하의 사이즈</b>
          <span v-if="detailInfo.physInfo.lowerSize == 1">  XS</span>
          <span v-if="detailInfo.physInfo.lowerSize == 2">  S</span>
          <span v-if="detailInfo.physInfo.lowerSize == 3">  M</span>
          <span v-if="detailInfo.physInfo.lowerSize == 4">  L</span>
          <span v-if="detailInfo.physInfo.lowerSize == 5">  XL</span>
        </div>
        <div v-if="detailInfo.physInfo.bast != null && detailInfo.physInfo.bast != -1">
          <b>Bast</b>
          <span>  {{ detailInfo.physInfo.bast }}</span>
        </div>
        <div v-if="detailInfo.physInfo.waist != null && detailInfo.physInfo.waist != -1">
          <b>waist</b>
          <span>  {{ detailInfo.physInfo.waist }}</span>
        </div>
        <div v-if="detailInfo.physInfo.heap != null && detailInfo.physInfo.heap != -1">
          <b>heap</b>
          <span>  {{ detailInfo.physInfo.heap }}</span>
        </div>
        <div v-if="detailInfo.physInfo.footSize != null">
          <b>신발사이즈</b>
          <span>  {{ detailInfo.physInfo.footSize }}</span>
        </div>
        <div v-if="detailInfo.physInfo.leg != null && detailInfo.physInfo.leg != -1">
          <b>다리길이</b>
          <span>  {{ detailInfo.physInfo.leg }}</span>
        </div>
        <div v-if="detailInfo.physInfo.bloodType != null">
          <b>혈액형</b>
          <span v-if="detailInfo.physInfo.bloodType == 1">  A 형</span>
          <span v-if="detailInfo.physInfo.bloodType == 2">  B 형</span>
          <span v-if="detailInfo.physInfo.bloodType == 3">  AB 형</span>
          <span v-if="detailInfo.physInfo.bloodType == 4">  O 형</span>
        </div>

        <div v-if="detailInfo.physInfo.skin != null">
          <b>피부톤</b>
          <span v-if="detailInfo.physInfo.skin == 1">  하얀편</span>
          <span v-if="detailInfo.physInfo.skin == 2">  어두운편</span>
          <span v-if="detailInfo.physInfo.skin == 3">  보통</span>
        </div>

        <div v-if="detailInfo.physInfo.eye != null">
          <b>눈색</b>
          <span v-if="detailInfo.physInfo.eye == 1">  검정</span>
          <span v-if="detailInfo.physInfo.eye == 2">  갈색</span>
          <span v-if="detailInfo.physInfo.eye == 3">  파란색</span>
          <span v-if="detailInfo.physInfo.eye == 4">  녹색</span>
        </div>
      </div>
    </div>

    <div v-if="detailInfo.resumeInfo.resumeTts != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>학교/회사명</b>
      </div>
      <div class="col-lg-10">
        <span v-if="detailInfo.resumeInfo.resumeTts != ''">#{{ detailInfo.resumeInfo.resumeTts }}</span>
      </div>
    </div>

    <div v-if="detailInfo.langInfos != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>사용 가능 언어</b>
      </div>
      <div class="col-lg-10">
        <span v-for="item in detailInfo.langInfos" v-bind:key="item.langCode">
          <b>{{ item.langTts }}</b>
            {{ item.langLvTts}}
          <br />
        </span>
      </div>
    </div>

    <div v-if="detailInfo.favCateInfo != '' " class="row loop-row">
      <div class="col-9 col-lg-2">
        <b>오디션 관심사</b>
      </div>
      <div class="col-lg-10">
        <span v-for="item in detailInfo.favCateInfo" v-bind:key="item">#{{ item }}</span>
      </div>
    </div>

    <div
      v-if="detailInfo.cutImgInfo.faceFile != null ||  detailInfo.cutImgInfo.sideFile != null
                                || detailInfo.cutImgInfo.wholeFile != null"
      class="row loop-row"
    >
      <div class="col-9 col-lg-2">
        <b>3컷 이미지</b>
      </div>
      <div class="col-lg-10">
        <div class="images" v-viewer>
          <div v-if="detailInfo.cutImgInfo.faceFile" style="display: inline; padding: 5px;">
            <img
              :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.cutImgInfo.faceFile"
              style="width: 130px;"
            />
          </div>
          <div v-if="detailInfo.cutImgInfo.sideFile" style="display: inline; padding: 5px;">
            <img
              :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.cutImgInfo.sideFile"
              style="width: 130px;"
            />
          </div>
          <div
            v-if="detailInfo.cutImgInfo.wholeFile"
            style="display: inline; padding: 5px;"
          >
            <img
              :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.cutImgInfo.wholeFile"
              style="width: 130px;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { getIdFromUrl } from 'vue-youtube'

export default {
    props : ['detailInfo'],
    data() {
        return {
            videoId : '',
            videoFlg : false
        }
    },
    created() {
        this.videoFileCheck(this.detailInfo.video)
    },
    methods : {
        videoFileCheck(fileName) {
            console.log(fileName)
            if(fileName.indexOf("https://youtu.be") == 0 || fileName.indexOf("http://youtu.be") == 0) {
                this.videoId = getIdFromUrl(this.detailInfo.video)
                this.videoFlg = true
            } else {
                this.videoFlg = false
            }
        }
    }
}   
</script>

<style>
</style>