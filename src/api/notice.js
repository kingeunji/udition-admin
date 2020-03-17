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
  

export const notice = {
    search(form) {
        return request('post','notice/search', form)
    },
    delete(noticeNo) {
        return request('post', 'notice/delete', { noticeNo : noticeNo } )
    },
    insert(form) {
        return request('post', 'notice/insert', form)
    },
    update(form){
        return request('post', 'notice/update', form)
    }
}

