<template>
  <div class="goodlist">
    <van-nav-bar :title="title"/>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
    <van-cell-group>
    <van-cell
      v-for="(item, index) in list"
      clickable
      :key="item.id"
      :title="`${item.id}.${item.name}`"
      :value="`￥${item.money}`"
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
import {getGoodList} from '@/api/api/goodlist'

Vue.use(SubmitBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(NavBar);
export default {
  data() {
    return {
      list: [],
      result: [],
      checked:false,
      total:0,
      title:''
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

    },
    getGoodList(){
      getGoodList().then(res=>{
        this.list = res.data
      })
    }
  },
  computed:{
    totlaPrice(){
      let sum = 0
      for(let i = 0; i < this.result.length; i++){
        sum += this.result[i].money
      }
      return sum*100
    }
  },
  created() {
    this.getGoodList()
    this.title = Object.values(this.$route.query).reduce((preValue,currentValue) =>{
      return preValue  + currentValue
    })
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


