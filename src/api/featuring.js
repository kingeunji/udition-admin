import axios from 'axios'

// const domain = 'http://192.168.0.65:8085/api/'
const domain = 'https://webapi.udition.co/api/'


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
    sideCnt(formData) { 
        return request('post', 'featuring/profile/sideCnt', formData)
    },

}

