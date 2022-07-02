
// 读取本地
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
// 添加
export function setItem (key, value) {
  if (typeof value === 'object') {
    console.log(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.removeItem(key, value)
  }
}
// 删除
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 清除
export function clearItem () {
  window.localStorage.removeItem()
}
