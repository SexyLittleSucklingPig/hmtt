import request from '@/utils/request'
// 获取用户频道API
export const getchannels = () => {
  return request({
    url: 'user/channels'
  })
}
// 获取文章列表
// eslint-disable-next-line camelcase
export const getArticlist = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}
// 获取所有列表
export const getAllList = () => {
  return request({
    url: 'channels'
  })
}
// 频道持久化
export const saveChangels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
