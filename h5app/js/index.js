require(['./config'],function(){
	require(['mui'],function(mui){
		mui.init();
		function init(){
			//获取用户信息
			loadData()
			//删除
			deleteData();
			//跳转
			goDetails();
			//添加
			addUser();
		}
		
		//获取用户信息
		function loadData(){
			mui.ajax('/userlist',{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型	              
			success:function(res){
				var data = res.data;
				var str = '';
				data.forEach(function(file){
					str+=`<li class="mui-table-view-cell">
					${file.name}
					<div class="flex">
						<button type="button" class="mui-btn mui-btn-primary" data-id=${file._id}>
							查看详情
						</button>
						<button type="button" class="mui-btn mui-btn-danger" data-id=${file._id}>
							删除
						</button>
					</div>
				</li>`
				})
				document.querySelector('#list').innerHTML = str;
			}
			});
		}
		
		
		//删除
		function deleteData(){
			mui(".mui-table-view").on('tap','.mui-btn-danger',function(){
				var id = this.getAttribute("data-id");
				if(id){
					mui.ajax('/remove',{
					data:{
						id:id
					},
					dataType:'json',//服务器返回json格式数据
					type:'get',//HTTP请求类型	              
					success:function(res){
						alert("删除成功！");
						window.location.reload();
					}
					});
				}else{
					alert("获取失败！")
				}
				
			}) 
		}
		
		//跳转详情页
		function goDetails(){
			mui(".mui-table-view").on('tap','.mui-btn-primary',function(){
				var id = this.getAttribute("data-id");
				location.href = './page/details.html?id=' + id;
			})
		}
		
		function addUser(){
			document.querySelector('.mui-icon-plus').addEventListener('tap',function(){
				location.href = './page/add.html';
			})
		}
		
		
		
		
// 		function deleteData(){
// 			mui(".mui-table-view").on('tap','.mui-btn-danger',function(){
// 				//获取id
// 				var id = this.getAttribute("data-id");
// 				mui.ajax('/remove',{
// 					data:{
// 						id:id
// 					},
// 					dataType:'json',//服务器返回json格式数据
// 					type:'get',//HTTP请求类型	              
// 					success:function(res){
// 						if(res.code == 1){
// 							alert(res.msg);
// 							location.href = '../index.html'
// 						}
// 					}
// 				})
// 			}) 
// 		}
		
		
		
		init();
		
		
// 		mui(".mui-table-view").on('tap','.mui-btn-primary',function(){
// 			var id = this.getAttribute("data-id");
// 			location.href = '../page/details.html?id=' + id;
// 		})
		
	})
})