/* eslint-disable */
export default [

    // Clientes
    {
      path: '/customers/customer/list',
      name: 'customer-list',
      component: () => import('@/views/customers/CustomerList.vue'),
    },

     // Servicios
     {
      path: '/services/list',
      name: 'service-list',
      component: () => import('@/views/services/ServiceList.vue'),
    },  
  
  ]
  