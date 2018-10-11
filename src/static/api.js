import axios from 'axios'
import router from '../router'
import store from '../store/store'

const instance = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 10000
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.getters.Token) {
    config.headers['X-token'] = store.getters.Token// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log(response.data)

  // 对响应数据做点什么
  if (response.data && response.data.error_code) {
    var code = response.data.error_code
    switch (code) {
      case 3012:
        store.dispatch('UserLogout')
        router.push({
          name: 'Login'
        })
        break
      case 3015:
        store.dispatch('UserLogout')
        router.push({
          name: 'Login'
        })
        break
      case 3005:
        store.dispatch('UserLogout')
        router.push({
          name: 'Login'
        })
        break
    }
  }
  response = response.data
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const api = {

  // 新增接口
  // 密码登陆
  loginByPass (data) {
    return instance.post('/userno/login', data)
  },
  // 设置密码
  setPassword (data) {
    return instance.post('/user/setpwd', data)
  },
  // 修改密码

  // 发送注册验证码
  SendRegisterCode (data) {
    return instance.post('/userno/getregistercode', data)
  },
  // 注册
  Register (data) {
    return instance.post('/userno/register', data)
  },
  // 设置昵称
  SetName (data) {
    return instance.post('/user/setName', data)
  },
  // 发送登录验证码
  SendLoginCode (data) {
    return instance.post('/userno/getlogincode', data)
  },
  // 登录接口
  Login (data) {
    return instance.post('/userno/login', data)
  },
  // 获取算力
  GetPower (conf) {
    return instance.get('/user/getpower')
  },
  GetBallCoinList (conf) {
    return instance.get('/user/getuserballcoinlist')
  },
  GetUserBallCoin (data) {
    return instance.post('/user/getuserballcoin', data)
  },
  GetFriendList (conf) {
    return instance.get('/user/myfriend')
  },
  AddFriend (data) {
    return instance.post('/user/addfriend', data)
  },
  GetFriendBallCoinList (data) {
    return instance.post('/user/getfriendballcoinlist', data)
  },
  GetUserNatchLog (conf) {
    return instance.get('/user/getusersnatchlog')
  },
  GetUserNatchLogAll (data) {
    return instance.post('/user/getusernatchlogall', data)
  },
  GetFriendListAll (data) {
    return instance.post('/user/myfriendall', data)
  },
  GetContrastData (data) {
    return instance.post('/user/friendcontrast', data)
  },
  GetIsShowSignin (conf) {
    return instance.get('/user/isshowsignin')
  },
  SignIn (conf) {
    return instance.get('/user/signin')
  },
  GetFriendRequestCount (conf) {
    return instance.get('/user/getfriendrequestcount')
  },
  GetFriendRequestList (conf) {
    return instance.get('/user/getfriendrequestlist')
  },
  AgreenFriend (data) {
    return instance.post('/user/agreenfriend', data)
  },
  GetUserRequestData (conf) {
    return instance.get('/user/getrequestpage')
  },
  GetFriendRed (conf) {
    return instance.get('/packet/findredpacket')
  },
  CloseFriendRed (data) {
    return instance.post('/packet/UserPackerHide', data)
  },
  // 隐藏领取-
  hideLogin (config) {
    return instance.post('/user/hidesigin', {})
  },
  // 注册验证码
  RegisterCode (data) {
    return instance.post('/userno/getregistercode', data)
  },

  //  用户登录
  userLogin (data) {
    return instance.post('/user/login', data)
  },
  // 用户退出
  userLogOut (data) {
    return instance.post('/user/loginout', data)
  },
  // 用户注册
  userRegist (data) {
    return instance.post('/user/register', data)
  },
  //  获取图片验证码
  getImgCode (type) {
    return apiConfig.baseURL + '/public/getimgcode?timestamp=' + (new Date().getTime()).toString() + '&type=' + type
  },
  // 验证图片验证码 进入下一步
  checkImgCode (data) {
    return instance.post('/user/checkfindpasswordimgcode', data)
  },
  // 发送找回密码验证码到邮箱
  sendFindPwdCode (data) {
    return instance.post('/user/sendfindpasswordcode', data)
  },
  // 提交找回密码验证码进入下一步
  checkFindPwdCode (data) {
    return instance.post('/user/checkfindpasswordcode', data)
  },
  // 修改登录密码
  setSignPwd (data) {
    return instance.post('/user/setfindpasswordagain', data)
  },
  // 新增委托
  addDelegate (data) {
    return instance.post('/entrust/order', data)
  },
  // 撤销委托
  cancelDelegate (data) {
    return instance.post('/entrust/cancel', data)
  },
  // 当前委托
  curDelegate (data) {
    return instance.post('/entrust/current', data)
  },
  // 历史委托
  hisDelegate (data) {
    return instance.post('/entrust/history', data)
  },
  // 根据交易ID获取交易明细
  orderDetail (data) {
    return instance.post('/entrust/userdetail', data)
  },
  // 委托明细
  delegateDetail (data) {
    return instance.post('/entrust/detail', data)
  },
  // 公告
  getNotice (data) {
    return instance.post('/index/getnotice', data)
  },
  // 资产列表（持有）
  getAssetslist (data) {
    return instance.post('/assets/assetslist', data)
  },
  // 用户账户/余额
  userAccount (data) {
    return instance.post('/user/account', data)
  },
  // 上传地址
  uploadUrl () {
    return apiConfig.baseURL + '/public/upload'
  },
  // 获取国家
  getCountry (data) {
    return instance.post('/public/getcountry', data)
  },
  // 身份验证
  userAuth (data) {
    return instance.post('/assets/authentication', data)
  },
  // 设置交易密码
  setPinCode (data) {
    return instance.post('/assets/settransactionpassword', data)
  },
  // 获取充币地址
  getRechargeAddress (data) {
    return instance.post('/assets/rechargeaddress', data)
  },
  // 资产中心-财务记录（充币记录）
  assetsRechargeRecord (data) {
    return instance.get('/assets/assetsRecord?page=' + data.page)
  },
  // 资产中心-财务记录（提取币记录）
  assetsWithdrawRecord (data) {
    return instance.get('/assets/assetsWithdraw?page=' + data.page)
  },
  // 提币地址列表
  withdrawAddressList (data) {
    return instance.post('/assets/getusertakecoinadresslist', data)
  },
  // 删除提币地址
  deleteWithdrawAddress (data) {
    return instance.post('/assets/deletetakecoinaddress', data)
  },
  // 发送修改交易密码验证码
  getPinCodeVerifyCode (data) {
    return instance.post('/assets/sendupdatetransactionpasswordcode', data)
  },
  // 发送提币验证邮件
  getTakeCoinVerifyCode (data) {
    return instance.post('/assets/sendaddtakecoinaddressemail', data)
  },
  // 添加提币地址
  addWithdrawAddress (data) {
    return instance.post('/assets/addtakecoinaddress', data)
  },
  // 获取提币地址
  getWithdrawAddress (data) {
    return instance.post('/assets/gettakecoinaddress', data)
  },
  // 提币手续费接口
  calWithdrawFee (data) {
    return instance.post('/assets/getpoundage', data)
  },
  sendWithdrawCode (data) {
    return instance.post('/assets/sendtakecoinemail', data)
  },
  // 提币按钮
  withdrawCoin (data) {
    return instance.post('/assets/takecoin', data)
  },
  // 获取公告列表
  GetNoticeList (data) {
    return instance.post('/index/getnotice', data)
  },
  // 获取公告详情
  GetNoticeDetail (data) {
    return instance.post('/index/getnoticedetail', data)
  },
  getWsByCurrency (data) {
    var arr = Object.keys(data)
    var str = ''
    for (var i in arr) {
      str += ('&' + arr[i] + '=')
      str += data[arr[i]]
    }
    str = '?' + str.substr(1)
    return instance.get('/Port/getPort' + str)
  },
  // 添加阅读量
  SetNoticeReadingCount (data) {
    return instance.post('/public/setnoticereadingcount', data)
  },
  // 下边是dapp部分的接口===================
  // DAPP行情dapp/quotationlib
  getDappHangqing (config) {
    return instance.get('/dapp/quotationlib')
  },
  // DAPP快讯
  getDappFastInfo (data) {
    return instance.post('/dapp/newslibs', data)
  },
  // 游戏币兑换接口
  gameExchange (data) {
    return instance.post('/dapp/exchangeGameCurrency', data)
  },
  // 广告首页
  getAdverment (data) {
    return instance.post('/adver/adverlibs', data)
  },
  // 广告详情
  getAdvermentDetail (data) {
    return instance.post('/adver/adverdetiles', data)
  },
  // 广告详情
  getAdvermentShare (data) {
    return instance.post('/adverout/adverdetiles', data)
  },
  // 游戏页面
  getameInfo (config) {
    return instance.post('/dapp/gamerel', {})
  },
  // 发红包
  giveRedPack (data) {
    return instance.post('/packet/index', data)
  },
  // 内部好友分享
  innerShare (data) {
    return instance.post('/packet/packetinside', data)
  },
  // 选择币种接口
  selectBean (data) {
    return instance.post('/index/coinlist', data)
  },
  // 红包记录(我收到的)
  remarkRedGet (data) {
    return instance.post('/packet/PacketHistory', data)
  },
  // 红包记录(我发出的)
  remarkRedGive (data) {
    return instance.post('/packet/PacketList', data)
  },
  // 收支记录
  incomeRemark (data) {
    return instance.post('/balence/coinaccount', data)
  },
  // 用户资金
  getUserMoneyList (data) {
    return instance.post('/balence/index', data)
  },
  // 用户资金种类
  getUserMoneyClass (config) {
    return instance.post('/balence/CoinLibs', {})
  },
  // 账户余额
  accountRemain (config) {
    return instance.post('/balence/userbalence', {})
  },
  // 资产开关按钮
  accountSwitch (data) {
    return instance.post('/balence/balencestatus', data)
  },
  // 钱包详情接口
  getWalletDetail (data) {
    return instance.post('/balence/UserDetailBalence', data)
  },
  // 内部收红包
  getInnerRedPack (data) {
    return instance.post('/packet/RedHistory', data)
  },
  // 内部收红包--list
  getInnerList (data) {
    return instance.post('/packet/RedHistoryUser', data)
  },
  // 外部收红包--list
  getOuterList (data) {
    return instance.post('/packetout/RedHistoryUser', data)
  },
  // 外部收红包
  getOuterRed (data) {
    return instance.post('/packetout/RedHistory', data)
  },
  // 验证码
  getCode (data) {
    return instance.post('/userno/getpacketcode', data)
  },
  // 验证码--之后 立即领取
  getRedInnerTime (data) {
    return instance.post('/userno/OutUserLogin', data)
  },
  // 分享成功-
  getAdverSucc (data) {
    return instance.post('/adver/AdverForward', data)
  },
  // 看市场加算力-
  addPower (data) {
    return instance.post('/dapp/MarketNumber', data)
  },
  // 第一次出弹窗-
  isShowPower (data) {
    return instance.post('/dapp/IsShowPower', data)
  },
  // 搜索好友
  searchFriend (data) {
    return instance.post('/user/searchuser', data)
  },
  // 添加好友
  addFriend (data) {
    return instance.post('/user/addsearchuser ', data)
  },
  // 登录微信权限
  getWeixin (data) {
    return instance.post('/userno/wxEntrance ', data)
  },
  // 外部领红包微信权限
  getOuter (data) {
    return instance.post('/userno/wxPacketEntrance', data)
  },
  // 微信浏览器内部分享
  weixinShare (data) {
    return instance.post('/packet/wxSharePacket', data)
  }

}
export {
  api
}
