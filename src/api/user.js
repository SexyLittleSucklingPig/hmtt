import request from '@/utils/request'
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
    url: 'user'
  })
}
