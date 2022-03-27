import { http } from './http_service'

export function getCustomers() {
  return http().get('/customers')
}