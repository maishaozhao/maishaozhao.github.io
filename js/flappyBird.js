/**
 * @constructor 飞翔小鸟类
 * @param { options: Object } 可配参数
 * @param { options.container: string } 存放游戏画布的容器
 * */
function FlappyBird(options) {
	
	// 游戏在页面中的容器
	this.container = options.container;
	
	// 绘制游戏所需的上下文
	this.ctx = null;
	
	// 游戏所属的所有图片资源地址
	this.imgSrc = {
		sky: 'img/sky.png',
		land: 'img/land.png',
		bird: 'img/birds.png',
		pipeDown: 'img/pipeDown.png',
		pipeUp: 'img/pipeUp.png'
	};
	
	// 用来存储游戏中所需的所有角色实例
	this.roles = {
		skyArr: [],
		pipeArr: [],
		landArr: [],
		timerArr: [],
		birdArr: []
	}; 
	
	// 游戏是否暂停
	this.isPause = false;
}

// 给原型扩展方法
FlappyBird.prototype = {
	
	// 开始运行游戏
	run: function() {
		/**
		 * 1、先加载图片
		 * 2、创建游戏角色
		 * 3、绘制游戏画面
		 * */
		imgLoad(this.imgSrc, function(imgObj) {
			
			// 画布宽高依赖背景宽高，所以把ctx的创建放到图片加载完毕后
			this.ctx = util.getCtx(this.container, imgObj.sky.width, imgObj.sky.height);
			
			// 绘图环境初始化完毕后，才能绑定事件
			this.bind();
			
			// 把所有图片资源存储到实例身上，方便其他地方使用
			this.imgObj = imgObj;
			
			// 创建角色，依次绘制
			this.initRole();
			this.draw();
		}.bind(this));
	},
	
	// 暂停游戏
	pause: function() {
		this.isPause = !this.isPause;
	},
	
	// 结束游戏
	end: function() {
		this.isPause = true;
	},
	
	// 计算轮播角色的数量
	// 根据画布宽和角色宽，求无缝滚动需要多少个角色才能完成
	getRoleNumber: function(cvsWidth, roleWidth) {
		return Math.ceil(cvsWidth / roleWidth) + 1;
	},
	
	// 创建游戏所需角色
	initRole: function() {
		
		// 第一次需要告诉对方，那么公共的属，以后创建实例时，就不需要传了
		// 调用getRoleFactory得到一个创建角色的工厂函数，并且指定了一些公共属性
		this.roleFactory = getRoleFactory({
			ctx: this.ctx
		});
		
		// 把this身上的几个属性用变量缓存一下，节省代码修改时间。
		var imgObj = this.imgObj;
		var ctx = this.ctx;
		var roles = this.roles;
		var roleFactory = this.roleFactory;
		var getRoleNumber = this.getRoleNumber;

		// 创建背景实例
		var skyLen = getRoleNumber(ctx.canvas.width, imgObj.sky.width);
		for(var i = 0; i < skyLen; i++) {
			roles.skyArr.push(roleFactory('Sky', {
				img: imgObj.sky,
				x: imgObj.sky.width * i
			}));
		}
		
		// 创建管道实例
		var pipeLen = getRoleNumber(ctx.canvas.width, imgObj.pipeDown.width + 150);
		for(var i = 0; i < pipeLen; i++) {
			roles.pipeArr.push(roleFactory('Pipe', {
				imgPipeDown: imgObj.pipeDown,
				imgPipeUp: imgObj.pipeUp,
				leftRightSpace: 150,
				topBottomSpace: 150,
				maxHeight: 300,
				x: 200 + (imgObj.pipeDown.width + 150) * i
			}));
		}
		
		// 创建大地实例
		var landLen = getRoleNumber(ctx.canvas.width, imgObj.land.width);
		for(var i = 0; i < landLen; i++) {
			roles.landArr.push(roleFactory('Land', {
				img: imgObj.land,
				x: imgObj.land.width * i,
				y: ctx.canvas.height - imgObj.land.height
			}));
		}
		
		// 创建计时器
		roles.timerArr.push(roleFactory('Timer'));
		
		// 创建鸟
		roles.birdArr.push(roleFactory('Bird',{
			img: imgObj.bird,
			widthFrame: 3,
			heightFrame: 1
		}));
	},
	
	// 小鸟死亡判断
	birdIsDie: function() {
		
		// 因为小鸟使用了单例模式，所有以后需要使用鸟实例的话，直接new构造函数即可得到
		var bird = new Bird();
		
		// 飞出天空，撞向大地，或者撞管道都死
		if(bird.y < -bird.h || bird.y > (this.ctx.canvas.height - this.imgObj.land.height - bird.h + 20)) {
			return true;
		}
		
		else if(this.ctx.isPointInPath((bird.x + bird.w / 2), (bird.y + bird.h / 2))) {
			return true;
		}
		
		return false;
	},
	
	// 绑定事件
	bind: function() {
		
		// 监听画布点击事件，点击时让小鸟上飞
		this.ctx.canvas.addEventListener('click', function() {
			new Bird().flappyUp();
		});
	},
	
	// 绘制游戏画面
	draw: function() {
		
		var self = this;
		var ctx = this.ctx;
		var roles = this.roles;
		var birdIsDie = this.birdIsDie.bind(this);
		
		// 绘制游戏画面
		(function loop() {
			requestAnimationFrame(function() {
				
				// 没有暂停，则绘制游戏
				if(!self.isPause) {
					
					// 清除之前的游戏画面，然后绘制新的
					ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
					ctx.beginPath();
					
					// 对上面的代码进行优化，减少冗余代码
					for(var key in roles) {
						roles[key].forEach(function(role, i) {
							role.draw();
						});
					}
		
//					// 小鸟没死，游戏继续
//					if(!birdIsDie()) {
//						loop();
//					}

					// 小鸟死亡，结束游戏
					if(birdIsDie()) {
						self.end();
					}
				}	
				
				// 有了游戏的暂停继续，那么定时器不会间断
				loop();
			});
		})();
	}
};
