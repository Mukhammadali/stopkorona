import Axios from 'axios';


const axiosInstance = Axios.create({
  baseURL: 'https://disease.sh/v3/covid-19'
})

export default axiosInstance;