require(['./config'],function(){
	require(['mui'],function(mui){
		// mui.init();
// 		function init(){
// 			//查询用户详信息
// 			// btn();
// 			
// 		}
		function add(){
			var name,sex,age,address;
			var obj = {
				name:document.querySelector('.username').value,
				sex:document.querySelector('.sex').value,
				age:document.querySelector('.age').value,
				address:document.querySelector('.address').value
			}

			mui.ajax('/add',{
				data:{
					name:obj.name,
					sex:obj.sex,
					age:obj.age,
					address:obj.address
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型	              
				success:function(res){
					if(res.code == 1){
						alert('添加成功');
						location.href = '../index.html'; //跳转到首页
					}
				}
			})
		}
		document.querySelector('.mui-btn-primary').addEventListener('tap',function(){
			add();
		})
		
		init();
		
	})
})