import axios from 'axios'
import {
  Toast
} from 'mint-ui'
import store from '../store/store'
// import { getToken } from './auth'
import router from '../router'

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
  baseURL: process.env.JAVA_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.getToken) {
    config.headers['HTTP-X-Token'] = store.getters.getToken // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // if(response.status != 200){
    //   return Promise.reject('error')
    // }
    const res = response.data
    //  if (res.code !== 20000) {
    //    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //        confirmButtonText: '重新登录',
    //        cancelButtonText: '取消',
    //        type: 'warning'
    //      }).then(() => {
    //        store.dispatch('FedLogOut').then(() => {
    //          location.reload()// 为了重新实例化vue-router对象 避免bug
    //        })
    //      })
    //    }
    //    return Promise.reject('error')
    //  } else {
    //    return response.data
    //  }
    if (res.statusCode != 200) {
      if (res.statusCode === 1000) {
        store.dispatch('USER_LOGOUT')
      } else if (res.statusCode == 1006) {
        router.go(-1)
      } else if (res.statusCode != 11007) {
        Toast({
          message: res.msg,
          duration: 1000
        })
      } else {
        return Promise.reject(res)

      }
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error)// for debug
    console.log(error)
    if (error == 'Error: timeout of 15000ms exceeded') {
      store.dispatch('USER_LOGOUT')
    } else if (error == 'Error: Network Error') {
      store.dispatch('USER_LOGOUT')
    }
    return Promise.reject(error)
    // resolve()
  }
)

export function test(data) {
  return service({
    url: 'test',
    method: 'post',
    data: data
  })
}


// let url = 'http://api.hkdt.co/api'
// let url = 'http://47.74.208.191:9100/api'
const userUrl = ''
const assetsUrl = '/account'
const transferUrl = '/dw/user'
const C2CUrl = '/otc'

// 登錄註冊
// 獲取用戶信息
export function getUserInfo (userId) {
  return service({
    url: userUrl + '/user/info/' + userId,
    method: 'get'
  })
}

// 獲取銀行卡信息
export function getBankCardInfo (userId) {
  return service({
    url: userUrl + '/user/' + userId + '/banks',
    method: 'get'
  })
}

// 添加銀行卡
export function addBankCard (data) {
  return service({
    url: userUrl + '/user/banks',
    method: 'post',
    data: data
  })
}

// 提交身份認證信息
export function addUserVertify(data) {
  return service({
    url: userUrl + '/user/certification',
    method: 'post',
    data: data
  })
}

// 找回密碼
export function findPass (data) {
  return service({
    url: userUrl + '/user/changepsw',
    method: 'post',
    data: data
  })
}

// 根據手機號校驗驗證碼
export function checkPhoneCode (data) {
  return service({
    url: userUrl + '/user/checkverifycode',
    method: 'post',
    data: data
  })
}

// 根據手機號獲取驗證碼
export function getPhoneCode (data) {
  return service({
    url: userUrl + '/user/getVerifycode',
    method: 'post',
    data: data
  })
}

// 登錄
export function login (data) {
  return service({
    url: userUrl + '/user/login',
    method: 'post',
    data: data
  })
}

// 退出登錄
export function logout (userId) {
  return service({
    url: userUrl + '/user/logout/' + userId,
    method: 'get'
  })
}
// 註冊
export function register (data) {
  return service({
    url: userUrl + '/user/register',
    method: 'post',
    data: data
  })
}

// 获取用户币虚拟币账户 1
export function getUserAccountByCurrency (id, currency) {
  return service({
    url: assetsUrl + '/accounts/' + id + '/' + currency,
    method: 'get'
  })
}

