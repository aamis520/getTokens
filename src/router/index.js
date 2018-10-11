import Main from '@/pages/Main'
import Home from '@/pages/Home'
// 下边是广告
import Advertisement from '@/pages/Advertisement' // 广告
import adverDetail from '@/pages/adverChildren/adverDetail' // 广告详情
import adverShare from '@/pages/adverChildren/adverShare' // 广告-进入分享页面
// 下载页面
import downLoadApp from '@/pages/downLoad/downLoadApp' // 广告-进入分享页面
import goBrowser from '@/pages/downLoad/goBrowser' // 广告-进入分享页面
// 下边是添加好友页面
import addFriend from '@/pages/addFriend' // 添加好友
import weixinShare from '@/pages/weixinShare' // 添加好友

// 下边是账户部分
import consumer from '@/pages/consumer' // 账户首页
import income from '@/pages/income' // 收支记录页面
import redPaper from '@/pages/redPaper' // 发红包页面
import redRemark from '@/pages/redRemark' // 红包记录页面
import getPack from '@/pages/getPack' // 领取红包页面
import outerGetPack from '@/pages/outerGetPack' // 领取红包页面-外部
import outerGetPackage from '@/pages/outerGetPackage' // 领取红包页面-外部
import fillIn from '@/pages/redPackChildren/fillIn' // 红包记录页面-收红包
import givePack from '@/pages/redPackChildren/givePack' // 红包记录页面-发红包
import loginOut from '@/pages/loginOut' // 设置-进入退出页面
// 下边是钱包页面
import homeWallet from '@/pages/wallet/index' // 钱包首页
import assetsClassify from '@/pages/wallet/assetsClassify' // 添加资产
import walletUrl from '@/pages/wallet/walletUrl' // 钱包地址
import rollOut from '@/pages/rollOut' // 转账页面

// 下边是Dapp部分
import Dapp from '@/pages/Dapp' // Dapp
import newdapp from '@/pages/newdapp' // 2.1newDapp
import latelyuse from '@/pages/latelyuse' // 2.1 最近使用
import lookMore from '@/pages/lookMore' // 2.1 查看更多
import beanKnow from '@/pages/beanKnow' // 2.1 币知道
import lookMoreChats from '@/pages/lookMoreChats' // 2.1 查看更多帖子
import bbsDetail from '@/pages/bbsDetail' // 2.1 论坛详情
import gameDetail from '@/pages/dappChildren/gameDetail' // Dapp子页面game游戏页面
import guessDetail from '@/pages/dappChildren/guessDetail' // Dapp子页面市场页面
import hangqing from '@/pages/dappChildren/hangqing' // 市场页面-子页面-行情
import fastInfo from '@/pages/dappChildren/fastInfo' // 市场页面-子页面-快讯
import market from '@/pages/dappChildren/market' // Dapp子页面game游戏页面
import Login from '@/pages/user/Login'
import RequestPage from '@/pages/home/RequestPage'
import Task from '@/pages/home/Task'
import Register from '@/pages/user/Register'
import SetName from '@/pages/user/SetName'
import setPassword from '@/pages/user/setPassword'
import Friend from '@/pages/home/Friend'

import WinTreasureList from '@/pages/home/WinTreasureList'
import FriendRequest from '@/pages/home/FriendRequest'
import FriendAllList from '@/pages/home/FriendAllList'


