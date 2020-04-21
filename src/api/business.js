import axios from 'axios'

const domain = 'https://webapi.udition.co/api/'
// const domain = 'http://localhost:8082/api/'

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
  

export const business = {
    search(formData) {
        return request('post','biz/search', formData)
    },
    detail(formData) {
        return request('post','biz/detail', formData)
    },
    update(formData) {
        return request('post','biz/update', formData)
    },
    billingSearch(formData) {
        return request('post', 'billing/search', formData)
    },
    subDetail(bizNo) {
      return request('post','biz/sub/detail', { bizNo:bizNo })
    },
    subUpdate(formData) {
      return request('post','biz/sub/update', formData)
    },
    mail(formData) {
      return request('post', 'biz/mail', formData)
    },
    push(formData) {
      return request('post', 'biz/push', formData)
    },
    logSearch(formData) {
      return request('post', 'biz/log/search', formData)
    },
    logInsert(formData) {
      return request('post', 'biz/log/insert', formData)
    },
    memberSearch(formData) {
      return request('post', 'bizMember/search', formData)
    },
    memberUpdate(formData){
      return request('post', 'bizMember/update', formData)
    }
} 
