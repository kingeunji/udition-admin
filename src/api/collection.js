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
  

export const collection = {
    list(form) {
        return request('post','collection/search', form)
    },
    update(form) {
        return request('post', 'collection/update', form)
    }
}

