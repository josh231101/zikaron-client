import axios from 'axios'
import config from '../../config'

const apiClient = axios.create({
  baseURL: `${config.homeUrl}/api/v1/`
})


export default apiClient
