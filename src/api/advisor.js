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
  

export const advisor = {
    search(form) {
        return request('post','advisor/search', form)
    },
    delete(id) {
      return request('post', 'advisor/delete', {id : id})
    },
    insert(form) {
      return request('post', 'advisor/insert', form)
    },
    update(form){
      return request('post', 'advisor/update', form)
    },
    updateList(form){
      return request('post', 'advisor/updateList', form)
    }

}

