import axios from 'axios'

const baseUri = 'http://localhost:5000'

class ApiService {
  get(uri) {
    return axios(`${baseUri}${uri}`, {
      method: 'get',
      withCredentials: true,
    })
  }

  post(uri, data) {
    return axios(`${baseUri}${uri}`, {
      method: 'post',
      data,
      withCredentials: true,
    })
  }
}

export default new ApiService()
