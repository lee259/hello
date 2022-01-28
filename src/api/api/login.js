import { request } from "../request";

export function postCount(username) {
  return request({
    url: '/Verify',
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      'username': username
    }
  })
}