import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉＃
  routes: [{
    path: '/market',
    component: market,
    redirect: '/market/hangqing',
    meta: {
      title: '市场页面'
    },
    children: [{
      path: 'hangqing',
      component: hangqing,
      meta: {
        title: '行情页面'
      }
    }, {
      path: 'fastInfo',
      component: fastInfo,
      meta: {
        title: '快讯页面'
      }
    }]
  },
  {
    path: '/adverDetail',
    component: adverDetail,
    meta: {
      title: '广告详情页面'
    }
  },
  {
    path: '/hangqing',
    component: hangqing,
    meta: {
      title: '市场行情'
    }
  },
  {
    path: '/rollOut',
    component: rollOut,
    meta: {
      title: '转账页面'
    }
  },
  {
    path: '/fastInfo',
    component: fastInfo,
    meta: {
      title: '市场快讯'
    }
  },
  {
    path: '/gameDetail',
    component: gameDetail,
    meta: {
      title: '游戏页面'
    }
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task,
    meta: {
      title: '任务页面'
    }
  },
  {
    path: '/FriendAllList',
    name: 'FriendAllList',
    component: FriendAllList,
    meta: {
      title: '好友列表'
    }
  },
  {
    path: '/WinTreasureList',
    name: 'WinTreasureList',
    component: WinTreasureList,
    meta: {
      title: '领取列表'
    }
  },
  {
    path: '/FriendRequest',
    name: 'FriendRequest',
    component: FriendRequest,
    meta: {
      title: '好友申请列表'
    }
  },
  {
    path: '/adverShare',
    component: adverShare,
    meta: {
      title: '广告分享页面'
    }
  },
  {
    path: '/latelyuse',
    component: latelyuse,
    meta: {
      title: '最近使用'
    }
  },
  {
    path: '/lookMore',
    component: lookMore,
    meta: {
      title: '查看更多'
    }
  },
  {
    path: '/beanKnow',
    component: beanKnow,
    meta: {
      title: '币知道'
    }
  },
  {
    path: '/lookMoreChats',
    component: lookMoreChats,
    meta: {
      title: '全部帖子'
    }
  },
  {
    path: '/bbsDetail',
    component: bbsDetail,
    meta: {
      title: '论坛详情'
    }
  },
  {
    path: '/downLoadApp',
    component: downLoadApp,
    meta: {
      title: '下载页面'
    }
  },
  {
    path: '/goBrowser',
    component: goBrowser,
    meta: {
      title: '浏览器页面'
    }
  },
  {
    path: '/addFriend',
    component: addFriend,
    meta: {
      title: '添加好友'
    }
  },
  {
    path: '/weixinShare',
    component: weixinShare,
    meta: {
      title: '微信分享'
    }
  },
  {
    path: '/Friend',
    name: 'Friend',
    component: Friend,
    meta: {
      title: '好友主页'
    }
  },
  {
    path: '/income',
    component: income,
    meta: {
      title: '收支记录'
    }
  },
  {
    path: '/getPack',
    component: getPack,
    meta: {
      title: '好友红包'
    }
  },
  {
    path: '/loginOut',
    component: loginOut,
    meta: {
      title: '设置页面'
    }
  },
  {
    path: '/outerGetPack',
    component: outerGetPack,
    meta: {
      title: 'GetTokens红包'
    }
  },
  {
    path: '/outerGetPackage',
    component: outerGetPackage,
    meta: {
      title: 'GetTokens红包'
    }
  },
  {
    path: '/assetsClassify',
    component: assetsClassify,
    meta: {
      title: '添加资产页面'
    }
  },
  {
    path: '/walletUrl',
    component: walletUrl,
    meta: {
      title: '钱包地址页面'
    }
  },
  {
    path: '/homeWallet',
    name: 'homeWallet',
    component: homeWallet,
    meta: {
      title: '钱包首页'
    }
  },
  {
    path: '/RequestPage',
    name: 'RequestPage',
    component: RequestPage,
    meta: {
      title: '邀请页面'
    }
  },
  {
    path: '/redPaper',
    component: redPaper,
    meta: {
      title: '红包页面'
    }
  },
  {
    path: '/redRemark',
    component: redRemark,
    redirect: '/redMemark/fillIn',
    meta: {
      title: '红包记录页面'
    },
    children: [{
      path: '/redMemark/fillIn',
      component: fillIn,
      meta: {
        title: '我收到红包'
      }
    },
    {
      path: '/redMemark/givePack',
      component: givePack,
      meta: {
        title: '我发出红包'
      }
    }
    ]
  },
  {
    path: '/',
    component: Main,
    meta: {
      title: 'GetTokens首页'
    },
    children: [{
      path: 'Advertisement',
      component: Advertisement,
      meta: {
        title: '广告页面'
      }
    },
    {
      path: 'consumer',
      component: consumer,
      meta: {
        title: '账户首页'
      }
    },

    {
      path: 'Dapp',
      component: Dapp,
      meta: {
        title: 'Dapp'
      }
    },
    {
      path: 'newdapp',
      component: newdapp,
      meta: {
        title: 'newdapp'
      }
    },
    {
      path: 'guessDetail',
      component: guessDetail,
      meta: {
        title: '竞猜页面'
      }
    },
    {
      path: '',
      component: Home,
      meta: {
        title: 'GetTokens首页'
      }
    },
    {
      path: 'Home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'GetTokens首页'
      }
    }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页面'
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册页面'
    }
  },
  {
    path: '/SetName',
    name: 'SetName',
    component: SetName,
    meta: {
      title: '注册页面'
    }
  },
  {
    path: '/setPassword',
    name: 'setPassword',
    component: setPassword,
    meta: {
      title: '设置密码'
    }
  }
  ]

})
