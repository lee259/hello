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
    
  </div>
</template>

<script>
import Vue from "vue";
import {postCount} from '@/api/api/login'
import { Button } from "vant";
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Button);
export default {
  data() {
    return {
      inputValue: '',
      isDisabled: true,
      isLoading: false,
    };
  },
  methods: {
    inputClick() {
      if (19 < this.inputValue.length > 7) {
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
          Toast('您的账号输入有误');
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