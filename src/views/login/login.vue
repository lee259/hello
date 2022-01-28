<template>
  <div class="login">
    <input
      type="text"
      class="input"
      @input="inputClick"
      v-model="inputValue"
      placeholder="请输入账号"
    />
    <van-button
      :disabled="isDisabled"
      type="primary"
      :loading="isLoading"
      @click="btnClick"
      >登录</van-button
    >
    <van-popup v-model="show">您的账号输入错误</van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import {postCount} from '@/api/api/login'
import { Button } from "vant";
import { Popup } from 'vant';

Vue.use(Popup);
Vue.use(Button);
export default {
  data() {
    return {
      inputValue: '',
      isDisabled: true,
      isLoading: false,
      show:false
    };
  },
  methods: {
    inputClick() {
      if (this.inputValue.length > 8) {
        this.isDisabled = false;
      }
    },
    btnClick() {
      this.isLoading = true;
      this.postCount(this.inputValue)
    },
    postCount(inputValue){
      postCount(inputValue).then(res =>{
        let username = res.data
        if(res.code !=200){
          this.show = true
          this.isLoading = false
        }else{
          setTimeout(()=>{
            this.$router.push({path:"/goodList",
                               query:username});
          },5000)
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
@media screen and(min-width:750px) {
  @import url("./index-p.less");
}
@media screen and(max-width:400px) {
  @import url("./index-m.less");
}
</style>