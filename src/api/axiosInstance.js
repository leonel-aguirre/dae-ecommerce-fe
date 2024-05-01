import axios from "axios"

// TODO: Change for an environment variable.
const baseURL = "http://localhost:4000/api"

// TODO: Maybe this will need an interceptor setup.
const axiosInstance = axios.create({
  baseURL,
})

export default axiosInstance
