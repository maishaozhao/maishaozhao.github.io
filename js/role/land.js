var Land = (function() {
				
	// 统计大地实例的数量
	var landTotal = 0;
	
	/**
	 * @constructor 大地类
	 * @param { options: Object } 可配参数
	 * @param { options.ctx: CanvasContext } 绘图环境
	 * @param { options.img: Image } 大地图
	 * @param { options.x: number } 背景渲染在画布中的x轴坐标
	 * @param { options.y: number } 背景渲染在画布中的y轴坐标
	 * @param { options.speed: number } 背景运动速度
	 * */
	function Land(options) {
		this.ctx = options.ctx;
		this.img = options.img;
		this.w = this.img.width;
		this.h = this.img.height;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.speed = options.speed || 3;
		landTotal++;
	}
	
	// 给原型扩展方法
	util.extend(Land.prototype, {
		
		// 按照实例的属性绘制
		draw: function() {
			this.ctx.drawImage(this.img, this.x, this.y);
			this.update();
		},
		
		// 更新背景下一帧绘制时的属性值
		update: function() {
			this.x -= this.speed;
			
			// 走出画布，从右边出来
			if(this.x < -this.w) {
				this.x += this.w * landTotal;
			}
		}
	});
	
	// 把构造函数暴漏到外界
	return Land;
})();
		