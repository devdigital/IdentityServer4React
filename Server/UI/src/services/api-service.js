import axios from 'axios'

const baseUri = 'http://localhost:5000'

class ApiService {
  post(uri, data) {
    return axios(`${baseUri}${uri}`, {
      method: 'post',
      data,
      withCredentials: true,
    })
  }
}

export default new ApiService()
