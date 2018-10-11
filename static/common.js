import Vue from 'vue'
import store from '../src/store/store'
import {
  api
} from './api'
import { apiConfig } from '../src/static/api';
// 正则
const reg = {
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  password: /^[a-zA-Z0-9]{6,12}$/,
  mobile: /^1[3|4|5|8][0-9]\d{4,8}$/,
  // pwdReg:/^\d{1,6}$/
}

// 错误处理
const Error = {
  MOBILE_EMPTY: {
    code: 1000,
    desc: '手机号为空'
  },
  MOBILE_ERROR: {
    code: 1001,
    desc: '手机错误'
  }
}

const checkerror = {

  // 登录验证
  login: function (email, pwd, sliderStatus) {

    var res = {}

    // 邮箱为空
    if (email == '') {
      res.errCode = ERR.EMAILEMPTY

      // 验证邮箱
    } else if (!reg.emailReg.test(email)) {
      res.errCode = ERR.EMAILERROR

      // 密码为空
    } else if (pwd == '') {
      res.errCode = ERR.PASSWORDEMPTY

      // 密码必须为6-12位数字字母组合
    } else if (!reg.pwdReg.test(pwd)) {
      res.errCode = ERR.PASSWORDERROR

      // 请进行滑块验证
    } else if (!sliderStatus) {
      res.errCode = ERR.SLIDERERROR

      // 校验合法
    } else if (reg.emailReg.test(email) && reg.pwdReg.test(pwd) && sliderStatus) {
      res.errCode = ERR.NOERR
    }
    return res
  },
  // sendregistercode: function (mobile) {
  //   console.log(1)
  //   // 如果手机号为空
  //   if (mobile == '') {
  //     Return = Error.MOBILE_EMPTY
  //   } else if (!reg.mobile.test(mobile)) {
  //     Return = Error.MOBILE_ERROR
  //   }
  //   return Return;
  // }
  SendRegisterCode: function (mobile, country) {
    var Return = {}
    // 如果手机号为空
    if (mobile === '') {
      Return = Error.MOBILE_EMPTY
    } else if (country === '中国大陆') {
      if (!reg.mobile.test(mobile)) {
        Return = Error.MOBILE_ERROR
      }
    } else if (country === '香港') {
      if (!reg.hkPhone.test(mobile)) {
        Return = Error.MOBILE_ERROR
      }
    } else if (country === '台湾') {
      if (!reg.twPhone.test(mobile)) {
        Return = Error.MOBILE_ERROR
      }
    } else {
      Return = Error.OK
    }
    return Return
  }
},
const ErrorAlert = {
  time: 5,
  err: '错误',
  alertmessage: function () {
    var alertdiv = "<div style='min-width:0.1rem;padding:0.1rem;height:0.1rem;font-size:0.18rem;'>" + err + "</div>";
    var alertdivtime = ''
  }
}

const Message = {

  // 显示错误信息弹窗 con内容 time时间 type类型
  ShowMessage(con, time, type = 1) {
    var html = "<div id='messagealert' style='min-width:422px;height:138px;position:fixed;right:0;left:0;top:50%;margin-top:-69px;'>123123</div>"
  }
}
const share = function () {
  var obj = {}
  obj.id = window.location.href.split('?')[1].split('=')[1]
  console.log(obj)
  var ApiConf = {}
  ApiConf.headers = {'X-token': store.getters.Token}
  console.log(ApiConf)
  api.getAdverSucc(obj, ApiConf)
    .then(res => {

    })
    .catch(() => {

    })
}
export {
  Validate,
  ERR,
  nationalityOption,
  share
}
