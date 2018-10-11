import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    UserInfo: {
      IsLogin: false,
      id: 0,
      name: '',
      mobile: '',
      token: '',
      header: '',
      power: '',
      invitecode: '',
      signInAlready: false
    },
    // cnode
    tab: 'all',
    articleList: [],
    collectTopics: [],
    isLoading: false,
    isMore: false,
    isShowAsideMenu: false,
    isShowLogin: false,
    isShowInfo: false,
    isShowMsg: false,
    isShowNewArticle: false,
    isShowAbout: false,
    scrollTop: 0,
    userInfo: {avatar_url: '', id: '', loginname: '', success: false},
    ak: localStorage.ak || ''
  },
  mutations: {
    setAlready (state, params) {
      state.UserInfo.signInAlready = params
    },
    login (state, params) {
      state.UserInfo.IsLogin = true
      state.UserInfo.id = params.user_id || 0
      state.UserInfo.name = params.user_name || ''
      state.UserInfo.mobile = params.user_mobile || ''
      state.UserInfo.token = params.token || ''
      state.UserInfo.header = params.user_header || ''
      state.UserInfo.power = params.user_power || ''
      state.UserInfo.invitecode = params.invite_code || ''
      state.UserInfo.address = params.user_address || ''
      window.localStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
    },
    loginout (state, params) {
      state.UserInfo.IsLogin = false
      state.UserInfo.id = 0
      state.UserInfo.name = ''
      state.UserInfo.mobile = ''
      state.UserInfo.token = ''
      state.UserInfo.header = ''
      state.UserInfo.power = ''
      state.UserInfo.invitecode = ''
      state.UserInfo.address = ''
      window.localStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
    },
    updatepower (state, params) {
      state.UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
      state.UserInfo.power = params
      window.localStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
    },
    updatename (state, params) {
      state.UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
      state.UserInfo.name = params
      window.localStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
    },
    upaddress (state, params) {
      state.UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
      state.UserInfo.address = params
      window.localStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
    },

    // cnode
    changeTab (state, payload) {
      state.isLoading = payload.hasOwnProperty('isLoading') ? payload.isLoading : state.isLoading
      state.tab = payload.type || state.tab
      state.articleList = payload.articleList || state.articleList
    },
    viewArcticle (state, flag) {
      state.isLoading = flag
    },
    changeMore (state, flag) {
      state.isMore = flag
    },
    changeScrollTop (state, scrollTop) {
      state.scrollTop = scrollTop
    },
    showAsideMenu (state, flag) {
      state.isShowAsideMenu = flag
    },
    showLogin (state, flag) {
      state.isShowLogin = flag
    },
    showInfo (state, flag) {
      state.isShowInfo = flag
    },
    showMsg (state, flag) {
      state.isShowMsg = flag
    },
    showNewArticle (state, flag) {
      state.isShowNewArticle = flag
    },
    showAbout (state, flag) {
      state.isShowAbout = flag
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    updateAk (state, ak) {
      state.ak = ak
    },
    updateCollect (state, collectTopics) {
      state.collectTopics = collectTopics
    }
  },
  getters: {
    IsLogin (state) {
      if (!state.UserInfo.IsLogin) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.IsLogin = JSON.parse(window.localStorage.getItem('UserInfo')).IsLogin
        }
      }
      return state.UserInfo.IsLogin
    },
    UserId (state) {
      if (!state.UserInfo.id) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.id = JSON.parse(window.localStorage.getItem('UserInfo')).id
        }
      }
      return state.UserInfo.id
    },
    Mobile (state) {
      if (!state.UserInfo.mobile) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.mobile = JSON.parse(window.localStorage.getItem('UserInfo')).mobile
        }
      }
      return state.UserInfo.mobile
    },
    Name (state) {
      if (!state.UserInfo.name) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.name = JSON.parse(window.localStorage.getItem('UserInfo')).name
        }
      }
      return state.UserInfo.name
    },
    Token (state) {
      if (!state.UserInfo.token) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.token = JSON.parse(window.localStorage.getItem('UserInfo')).token
        }
      }
      return state.UserInfo.token
    },
    Header (state) {
      if (!state.UserInfo.header) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.header = JSON.parse(window.localStorage.getItem('UserInfo')).header
        }
      }
      return state.UserInfo.header
    },
    Power (state) {
      if (!state.UserInfo.power) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.power = JSON.parse(window.localStorage.getItem('UserInfo')).power
        }
      }
      return state.UserInfo.power
    },
    // 钱包地址
    address (state) {
      if (!state.UserInfo.address) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.address = JSON.parse(window.localStorage.getItem('UserInfo')).address
        }
      }
      return state.UserInfo.address
    },
    InviteCode (state) {
      if (!state.UserInfo.invitecode) {
        if (JSON.parse(window.localStorage.getItem('UserInfo')) != null) {
          state.UserInfo.invitecode = JSON.parse(window.localStorage.getItem('UserInfo')).invitecode
        }
      }
      return state.UserInfo.invitecode
    }

  },
  actions: {
    UserLogin ({
      commit
    }, params) {
      commit('login', params)
    },
    UserLogout ({
      commit
    }) {
      commit('loginout')
    },
    UpdatePower ({
      commit
    }, params) {
      commit('updatepower', params)
    },
    UpdateName ({
      commit
    }, params) {
      commit('updatename', params)
    }
  }
})

export default store
