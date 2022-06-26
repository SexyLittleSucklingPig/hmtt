import request from '@/utils/request'
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
