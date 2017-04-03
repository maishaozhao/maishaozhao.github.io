var Sky = (function() {
				
	// 用来记录创建了多少背景实例
	var skyTotal = 0;
	
	/**
	 * @constructor 背景类
	 * @param { options: Object } 可配参数
	 * @param { options.ctx: CanvasContext } 绘图环境
	 * @param { options.img: Image } 背景图
	 * @param { options.x: number } 背景渲染在画布中的x轴坐标
	 * @param { options.y: number } 背景渲染在画布中的y轴坐标
	 * @param { options.speed: number } 背景运动速度
	 * */
	function Sky(options) {
		this.ctx = options.ctx;	
		this.img = options.img;	
		this.w = this.img.width;
		this.h = this.img.height;
		this.x= options.x || 0;	
		this.y = options.y || 0;	
		this.speed = options.speed || 3;
		skyTotal++;
	}
	
	// 给原型扩展方法
	util.extend(Sky.prototype, {
		
		// 按照实例的属性绘制
		draw: function() {
			this.ctx.drawImage(this.img, this.x, this.y);
			this.update();
		},
		
		// 更新背景下一帧绘制时的属性值
		update: function() {
			this.x -= this.speed;
			
			// 当背景走出画布时，从右边出来，实现无缝滚动
			if(this.x <= -this.w) {
				this.x += this.ctx.canvas.width * skyTotal;
			}
		}
	});
	
	// 把构造函数暴露到外界供外界使用
	return Sky;
})();
