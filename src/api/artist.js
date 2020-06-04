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
  

export const artist = {
    search(formData) {
        return request('post','artistFilter/search', formData)
    },
    update(formData) { 
        return request('post', 'member/updateList', formData)
    },
    detail(formData) {
      return request('post', 'profile/detail', formData)
    },
    mail(formData){
      return request('post', 'member/mail', formData)
    },
    push(formData){
      return request('post', 'member/push', formData)
    },
    deleteFile(formData){
      return request('post', 'file/deleteFile', formData)
    }
}

