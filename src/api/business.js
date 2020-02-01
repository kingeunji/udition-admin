import axios from 'axios'

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
  

export const business = {
    search(formData) {
        return request('post','biz/search', formData)
    },
    detail(formData) {
        return request('post','biz/detail', formData)
    },
    update(formData) {
        return request('post','biz/update', formData)
    }
} 

