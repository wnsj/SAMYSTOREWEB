'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

	//API_HOST:'"http://172.16.56.1:8080"',
	API_HOST:'"http://192.168.109.1:8080"',
	// API_HOST:'"http://172.16.213.210:8080/samy"',
	// API_HOST:'"https://172.16.213.210/samy"',
	//API_HOST:'"http://172.16.3.116:8080/"'
})
