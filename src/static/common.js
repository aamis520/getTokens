// 正则
const reg = {
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  password: /^[a-zA-Z0-9]{6,12}$/,
  mobile: /^[1][3,4,5,7,8][0-9]{9}$/,
  hkPhone: /^\d{8}$/,
  twPhone: /^\d{10}$/
  // pwdReg:/^\d{1,6}$/
}

// 错误处理
const Error = {
  OK: {
    code: 1000,
    desc: '验证通过'
  },
  MOBILE_EMPTY: {
    code: 1001,
    desc: '手机号为空'
  },
  MOBILE_ERROR: {
    code: 1002,
    desc: '手机号格式错误'
  },
  CODE_EMPTY: {
    code: 1003,
    desc: '验证码为空'
  },
  NAME_EMPTY: {
    code: 1004,
    desc: '昵称不能为空'
  },
  ADDFRIEND_PHONE_EMPTY: {
    code: 1005,
    desc: '请输入手机号／邀请码'
  }
}
// 时间格式化方法
const timeParse = function (timestamp) {
  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate()
  if (D < 10) {
    D = '0' + date.getDate() + ' '
  }
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  if (s < 10) {
    s = '0' + date.getSeconds()
  }
  return Y + M + D + h + m + s
}
// timestampToTime(1403058804);
// console.log(timestampToTime(1403058804));
const checkerror = {
  SendRegisterCode: function (mobile, country) {
    var Return = {}
    // 如果手机号为空
    if (mobile === '') {
      Return = Error.MOBILE_EMPTY
    } else if (country === '中国大陆') {
      if (!reg.mobile.test(mobile)) {
        Return = Error.MOBILE_ERROR
      } else {
        Return = Error.OK
      }
    } else if (country === '香港') {
      if (!reg.hkPhone.test(mobile)) {
        Return = Error.MOBILE_ERROR
      } else {
        Return = Error.OK
      }
    } else if (country === '台湾') {
      if (!reg.twPhone.test(mobile)) {
        Return = Error.MOBILE_ERROR
      } else {
        Return = Error.OK
      }
    }
    return Return
  },
  SendLoginCode: function (mobile) {
    var Return = {}
    // 如果手机号为空
    if (mobile === '') {
      Return = Error.MOBILE_EMPTY
    } else {
      Return = Error.OK
    }
    return Return
  },
  Register: function (mobile, code) {
    var Return = {}

    // 如果手机号为空
    if (mobile === '') {
      Return = Error.MOBILE_EMPTY
    } else if (code === '') {
      Return = Error.CODE_EMPTY
    } else {
      Return = Error.OK
    }
    return Return
  },
  // 下边是验证setName 是否输入
  SetName: function (name) {
    var Return = {}
    if (name === '') {
      Return = Error.NAME_EMPTY
    } else {
      Return = Error.OK
    }
    return Return
  },
  AddFriend: function (phone) {
    var Return = {}

    // 如果手机号为空
    if (phone === '') {
      Return = Error.ADDFRIEND_PHONE_EMPTY
    } else {
      Return = Error.OK
    }
    return Return
  }
}

// 事件处理
const DateHandle = {

  // 获取当前时间戳
  GetNowTime: function () {
    return new Date().getTime()
  },
  // 获取指定日期时间戳
  GetDateTime: function (time) {
    return new Date(time.replace(/-/g, '/')).getTime()
  },
  // 获取剩余时间 小时分钟格式
  GetSurplusTime: function (time) {
    var nowtime = new Date().getTime()
    var datetime = new Date(time.replace(/-/g, '/')).getTime()

    var surplustime = parseInt((datetime - nowtime) / 1000)
    if (surplustime < 0) {
      return '可以领取'
    }
    var hour = parseInt(surplustime / 3600)
    surplustime = parseInt(surplustime - hour * 3600)
    var minutes = parseInt(surplustime / 60)
    if (hour.toString().length === 1) {
      hour = '0' + hour
    }
    if (minutes === 0) {
      return '剩余 00:01'
    }
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes
    }
    // console.log('剩余 '+hour+':'+minutes)
    return '剩余 ' + hour + ':' + minutes
  },
  GetLogTime: function (time) {
    var nowtime = new Date().getTime()
    var datetime = new Date(time.replace(/-/g, '/')).getTime()
    var surplustime = parseInt((nowtime - datetime) / 1000)
    var ReturnDate = ''
    if (surplustime > 24 * 3600) {
      ReturnDate = parseInt(surplustime / (24 * 3600)) + '天前'
    } else if (surplustime > 3600) {
      ReturnDate = parseInt(surplustime / 3600) + '小时前'
    } else if (surplustime > 60) {
      ReturnDate = parseInt(surplustime / 60) + '分钟前'
    } else {
      ReturnDate = '刚刚'
    }
    return ReturnDate
  },
  // 获取剩余时间 小时分钟格式
  GetFriendRedTime: function (time) {
    if (time === '' | time === undefined) {
      return '红包倒计时 00:00'
    }
    var nowtime = new Date().getTime()
    var datetime = new Date(time.replace(/-/g, '/')).getTime()
    var surplustime = parseInt((datetime - nowtime) / 1000)
    if (surplustime < 0) {
      return '已过期'
    }

    var hour = parseInt(surplustime / 3600)
    surplustime = parseInt(surplustime - hour * 3600)
    var minutes = parseInt(surplustime / 60)
    if (hour.toString().length === 1) {
      hour = '0' + hour
    }
    if (minutes === 0) {
      return '即将过期'
    }
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes
    }
    // console.log('剩余 '+hour+':'+minutes)
    return '红包倒计时 ' + hour + ':' + minutes
  }
}

export {
  reg,
  checkerror,
  DateHandle,
  timeParse
}
