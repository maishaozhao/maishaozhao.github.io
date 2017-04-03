/**
 * 需求：实现一个方法，调用该方法可以帮助我们创建图像，当这些图像全局加载完毕后，传递给回调使用
 * 传入的srcObj长这个样子{ name1: src, name2: src, name3： src... }
 * 所有图片加载完毕后传递给回调函数的实参样子{ name1: img, name2: img, name3： img... }
 * */
function imgLoad(srcObj, fn) {
	/**
	 * 1、遍历srcObj得到所有要加载的图片地址
	 * 2、然后创建对应的图片对象，设置其src
	 * 3、把创建好的图像存起来
	 * 4、保证所有图片都加载完毕后，把所有存储的图像一起传给回调使用
	 * 4.1、在遍历srcObj的时候，通过一个变量，记录所有要加载的图片数量
	 * 4.2、然后每一张图片触发onload事件时，再通过一个新的变量记录
	 * 4.3、每次有一个图片加载完毕，我就判断已经加载完毕的图片数量有没有达到要加载的图片总数
	 * */
	
	// 用来存储所有的图像
	var imgObj = {};
	
	var srcTotal = 0,        // 要加载的图片总数
		imgLoadedTotal = 0;  // 已加载的图片总和
	
	// 遍历所有src，创建对应的图像
	for(var key in srcObj) {
		srcTotal++;          // 求总数
		
		var img = new Image();  // 一个src对应一个img对象
		img.src = srcObj[key];
		imgObj[key] = img;      // 把每一个src对应的img存储在一起，最终一起传给回调
		
		img.onload = function() {
			
			// 每有一张图片加载完毕，就记录一次，然后判断这个数量有没有达到要加载的总数
			// 如果达到了，那么执行回调，把所有加载好的图像传递过去供其使用。
			if(++imgLoadedTotal >= srcTotal) {
				fn(imgObj);
			}
		}
	}
}