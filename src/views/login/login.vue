<template>
  <div class="login">
    <input
      type="number"
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
      >禁用状态</van-button
    >
  </div>
</template>

<script>
import Vue from "vue";
import {postCount} from '@/api/api/login'
import { Button } from "vant";


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
      if (this.inputValue.length > 8) {
        this.isDisabled = false;
      }
    },
    btnClick() {
      this.isLoading = true;
      this.postCount(this.inputValue)
      this.$router.push("/goodList");
    },
    postCount(inputValue){
      postCount(inputValue).then(res =>{
        console.log(res);
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