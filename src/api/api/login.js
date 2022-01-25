import { request } from "../request";

export function postCount(id) {
  return request({
    url: '/home/multidata',
    params: {
      id
    }
  })
}