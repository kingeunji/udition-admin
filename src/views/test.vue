<template>
  <div>
    {{ data }} <br><br>

    {{ detailInfo.fullName }} <br>
    {{ detailInfo.email }}
    {{ detailInfo.stageName }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            data : [],
            error : '',
            detailInfo : {}
        }
    },
    created() {
        this.fetchData()
    },
    methods : {
        fetchData() {
            // const headers = {
            //                     'Content-Type' : 'application/json',
            //                     'uid' : 'PuWOJQmGrVN6sGUTu9n0BIy0PPY2', 
            //                     'targetuid' : 'PuWOJQmGrVN6sGUTu9n0BIy0PPY2'
            //                 }
            // const parameter = ""

            // axios.post('https://appapi.udition.co/api/member/detail', parameter , {
            //     headers : headers
            // })
            //     .then(res => this.data = res.data)
            //     .catch(res => this.data = res)


            axios.post('http://webapi.udition.co/api/profile/detail', { webUrl : 'R27557'})
                 .then(res => {
                    this.data = res.data.result
                    this.detailInfo.fullName = this.data.fullName
                    this.detailInfo.email = this.data.email
                    this.detailInfo.stageName = this.data.stageName

                 })
                 .catch(res => this.error = res)




        }
    }
} 
</script>

<style>

</style>