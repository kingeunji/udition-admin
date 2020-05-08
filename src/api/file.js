import axios from 'axios'

const domain = 'https://appapi.udition.co/api/'

const request = (method, url, data) => {
    return axios({
      method, 
      url: domain + url, 
      data
    }).then(result => result.data)
      .catch(result => {
        const {status} = result
        throw status
      })
  }
  

export const file = {
    upload(form) {
        return request('post','file/uploadFile', form, 
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
    }
} 

