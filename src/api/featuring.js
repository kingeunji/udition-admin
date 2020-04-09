import axios from 'axios'

// const domain = 'http://192.168.0.65:8085/api/'
const domain = 'https://webapi.udition.co/api/'
// const domain = 'http://localhost:8082/api/'


const request = (method, url, data) => {
    return axios({
      method, 
      url: domain + url, 
      data
    }).then(result => result.data)
      .catch(result => {
        const {status} = result.response
        throw status
      })
  }
  

export const featuring = {
    noFeatList(formData) {
      return request('post','featuring/profile/noFeatList', formData)
    },
    search(formData) {
      return request('post', 'featuring/profile/search', formData)
    },
    sideCnt() { 
        return request('post', 'featuring/profile/sideCnt', {})
    },
    insert(formData){
        return request('post', 'featuring/profile/insert', formData)
    },
    updateSort(formData) {
        return request('post', 'featuring/profile/updateList', formData)
    },
    delete(featuringNo) {
        return request('post', 'featuring/profile/delete', {featuringNo : featuringNo} )
    },
    noFeatAuditionList(formData){
      return request('post', 'featuring/audition/noFeatList', formData)
    },
    auditionInsert(formData){
      return request('post', 'featuring/audition/insert', formData)
    },
    auditionSearch(formData){
      return request('post', 'featuring/audition/search', formData)
    },
    auditionDelete(featuringNo){
      return request('post', 'featuring/audition/delete', {featuringNo : featuringNo})
    },
    auditionUpdateSort(formData) {
        return request('post', 'featuring/audition/updateList', formData)
    },

}

