require.config({
	
	// 配置所有模块的基础路径，这个基础路径自身相对于引入了requirejs的html文件路径
	baseUrl: 'js/',
	
	// 配置模块地址的别名，以后在define定义模块依赖或者require的时候，直接使用别名即可
	paths: {
		
		// key是模块的名字，value是模块的地址，该地址是基于baseUrl的
		FlappyBird: 'flappyBird',
		Bird: 'role/bird',
		Land: 'role/land',
		Pipe: 'role/pipe',
		Sky: 'role/sky',
		Timer: 'role/timer',
		getRole: 'role/getRole',
		E: 'common/e',
		imgLoad: 'common/imgLoad',
		util: 'common/util',
	},
	
	// 配置非define定义的模块依赖与输出
	shim: {
		
		// key是模块的名字，value是可配置项
		FlappyBird: {
			
			// 配置依赖，值为数组，数组里面书写依赖的模块名字
			deps: ['imgLoad', 'util', 'getRole', 'Bird'],
			
			// 配置输出到require回调中的值，值为全局变量的名字。
			exports: 'FlappyBird'
		},
		Bird: {
			deps: ['util'],
			exports: 'Bird'
		},
		Land: {
			deps: ['util'],
			exports: 'Land'
		},
		Pipe: {
			deps: ['util'],
			exports: 'Pipe'
		},
		Sky: {
			deps: ['util'],
			exports: 'Sky'
		},
		Timer: {
			deps: ['util'],
			exports: 'Timer'
		},
		getRole: {
			deps: ['util', 'Bird', 'Land', 'Pipe', 'Sky', 'Timer'],
			exports: 'getRoleFactory'
		},
		E: {
			exports: 'E'
		},
		imgLoad: {
			exports: 'imgLoad'
		},
		util: {
			exports: 'util'
		}
	}
});


	
define(['FlappyBird'], function(FB) {	
	var fb = new FB({container: 'body'});
	fb.run();
	
	var btn = document.querySelector('button');
	btn.onclick = function() {
		fb.pause();
	};
});



