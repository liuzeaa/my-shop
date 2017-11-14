// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Vuex from 'vuex';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/index'
import VueCookie from 'vue-cookie';
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyload,{
  loading:'static/loading-svg/loading-bars.svg',
  attempt:3
})
Vue.filter("currency",currency);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  getters:{
    cartCount(state){
      return state.cartCount
    }
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){
      state.cartCount = cartCount
    },
    increment (state,cartCount) {
      state.cartCount = state.cartCount+cartCount
    },
    decrement(state,cartCount){
      state.cartCount = state.cartCount-cartCount
    },
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    this.checkLogin();
    this.getCartCount();
  },
  methods:{
    checkLogin(){
      axios.get("users/checkLogin").then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/goods"){
            this.$router.push("/goods");
          }
        }
      });
    },
    getCartCount(){
      var userId =  this.$cookie.get('userId');
      axios.get('users/getCartCount?userId='+userId+'').then(res=>{
        var res= res.data;
        if(res.status=='0'){
          this.$store.commit("updateCartCount",res.result);
        }
      })
    }
  },
  template: '<App/>',
  components: { App }
})
