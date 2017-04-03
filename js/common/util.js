// 这是单例模式，util对象在项目中只存在一个
var util = {
	
	// 在指定范围内生成随机数
	getRandom: function(min, max) {
		return Math.random() * (max - min) + min;
	},
	
	// 动态创建canvas，然后获取绘图上下文
	getCtx: function(containerSelector, width, height) {
		var container = document.querySelector(containerSelector);
		var cvs = document.createElement('canvas');
		cvs.width = width;
		cvs.height = height;
		cvs.style = 'border: 1px solid red';
		container.appendChild(cvs);
		return cvs.getContext('2d');
	},
	
	// 把后面所有的对象属性依次copy给第一个对象
	extend: function() {
		var arg = arguments, argLen = arg.length;
		var target = arg[0];
		
		// 从下标1开始遍历arguments，把遍历到的每个对象属性依次copy给target对象
		for(var i = 1; i < argLen; i++) {
			for(var key in arg[i]) {
				
				// 只把对象自己的属性copy给target
				if(arg[i].hasOwnProperty(key)) {
					target[key] = arg[i][key];
				}
			}
		}
		
		return target;
	}
}
