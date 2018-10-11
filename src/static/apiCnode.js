import axios from 'axios'

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
  baseURL: ' http://47.74.208.191:9100/api/bbs/', // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.getToken) {
  //   config.headers['HTTP-X-Token'] = store.getters.getToken // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 获得文章列表
export function getArticleListByType (type, data) { // new hot
  return service({
    url: 'article/list/' + type,
    method: 'get',
    params: data
  })
}

// 获取文章详情
export function getArticleDetailById (articleId) {
  return service({
    url: 'article/' + articleId,
    method: 'get'
  })
}

// 加入社区
export function johnArea (appId, userId) {
  return service({
    url: '/community/join/' + appId + '/' + userId,
    method: 'post'
  })
}

// 点赞
export function goodReply (replyId, userId) {
  return service({
    url: 'like/' + replyId + '/' + userId,
    method: 'post'
  })
}

// 添加评论
export function addReply (data) { // articleId, content, userId,replyId
  return service({
    url: 'reply/addReply',
    method: 'post',
    data: data
  })
}

// 根据帖子ID查询所有的评论回复信息
export function getReplysByArticleId (data) { // articleId, userId
  return service({
    url: 'reply/getReplysByArticleId',
    method: 'post',
    data: data
  })
}

// 根据帖子ID，评论ID获取回复的数据
export function getReplysByReplyId (data) { // articleId, userId, replyId
  return service({
    url: 'reply/getReplysByReplyId',
    method: 'post',
    data: data
  })
}

// 以下是condo的接口
export function getArticleListCount (ak) {
  return service({
    url: 'https://cnodejs.org/api/v1/message/count?accesstoken=' + ak,
    method: 'get'
  })
}

export function getList () {
  return service({
    url: 'https://cnodejs.org/api/v1/topics',
    method: 'get'
  })
}

export function getListByType (page, type) {
  return service({
    url: 'https://cnodejs.org/api/v1/topics',
    method: 'get',
    params: {
      page: page,
      tab: type
    }
  })
}

export function getContentById (id) {
  return service({
    url: 'https://cnodejs.org/api/v1/topic/' + id,
    method: 'get'
  })
}

export function getCollectByName (name) {
  return service({
    url: 'https://cnodejs.org/api/v1/topic_collect/' + name,
    method: 'get'
  })
}

export function getCollectByToken (name, token, id) {
  return service({
    url: 'https://cnodejs.org/api/v1/topic_collect/' + name,
    method: 'get',
    params: {
      accesstoken: token,
      topic_id: id
    }
  })
}

export function getReply (id, params) {
  return service({
    url: 'https://cnodejs.org/api/v1/topic/' + id + '/replies',
    method: 'get',
    params: params
  })
}

export function getUps (upsId, params) {
  return service({
    url: 'https://cnodejs.org/api/v1/reply/' + upsId + '/ups',
    method: 'get',
    params: params
  })
}
