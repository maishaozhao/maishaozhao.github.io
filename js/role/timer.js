/**
 * @constructor 计时器类
 * @param { options: Object } 可配参数
 * @param { options.ctx: CanvasContext } 绘图环境
 * @param { options.x: number } 文字x轴坐标
 * @param { options.y: number } 文字x轴坐标
 * @param { options.textAlign: string } 文字水平对其方式
 * @param { options.textBaseline: string } 文字垂直对其方式
 * @param { options.fillStyle: string } 文字颜色样式
 * @param { options.font: string } 文字样式
 * @patam { options.gameRunTime: number } 代表游戏已运行多少毫秒
 * */
function Timer(options) {
	this.ctx = options.ctx;
	this.x = options.x || this.ctx.canvas.width;
	this.y = options.y || 0;
	this.textAlign = options.textAlign || 'right';
	this.textBaseline = options.textBaseline || 'top';
	this.fillStyle = options.fillStyle || 'hotpink';
	this.font = options.font || '400 24px 微软雅黑';
	this.gameRunTime = options.gameRunTime || 0;
	this.lastComputedTime = options.lastComputedTime || Date.now();
}

// 扩展原型上的方法
util.extend(Timer.prototype, {
	
	// 把坚持时间绘制到画布中
	draw: function() {
		/**
		 * 1、 获取要绘制的文字
		 * 2、备份默认状态
		 * 3、修改各种属性
		 * 4、绘制文字
		 * 5、回滚到默认状态
		 * */
		
		// 先计算游戏最新已运行时间
		this.update();
		
		// 获取要绘制的文字
		var text = this.format();
		
		this.ctx.save();
		
		this.ctx.textAlign = this.textAlign;
		this.ctx.textBaseline = this.textBaseline;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.font = this.font;
		this.ctx.fillText(text, this.x, this.y);
		
		this.ctx.restore();	
	},
	
	// 更新坚持时间
	update: function() {
		/**
		 * 1、获取当前最新的时间毫秒值
		 * 2、使用最新的减去上一次获取的时间，得到中间的差值
		 * 3、把这个差值累加到游戏以运行时间中，就得到游戏最新的以运行时间
		 * 4、为了下一次的计算，更新上一次获取的时间为当前最新时间
		 * */
		var now = Date.now();
		this.gameRunTime += now - this.lastComputedTime;
		this.lastComputedTime = now;
	},
	
	// 把游戏已运行的毫秒值 格式化为 用户可读性比较强的文字说明
	format: function() {
		
		var hours = Math.floor(this.gameRunTime / (60 * 60 * 1000));
		var minutes = Math.floor(this.gameRunTime % (60 * 60 * 1000) / (60 * 1000));
		var seconds = Math.floor(this.gameRunTime % (60 * 1000) / 1000);
		return '您已坚持了:' + hours + '小时' + minutes + '分钟' + seconds + '秒!!!';
	}
});
