<template>
  <div>
    <nav-header></nav-header>
    <h1>未支付订单</h1>
    <ul>
      <li v-for="item in orderList" >
        <span>{{item.id}}</span>
        <span>
          {{item.address.userName}}
        </span>
         <span>
          {{item.address.streetName}}
        </span>
        <span>
            <router-link :to="{path:'OrderItem',query:{'goodGroupId':item.goodGroupId}}">订单详情</router-link>
        </span>
         <span>
          {{item.address.postCode}}
        </span>
        <span>
          {{item.address.tel}}
        </span>
      </li>
    </ul>

    <h1>已完成订单</h1>
    <ul>
      <li v-for="item in orderList1" >
        <span>{{item.id}}</span>
        <span>
          {{item.address.userName}}
        </span>
        <span>
          {{item.address.streetName}}
        </span>
        <span>
            <router-link :to="{path:'OrderItem',query:{'goodGroupId':item.goodGroupId}}">订单详情</router-link>
        </span>
        <span>
          {{item.address.postCode}}
        </span>
        <span>
          {{item.address.tel}}
        </span>
      </li>
    </ul>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import {host} from '../config'
  export default{
    data(){
      return{
        orderList:[],
        orderList1:[]
      }
    },
    components:{
      NavHeader,
      NavFooter
    },
    mounted(){
        this.getOrderList();
      this.getOrderList1();
    },
    methods:{
      getOrderList(){
        var userId =  this.$cookie.get('userId');
        axios.get(host+'/users/orderList',{
          params:{
            orderStatus:0,
            userId:userId
          }
        }).then(res=>{
          this.orderList = res.data.result;

        });
      },
      getOrderList1(){
        var userId =  this.$cookie.get('userId');
        axios.get(host+'/users/orderList',{
          params:{
            orderStatus:1,
            userId:userId
          }
        }).then(res=>{
          this.orderList1 = res.data.result;

        });
      }
    }
  }
</script>


