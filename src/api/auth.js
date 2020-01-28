import axios from 'axios'

const domain = 'http://webapi.udition.co/api/'
  
const request = {
    get(path) {
      return axios.get(`${domain + path}`)
        .catch(({response}) => {
          const {status} = response
          throw Error(response)
        })
    },
    post(path, data) {
      return axios.post(`${domain + path}`, data)
    },
    delete(path) {
      return axios.delete(`${domain + path}`)
    },
    put(path, data) {
      return axios.put(`${domain + path}`, data)
    }
}
  
export const auth = {
    login(email, password) {
        return request.post('/login/adminCheck', {email, password})
            .then(({data}) => data)
    }
}