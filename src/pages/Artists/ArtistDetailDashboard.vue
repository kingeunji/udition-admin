<template>
  <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
          <card class="card-user">
            <div slot="image">
                <el-image :src="'https://storage.googleapis.com/udition-web/fileFolder/' + detailInfo.image" alt="..."> </el-image>
            </div>
            <div>
                <div class="author">
                    <div class="avatar" alt="..."> </div>
                    <h4 class="title">{{ detailInfo.fullName }}
                    <br>
                    <small>@{{ detailInfo.stageName }}</small>
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

<script>
import {artist} from '../../api/artist.js'
import Profile from './Profile.vue'
import Career from './Career.vue'
import Collection from './Collection.vue'


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
            }
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