'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://f.dev.zhuandian.net/"',
  JAVA_API: '"http://47.74.208.191:9100/api"'
})
