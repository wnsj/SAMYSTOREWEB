<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">商铺管理</h1>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div v-for="(item1,index1) in problemList">
					<div>
						<p>{{item1.problem}}</p>
					</div>
					<div v-for="(item2,index2) in item1.answer">
						
						<input type="radio" v-bind:name="index1" v-model="item2.isSelect" v-on:click="inputAction(item1,item2.isSelect)" />
						<p>{{item2.answerContent1}}</p>
						<p>{{item2.answerContent2}}</p>
					</div>
				</div>
			</div>

		</div>
		<button v-on:click="btnAction()">都选了啥</button>
	</div>

</template>


<script>
	import SubStore from '../MP/SubStore/SubStore.vue'
	export default {
		components: {
			SubStore,
		},
		data() {
			return {
				problemList: [{
						problem: '问题1？',
						selectedAnswer:'',
						answer: [{
								isSelect: 'a',
								answerContent1: 'a',
								answerContent2: '',
							},
							{
								isSelect: 'b',
								answerContent1: 'b',
								answerContent2: '',
							},
							{
								isSelect: 'c',
								answerContent1: 'c',
								answerContent2: '',
							},
							{
								isSelect: 'd',
								answerContent1: 'd',
								answerContent2: '空白',
							},
							{
								isSelect: 'e',
								answerContent1: 'e',
								answerContent2: '空白',
							}
						]
					},
					{
						problem: '问题2？',
						selectedAnswer:'',
						answer: [{
								isSelect: 'a',
								answerContent1: 'a',
								answerContent2: '',
							},
							{
								isSelect: 'b',
								answerContent1: 'b',
								answerContent2: '',
							},
							{
								isSelect: 'c',
								answerContent1: 'c',
								answerContent2: '',
							},
							{
								isSelect: 'd',
								answerContent1: 'd',
								answerContent2: '空白',
							},
							{
								isSelect: 'e',
								answerContent1: 'e',
								answerContent2: '空白',
							}
						]
					}
				]
			};
		},
		methods: {
			inputAction(item1,isSelect) {
				item1.selectedAnswer=isSelect
			},

			btnAction() {
				for (var i = 0; i < this.problemList.length; i++) {
					var selectedAnswer = this.problemList[i].selectedAnswer
					alert(selectedAnswer)
				}
			},


		},

	}
</script>

<style>

</style>
