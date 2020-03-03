<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	import Cookies from 'js-cookie'
export default {
  name: 'App',
	methods: {
		setRouter(param) {
			
			// window.location.href = param;
			this.$router.push({ path:param });//此方法会导致跳转2次
		}
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: hidden;
}
</style>