// 获取用户账户资产明细 1
export function getAssetsDetail (userId, pageNo, pageSize) {
  return service({
    url: assetsUrl + '/c2c/account/asset/detail/' + userId + '/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}

// 传输费 1 （錢包地址 轉賬驗證碼）
export function getTransferFee (symbol, address) {
  return service({
    url: transferUrl + '/transfer/fee/' + symbol + '/' + address,
    method: 'get'
  })
}

export function getTransferList (id, symbol) {
  return service({
    url: transferUrl + '/transfer/list/' + id + '/' + symbol,
    method: 'get'
  })
}
// 获取钱包地址
export function getMyAddr (id, symbol) {
  return service({
    url: transferUrl + '/address/deposit/' + id + '/' + symbol + '/get',
    method: 'get'
  })
}

// 獲取轉賬驗證碼
export function getTransferCode (data) {
  return service({
    url: transferUrl + '/transfer/sendVerifyCode',
    method: 'post',
    data: data
  })
}

// 用户发起转账申请 1
export function transferByUser (data) {
  return service({
    url: transferUrl + '/transfer',
    method: 'post',
    data: data
  })
}

// C2C 用户服务API --郑昊辰
// 获取订单列表
export function getOrderList (data) {
  return service({
    url: C2CUrl + '/order',
    method: 'get',
    params: data
  })
}
// 用户下单
export function AddOrder (data) {
  return service({
    url: C2CUrl + '/order/add',
    method: 'post',
    data: data
  })
}

// 商家取消订单
export function merchantCancel (data) {
  return service({
    url: C2CUrl + '/order/merchant/cancel',
    method: 'post',
    data: data
  })
}

// 商家确认支付
export function merchantConfirm (data) {
  return service({
    url: C2CUrl + '/order/merchant/pay',
    method: 'get',
    params: data
  })
}

// 用户取消订单
export function custormCancel (data) {
  return service({
    url: C2CUrl + '/order/user/cancel',
    method: 'get',
    params: data
  })
}

// 用户确认支付
export function custormConfirm (data) {
  return service({
    url: C2CUrl + '/order/user/pay',
    method: 'get',
    params: data
  })
}

// 根据类型、币种获得交易信息列表
export function getTransactionsInfo (data) {
  return service({
    url: C2CUrl + '/transaction/list',
    method: 'get',
    params: data
  })
}

// 发布交易信息
export function publishTransaction (data) {
  return service({
    url: C2CUrl + '/transaction/add',
    method: 'post',
    data: data
  })
}

// 取消交易信息
export function cancelTransaction (id) {
  return service({
    url: C2CUrl + '/transaction/cancel',
    method: 'get',
    params: {
      transactionId: id
    }
  })
}

// 交易信息詳情
export function getTransactionById (id) {
  return service({
    url: C2CUrl + '/transaction/id',
    method: 'get',
    params: id

  })
}

// 訂單信息詳情
export function getOrderDetailById (id) {
  return service({
    url: C2CUrl + '/order/detail',
    method: 'get',
    params: {
      orderId: id
    }

  })
}

// 根据商家Id获得交易信息列表
export function getMerchantTransactionsInfo (merchantId) {
  return service({
    url: C2CUrl + '/transaction/' + merchantId,
    method: 'get'
  })
}




// TODO 待啟用
// 获取用户所有虚拟货币-
export function getAllCoinById (id) {
  return service({
    url: assetsUrl + '/accounts/' + id,
    method: 'get'
  })
}

// 获取当前支持的币种
export function getAllCurrencies () {
  return service({
    url: '/currencies',
    method: 'get'
  })
}


// C2C
// 获取用户账户资产充值入账明细---
export function getAssetsDepositDetail (userId, pageNo, pageSize) {
  return service({
    url: '/c2c/account/asset/deposit/detail/' + userId + '/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}



// 获取用户账户资产划转入账明细
export function getAssetsTransferInDetail (userId, pageNo, pageSize) {
  return service({
    url: '/c2c/account/asset/transfer/in/detail/' + userId + '/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}

// 获取用户账户资产划转出账明细
export function getAssetsTransferOutDetail (userId, pageNo, pageSize) {
  return service({
    url: '/c2c/account/asset/transfer/out/detail/' + userId + '/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}

// 获取用户账户资产提现出账明细
export function getAssetsWithdrawDetail (userId, pageNo, pageSize) {
  return service({
    url: '/c2c/account/asset/withdraw/detail/' + userId + '/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}

// 获取用户法币账户所有币种信息--列表
export function getAccountInfo (userId) {
  return service({
    url: assetsUrl + '/c2c/account/info/' + userId,
    method: 'get'
  })
}

// 获取用户法币账户指定币种信息
export function getAccountBySymbol (userId, symbol) {
  return service({
    url: assetsUrl + '/c2c/account/info/' + userId + '/' + symbol,
    method: 'get'
  })
}

// C2C交易是否支持的币种
export function checkSupportSymbol (symbol) {
  return service({
    url: '/c2c/currency/' + symbol + '/support',
    method: 'get'
  })
}

// 获取C2C交易支持的所有币种列表
export function getSupportList () {
  return service({
    url: '/c2c/currency/list',
    method: 'get'
  })
}

// 下边是后加接口=============================
// 获取最低交易金额
export function getLowerPrice (symbol) {
  return service({
    url: 'dw/user/withdraw/strategy/' + symbol + '/get',
    method: 'get'
  })
}
