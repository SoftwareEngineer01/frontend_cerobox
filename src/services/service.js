import { http } from './http_service'

export function getServices() {
  return http().get('/services')
}

export function addService(service) {
  return http().post('/services', service)
}

export function updateService(service) {
  return http().post(`/services/${service.id}`, service)
}

export function deleteService(id) {
  return http().post(`/services/deleteService/${id}`)
}