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
    <van-submit-bar :price="totlaPrice" button-text="提交订单" @submit="onSubmit" :disabled="isDisabled">
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
import {getGoodList,wxPay} from '@/api/api/goodlist'

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
      isDisabled:true,
      title: '',
      price:0,
      timeExpire:'',
      timeStart:'',
      obj: null,
      message:{
        "body": "123",
        "openid": "o59BD6gee8fEoe_hFKqrzRDe67dA",
        "outTradeNo": "pay123456789",
        "totalFee": 0,
        "spbillCreateIp": "114.115.173.153",
        "timeExpire": "20220204180000",
        "timeStart": "20220204175000",
        "notifyUrl": "https://pay.wglink.com.cn/notify.php",
        "tradeType": "JSAPI"
      }
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
      let date6 = new Date()
      function dateFormatFn(date,format='YYYYMMDDHHmmss'){
　　   let config = {
        YYYY:date.getFullYear(),
        MM:date.getMonth()+1 >10?date.getMonth()+1:'0'+(date.getMonth()+1),
        DD:date.getDate()>10?date.getDate():'0'+(date.getDate()),
        HH:date.getHours()>10?date.getHours():'0'+(date.getHours()),
        mm:date.getMinutes()>10?date.getMinutes():'0'+(date.getMinutes()),
        ss:date.getSeconds()>10?date.getSeconds():'0'+(date.getSeconds()),
　　  }
      for(const key in config){
      format = format.replace(key,config[key])
      }
      return format
      }
      let time = dateFormatFn(date6)
      this.timeStart = parseInt(time)
      this.timeExpire = parseInt(time) + 500
      this.message.timeStart = this.timeStart
      this.message.timeExpire = this.timeExpire
      this.message.outTradeNo =  this.timeStart + 'md5'
      this.wxPay(this.message);
      setTimeout(()=>{
        this.getRequestPayment(this.obj)
      },2000)
      
    },
    getGoodList(){
      getGoodList().then(res=>{
        this.list = res.data
      })
    },
    wxPay(message){
      wxPay(message).then(res=>{
        this.obj = res
      })
    },
     getRequestPayment(data) {
				function onBridgeReady() {
					WeixinJSBridge.invoke(
						"getBrandWCPayRequest", {
							"appId": data.appId, //公众号ID，由商户传入     
							"timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数     
							"nonceStr": data.nonceStr, //随机串     
							"package": data.package,
							"signType": data.signType, //微信签名方式：     
							"paySign": data.paySign //微信签名 
						},
						function(res) {
							alert(JSON.stringify(res));
							// get_brand_wcpay_request
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							}
						}
					);
				}
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener(
							"WeixinJSBridgeReady",
							onBridgeReady,
							false
						);
					} else if (document.attachEvent) {
						document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
						document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
					}
				} else {
					onBridgeReady();
				}
			}
  },
  computed:{
    totlaPrice(){
      let sum = 0
      for(let i = 0; i < this.result.length; i++){
        sum += this.result[i].money
      }
      this.price = sum*100
      return sum*100
    }
  },
  created() {
    this.getGoodList()
    this.title = localStorage.getItem('username')
  },
  updated(){
    this.message.totalFee = this.price
    if(this.result.length >=1){
      this.isDisabled = false
    }else{
      this.isDisabled = true
    }
  }
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


