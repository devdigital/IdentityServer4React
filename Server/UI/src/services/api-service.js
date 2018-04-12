import axios from 'axios'

const baseUri = 'http://localhost:5000'

class ApiService {
  post(uri, data) {
    return axios.post(`${baseUri}${uri}`, data)
  }
}

export default new ApiService()
