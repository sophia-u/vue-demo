import request from '@utils/request.js'

export default {
  getInfo ({ id = '', name = '', page = 0, pageSize = 10 }) {
    return request({
      url: `/api/info?id=${id}&name=${name}&page=${page}&page_size=${pageSize}`,
      method: 'get'
    })
  },
  addInfo (data) {
    return request({
      url: '/api/info',
      method: 'post',
      data
    })
  },
  updateInfo (data) {
    return request({
      url: '/api/info',
      method: 'put',
      data
    })
  },
  deleteInfo ({ id = '', name = '' }) {
    return request({
      url: `/api/info?id=${id}&name=${name}`,
      method: 'delete'
    })
  }
}