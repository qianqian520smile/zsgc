var gulp = require('gulp');

var webserver = require('gulp-webserver');

gulp.task('webserver',function(){
	return gulp.src('./')
	.pipe(webserver({
		port:9093,
		open:true,
		proxies:[
			{
				source:'/userlist',target:'http://localhost:3000/userlist' //代理的接口地址
			},
			{
				source:'/remove',target:'http://localhost:3000/remove' //代理的接口地址
			},
			{
				source:'/search',target:'http://localhost:3000/search' //代理的接口地址
			},
			{
				source:'/add',target:'http://localhost:3000/add' //代理的接口地址
			},
			
		]
	}))
})

