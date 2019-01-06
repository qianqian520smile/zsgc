require(['./config'],function(){
	require(['mui'],function(mui){
		// mui.init();
		function init(){
			//查询用户详信息
			getURL();
			search();
			
		}
		function getURL(name){
			var search = document.location.href;
			console.log(search)
			var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
			console.log(pattern)
			var matcher = pattern.exec(search);
			console.log(matcher)
			var items = null;
		if (null != matcher) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch (e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch (e) {
					items = matcher[1];
				}
			}
		}
			return items;	
		}
		
		function search(){
			// console.log(getURL("id"))
			var _id = getURL("id");
			if(_id){
				mui.ajax('/search',{
				data:{
					id:_id
				},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型	              
				success:function(res){
					var data = res.data;
					var str = '';
					data.forEach(function(file){
						str+=`<li class="mui-table-view-cell">${file.name}</li>
						<li class="mui-table-view-cell">${file.sex}</li>
						<li class="mui-table-view-cell">${file.age}</li>
						<li class="mui-table-view-cell">${file.address}</li>`
					})
					document.querySelector('ul').innerHTML = str;
					
				}
				});
			}
		}
		
		

		function searchaa(){
			//获取id
			console.log(getQueryString('id'));
			mui.ajax('/search',{
				data:{
					id:getQueryString('id')
				},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型	              
				success:function(res){
					var data = res.data;
					var str = '';
					data.forEach(function(file){
						str+=`<li>${file.name}</li>
						<li>${file.age}</li>`
					})
					document.querySelector('.mui-content').innerHTML = str;
					
				}
			})
		}
		
		init();
		
	})
})