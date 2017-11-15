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
          {{item.goodGroupId}}
        </span>
            <div v-for="x in item.goods" >
              <span>
                {{x.productNum}}
              </span>
              <span>
                <div class="cart-item-pic">
                  <img v-lazy="'/static/'+x.good.productImage" :alt="item.productName">
                </div>
              </span>
              <span>
                {{x.good.productName}}
              </span>
              <span>
                {{x.good.salePrice}}
              </span>
            </div>
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
        axios.get('/users/orderList',{
          params:{
            orderStatus:0
          }
        }).then(result=> {
         /* this.orderList = result.data.result.map((item)=>{
              var goodGroupId = item.goodGroupId;
              axios.get('/users/orderItem',{
                params:{
                  goodGroupId:goodGroupId
                }
              }).then(res=>{
                item["goods"] = res.data;
                return item;
             })
          });*/
       })
      }

    }
  }
</script>
