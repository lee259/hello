<template>
  <div class="goodlist">
    <van-nav-bar title="标题"/>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
    <van-cell-group>
    <van-cell
      v-for="(item, index) in list"
      clickable
      :key="item"
      :title="`复选框 ${item}`"
      @click="toggle(index)"
    >
      <template #right-icon>
        <van-checkbox :name="item" ref="checkboxes"/>
      </template>
    </van-cell>
    </van-cell-group>
    </van-checkbox-group>
    <van-submit-bar :price="totlaPrice" button-text="提交订单" @submit="onSubmit">
    <van-checkbox  @click="toggleAll" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Cell, CellGroup } from 'vant';
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(NavBar);
export default {
  data() {
    return {
      list: ['a', 'b'],
      result: [],
      price:[2000,3000],
      checked:false,
      total:0,
    };
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
     toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    onSubmit(){

    }
  },
  computed:{
    totlaPrice(){
      let sum = 0
      for(let i = 0; i < this.result.length; i++){
        sum += this.price[i]
      }
      return sum
    }
  }
};
</script>

<style>
@media screen and(min-width:750px) {
  @import url("./index-p.less");
}
@media screen and(max-width:360) {
  @import url("./index-m.less");
}

</style>