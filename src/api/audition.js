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
        throw status
      })
  }
  

export const audition = {
    count() {
        return request('post', 'audition/sideCnt', {})
    },
    search(formData) {
        return request('post','audition/search', formData)
    },
    pauseAudition(formData) {
        return request('post','audition/pauseAudition', formData)
    },
    detail(formData) {
        return request('post', 'audition/detail', formData)
    },
    update(formData) {
        return request('post', 'audition/update', formData)
    }
}

