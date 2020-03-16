<template>
  <div class="detail_pannel">
      오디션
      <div class="row loop-row" v-for="audition in this.auditionList" v-bind:key="audition.auditionNo">
          <div class="col-3 col">
          </div>
      </div>
      {{auditionList}}
  </div>
</template>

<script>
import {audition} from '../../api/audition'

export default {
    props: ['bizNo'],
    data() {
        return {
            auditionList : []
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            var form = { bizNo : this.bizNo, filterType : 3, pageSize : 10 }
            console.log(form + ", " + this.bizNo)
            audition.search(form)
                    .then(data => {
                        this.auditionList = data.results
                    })
        }
    }

}
</script>

<style>

</style>