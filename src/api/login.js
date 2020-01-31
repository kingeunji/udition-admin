import axios from 'axios'

//const domain = 'http://192.168.0.65:8081/api/'
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
  

export const auth = {
    login(email, password) {
        let form = {email : email , password : password}
        return request('post','login/adminCheck', form)
    }
}

