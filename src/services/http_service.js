/* eslint-disable */
import axios from 'axios'
import store from '@/store/index'

export function http() {
  return axios.create({
    baseURL: store.state.api.apiURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken').replace(/['"]+/g, '')}`
    }
  })
}

export function httpFile() {
  return axios.create({
    baseURL: store.state.api.apiURL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
