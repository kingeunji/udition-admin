<template>
  <div class="detail_pannel">
        <div v-if="collectionList.length > 0">
            <div v-for="item in collectionList" class="row loop-row" v-bind:key="item.expNo" style="border-bottom: solid 1px #ccc;">
                <div class="col-12" v-if="item.title != ''" style="margin-top: 2px;">
                    <b> {{ item.title }} </b>
                </div>
                <div class="col-12" v-if="item.roll != ''" style="margin-top: 2px;">
                    {{ item.roll }}  : {{ item.term }}
                </div>
                <div class="col-12" v-if="item.intro != ''" style="margin-top: 5px;">
                    {{ item.intro }} 
                </div>
                <div class="col-12" v-if="item.detail != ''" style="margin-top: 5px;">
                    {{ item.detail }} 
                </div>
                <div class="col-12" style="margin-top: 10px; margin-bottom: 15px;">
                    <div v-if="item.referencesItems.length" class="images" v-viewer>
                        
                        <div v-for="images in item.referencesItems" v-bind:key="images" style="display : inline;">

                            <div v-if="videoFileCheck(images)">
                                <youtube :video-id=videoFileCheck(images) style="width:200px; height:162px;" class="img-fluid"> </youtube>
                            </div>
                            <div v-else style="display : inline;">
                                <img :src="'https://storage.googleapis.com/udition-web/fileFolder/' + images"  style="width: 120px; margin-right: 10px; margin-top:5px; border-radius: 5px;"/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 15px;">
                <el-pagination
                    layout="prev, pager, next"
                    :total="this.pagination.dbCount"
                    @current-change="pageChange"
                    @next-click="pageChange"
                    @prev-click="pageChange">
                </el-pagination>
            </div>
        </div>
        <div v-else>
          컬렉션이 없습니다.
        </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { getIdFromUrl } from 'vue-youtube'
import { experience } from '../../api/experience'

export default {
    props : ['collectionForm'],
    data() {
        return {
            loading : true,
            collectionList : [],
            pagination : ''
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            experience.search(this.collectionForm)
                      .then(data => {
                          this.collectionList = data.results
                          this.pagination = data.page
                          this.loading = false
                      })
        },
        videoFileCheck(fileName) {
            if(fileName.indexOf("https://youtu.be") == 0 || fileName.indexOf("http://youtu.be") == 0) {
                return getIdFromUrl(fileName)
            } else {
                return false
            }
        },
        pageChange(val) {
            this.collectionForm.requestPage = (val-1)
            this.fetchData()
        },
    }
}
</script>

<style scoped>

</style>