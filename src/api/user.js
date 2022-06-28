import request from '@/utils/request'
import store from '@/store' // 因为获取数据需要传请求头与token拼接 所以引入store
// 获取短信验证码
export const getSmscode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户信息api  （token）
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      // 请求头 前面要加'Bearer '和token拼接
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
