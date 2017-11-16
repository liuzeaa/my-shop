<template>
    <div>
      <nav-header></nav-header>
      <div class="item-list-wrap confirm-item-list-wrap">
        <div class="cart-item order-item">
          <div class="cart-item-head">
            <ul>
              <li>商品</li>
              <li>单价</li>
              <li>数量</li>
              <li>小计</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in orderItem" v-if="item.checked=='1'">
              <div class="cart-tab-1">
                <div class="cart-item-pic">
                  <img v-lazy="'/static/'+item.good.productImage" :alt="item.good.productName">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.good.productName}}</div>

                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{item.good.salePrice|currency('￥')}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self">
                    <div class="select-self-area">
                      <span class="select-ipt">×{{item.productNum}}</span>
                    </div>
                  </div>
                  <div class="item-stock item-stock-no">有货</div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{(item.good.salePrice*item.productNum)|currency('￥')}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import axios from 'axios';
    export default {
        name: 'HelloWorld',
        data () {
            return {
              orderItem:[]
            }
        },
      components:{
        NavHeader,
        NavFooter
      },
      mounted(){
        this.getOrderItem();
      },
      methods:{
          getOrderItem(){
              var goodGroupId = this.$route.query.goodGroupId,userId = this.$cookie.get('userId');
              axios.get('/users/orderItem',{
                  params:{
                    goodGroupId:goodGroupId,
                    userId:userId
                  }
              }).then(res=>{

                  this.orderItem= res.data;
              })
          }
      }
    }
</script>

<style scoped>

</style>
