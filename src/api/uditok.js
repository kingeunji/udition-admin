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
  

export const uditok = {
    search(form) {
        return request('post','udiTok/search', form)
    },
    delete(tokNo) {
        return request('post', 'udiTok/delete', { tokNo : tokNo } )
    }
}

