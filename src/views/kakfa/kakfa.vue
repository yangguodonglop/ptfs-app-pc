<template>
	<div class="kabfa_con">
			<el-button type="primary">
				<a href=" http://47.99.193.140:8080/clusters/PTFS-Kafka/topics" target="_blank">kafka分区及消息监控</a>
				
			</el-button>
			
			<el-button type="primary" >
				<a href=" http://47.99.193.140:8083/" target="_blank">kafka服务器性能监控</a>
			</el-button>
		 
	</div>
</template>

<script>

	export default {
		data() {
			return {		
			}
		},
	}

</script>
<style lang="less">
.kabfa_con{
	width: auto;
	height: auto;
	overflow: hidden;
	margin-top: 20px;
	a{
	text-decoration: none;
	color: #ffffff;
	}
}
</style>
