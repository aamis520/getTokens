'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://f.dev.zhuandian.net/"',
  JAVA_API: '"http://47.74.208.191:9100/api"'
})
