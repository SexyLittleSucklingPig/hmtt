import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 语言配置为中文
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 变为相对时间
export const datefromat = (time) => {
  return dayjs(time).fromNow()
}
