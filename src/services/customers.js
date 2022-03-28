import { http } from './http_service'

export function getCustomers() {
  return http().get('/customers')
}

export function addCustomer(customer) {
  return http().post('/customers', customer)
}

export function updateCustomer(customer) {
  return http().post(`/customers/${customer.id}`, customer)
}