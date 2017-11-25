// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
axios.defaults.withCredentials=true
import {host} from './config'
import Vuex from 'vuex';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/index'
import VueCookie from 'vue-cookie';
import Vuelidate from 'vuelidate'

// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Vuelidate)
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
    cartCount:(state)=>state.cartCount,
    nickName:(state)=>state.nickName
  },
  mutations:{
    //获取用户名
    updateUserInfo:(state,nickName)=>state.nickName=nickName,
    //获取购物车数量
    updateCartCount:(state,cartCount)=>state.cartCount += cartCount,
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
      axios.get(host+"/users/checkLogin").then(res=> {
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
      axios.get(host+'/users/getCartCount?userId='+userId+'').then(res=>{
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
