import Axios from 'axios';


const axiosInstance = Axios.create({
  baseURL: 'https://corona.lmao.ninja'
})

export default axiosInstance;