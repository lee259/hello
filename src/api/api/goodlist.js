import { request } from "../request";

export function getGoodList() {
  return request({
    url: '/Price',
    method: 'POST',
  })
}