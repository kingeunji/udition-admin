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
  

export const qna = {
    search(form) {
        return request('post','qna/search', form)
    },
    delete(qnaNo) {
      return request('post', 'qna/delete', {qnaNo : qnaNo})
    },
    insert(form) {
      return request('post', 'qna/insert', form)
    },
    update(form) {
      return request('post', 'qna/update', form)
    },
    updateList(form){
      return request('post', 'qna/updateList', form)
    }

}

