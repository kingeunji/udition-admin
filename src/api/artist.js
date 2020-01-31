import axios from 'axios'

//const domain = 'http://192.168.0.65:8081/api/'
const domain = 'https://webapi.udition.co/api/'


const request = (method, url, data) => {
    return axios({
      method, 
      url: domain + url, 
      data
    }).then(result => result.data)
      .catch(result => {
        const {status} = result.response
        if (status === UNAUTHORIZED) onUnauthorized()
        throw result.response
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
    }
}

