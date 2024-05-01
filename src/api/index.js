import axiosInstance from "./axiosInstance"

const sendRequest = async (method, endPoint, body, headers) => {
  const baseHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  const config = {
    method,
    endPoint,
    headers: { ...baseHeaders, ...headers },
  }

  if (body) {
    config.data = body
  }

  return axiosInstance(config)
}

export const get = (endPoint, headers = {}) => {
  return sendRequest("get", endPoint, null, headers)
}

export const post = (endPoint, body, headers = {}) => {
  return sendRequest("post", endPoint, body, headers)
}

export const put = (endPoint, body, headers = {}) => {
  return sendRequest("put", endPoint, body, headers)
}

export const del = (endPoint, headers = {}) => {
  return sendRequest("delete", endPoint, null, headers)
}
