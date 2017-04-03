/**
 * @function 根据角色类型，创建对应的角色实例
 * @param { roleName: string } 要创建的角色类型
 * @param { options: Object } 创建对应角色时要传的可配参数
 * */
//function getRole(roleName, options) {
//	if(roleName == 'bird') {
//		return new Bird(options);
//	}else if(roleName == 'land') {
//		return new Land(options);
//	}else if(roleName == 'pipe') {
//		return new Pipe(options);
//	}else if(roleName == 'sky') {
//		return new Sky(options);
//	}else if(roleName == 'timer') {
//		return new Timer(options);
//	}
//}

/**
 * @function 根据角色类型，创建对应的角色实例
 * @param { roleName: string } 要创建的角色类型
 * @param { options: Object } 创建对应角色时要传的可配参数
 * */
/*function getRole(roleName, options) {

	return new window[roleName](options);
	
//  动态拼接所属代码，然后执行，黑科技。 
//	return eval('new ' + roleName + '(options)');
}*/

/**
 * @function 获取一个用来创建角色对象的函数
 * @param { baseOptions: Object } 缓存创建角色实例时的公共属性，一劳永逸。
 * @return { Function } 该函数是一个工厂，可以用来创建角色实例
 * */
function getRoleFactory(baseOptions) {
	var baseOptions = baseOptions;
	
	/**
	 * @function 根据角色类型，创建对应的角色实例
	 * @param { roleName: string } 要创建的角色类型
	 * @param { options: Object } 创建对应角色时要传的可配参数
	 * */
	return function(roleName, options) {
		options = options || {};
		util.extend(options, baseOptions);
		return new window[roleName](options);
	}
}

