'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

	// API_HOST:'"http://172.16.56.1:8080"',
	API_HOST:'"http://172.16.3.92:8080"',
	// API_HOST:'"http://vip.miyuexli.com:88/samystore"',
	// API_HOST:'"http://172.16.213.210:8080/samy"',
	// API_HOST:'"https://111.160.38.141:4093/samystore"',
	//API_HOST:'"http://172.16.3.116:8080/"'

	API_HOST_SAMY:'"https://111.160.38.141:4093/samy"',
})
