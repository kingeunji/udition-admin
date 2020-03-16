import axios from 'axios'

const domain = 'http://35.243.93.121:8080/pickleAPI/api/'

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
    upload(multipartFile) {
        return request('post','file/uploadFile', { file : multipartFile }, 
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
    }
} 

