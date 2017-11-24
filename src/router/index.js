import Vue from 'vue'
import Router from 'vue-router'
const GoodsList = ()=> import('@/views/GoodsList');
const Cart = ()=> import('@/views/Cart');
const Address = ()=> import('@/views/Address');
const OrderConfirm = ()=> import('@/views/OrderConfirm');
const OrderSuccess = ()=> import('@/views/OrderSuccess');
const OrderList = ()=> import('@/views/OrderList');
const OrderItem = ()=> import('@/views/OrderItem');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path:'/goods',
      name:'GoodsList',
      component:GoodsList
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/address',
      name:'Address',
      component:Address
    },
    {
      path:'/orderConfirm',
      name:'OrderConfirm',
      component:OrderConfirm
    },
    {
      path:'/orderSuccess',
      name:'OrderSuccess',
      component:OrderSuccess
    },
    {
      path:'/OrderList',
      name:'OrderList',
      component:OrderList
    },
    {
      path:'/OrderItem',
      name:'OrderItem',
      component:OrderItem
    }
  ]
})
