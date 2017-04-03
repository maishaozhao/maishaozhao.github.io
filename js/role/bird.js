var Bird = (function() {
	
	/**
	 * 该变量用来存储第一次创建的鸟实例，
	 * 如果用户以后再次创建鸟实例，直接把第一次创建好的返回，不会给用户创建新的实例，
	 * 这就是单例模式，保证游戏中只能存在一只小鸟。
	 * */
	var bird = null;
	
	/**
	 * @constructor 鸟类
	 * @param { options: Object } 可配参数
	 * @param { options.ctx: CanvasContext } 绘图环境
	 * @param { options.img: Image } 鸟图
	 * @param { options.widthFrame: number } 一排有多少个小鸟
	 * @param { options.heightFrame: number } 一列有多少个小鸟
	 * @param { options.x: number } x轴坐标
	 * @param { options.y: number } x轴坐标
	 * @param { options.speed: number } 运动速度
	 * */
	function Bird(options) {
		
		// 如果已经存在鸟实例，直接返回（构造函数返回对象，会覆盖掉默认的新实例）
		// 如果不存在，则把第一次创建鸟实例进行存储。
		if(bird) {
			return bird;
		}else {
			bird = this;
		}
		
		this.ctx = options.ctx;
		this.img = options.img;
		this.widthFrame = options.widthFrame;
		this.heightFrame = options.heightFrame;
		this.w = this.img.width / this.widthFrame;
		this.h = this.img.height / this.heightFrame;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.speed = options.speed || 3;
		this.aSpeed = 0.2;
		this.index = 0;
		
		// 小鸟速度为1时，旋转10度
		this.unitRadian = Math.PI / 18;
		// 小鸟最大旋转60度，最小-60度
		this.maxRadian = Math.PI / 3;
		this.minRadian = -Math.PI / 3;
	}
	
	// 给小鸟扩展方法
	util.extend(Bird.prototype, {
	
		// 绘制小鸟
		draw: function() {
			/**
			 * 0、备份默认状态
			 * 1、平移坐标系的0,0点到小鸟中心
			 * 2、旋转指定弧度
			 * 3、绘制小鸟，但是坐标更新为负的宽高各一半
			 * 4、状态回滚，防止干扰外界图形的绘制
			 * */
		
			this.ctx.save();
			
			this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
			
			// 根据速度求小鸟的旋转弧度，同时限制最大和最小值
			var RorateRadian = this.unitRadian * this.speed;
			RorateRadian = RorateRadian > this.maxRadian? this.maxRadian : RorateRadian;
			RorateRadian = RorateRadian < this.minRadian? this.minRadian : RorateRadian;
			this.ctx.rotate(RorateRadian);
			
			this.ctx.drawImage(this.img,
				this.w * this.index, 0, this.w, this.h,
				-this.w / 2, -this.h / 2, this.w, this.h);
			
			this.ctx.restore();
	
			this.update();
		},
		
		// 更新下一帧绘制所需数据
		update: function() {
			
			// 更新小鸟下一次绘制的帧
			this.index = ++this.index % this.widthFrame;
			
			// 更细小鸟最新坐标
			this.y += this.speed;
			
			// 让速度越来越快，如果小鸟速度为负数，也会因为这个加速度的存在逐渐变为正数
			this.speed += this.aSpeed;
		},
		
		// 让小鸟向上飞一会
		flappyUp: function() {
			this.speed = -5;
		}
	});
	
	// 把构造函数暴漏到外界
	return Bird;
})();
