import { request } from "../request";

export function getGoodList() {
  return request({
    url: '/Price',
    method: 'POST',
  })
}
export function wxPay(message) {
  return request({
    url: 'pay/createOrder',
    method: 'POST',
    data: message
  })
}
