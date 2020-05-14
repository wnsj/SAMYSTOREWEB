'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

	// API_HOST:'"http://172.16.56.1:8080"',
	API_HOST:'"http://172.16.3.67:8080"',
	// API_HOST:'"http://vip.miyuexli.com:88/samystore"',
	// API_HOST:'"http://172.16.213.210:8080/samy"',
	// API_HOST:'"https://172.16.213.210/samy"',
	//API_HOST:'"http://172.16.3.116:8080/"'
	
	API_HOST_SAMY:'"http://vip.miyuexli.com:88/samy"',
})
