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
  

export const experience = {
    search(formData) {
        return request('post','experience/search', formData)
    }
} 

