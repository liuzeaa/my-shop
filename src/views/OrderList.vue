<template>
  <div>
    <h1>未支付订单</h1>
    <div><span>订单编号</span></div>
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
           <ol>
              <li v-for="x in item.goods">
                  <span>
                    {{x.productNum}}
                  </span>
                  <span>
                    <div class="cart-item-pic">
                      <img v-lazy="'/static/'+x.good.productImage" >
                    </div>
                  </span>
                  <span>
                    {{x.good.productName}}
                  </span>
                  <span>
                    {{x.good.salePrice}}
                  </span>
              </li>
           </ol>
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
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        orderList:[]
      }
    },
    mounted(){
        this.getOrderList();

    },
    methods:{
      getOrderList(){
        var userId =  this.$cookie.get('userId');
        axios.get('/users/orderList',{
          params:{
            orderStatus:0,
            userId:userId
          }
        }).then(res=>{
          //this.orderList = res.data.result;
          this.orderList = res.data.result.forEach((item)=>{
              axios.get('/users/orderItem',{
                  params:{
                    goodGroupId:item.goodGroupId,
                    userId:userId
                  }
              }).then(res2=>{
                  debugger;
                item["goods"] = res2.data;
              })
          })
        });
      }
    }
  }
</script>


