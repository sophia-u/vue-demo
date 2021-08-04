import request from '@utils/request.js'

export default {
  login (data) {
    return request({
      url: '/api/login',
      method: 'post',
      data
    })
  },
  logout (data) {
    return request({
      url: '/api/logout',
      method: 'post',
      data
    })
  }
}