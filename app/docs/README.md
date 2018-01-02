# TabBar 组件，`我的` 要跳转路由，至usercenter页面
解决：
	用withRouter组件包裹TarBar组件
	在`我的`里的onPress 添加this.props.history.push('/usercenter')


# 跳转页面，route变了，但是要刷新才能出现新页面
思路：所有组件嵌套在App父组件里，因为App里用redux的connect套了一层
解决：用`withRouter`再套一层
	export default withRouter(
		connect(
		    mapStateToProps,
		    mapDispatchToProps
		)(App)
	);

# 生命周期
组件开始加载 => getDefaultProps`这时候就可以获取到默认的服务器全局state` => getInitialState => componentWillMount => render`子组件按顺序也初次开始渲染` => componentDidMount => ing`[由于页面逻辑，有可能会卸载(unMount)=>componentillUnMount => end]` => `React解析器监听到props更新了` => componentWillReceiveProps => shouldComponentUpdate`为true则升级，为false不升级` => componentWillUpdate => 第二次render`只有这时候，才能获取新的props` => componentDidUpdate

# redux 的initialState
在`redux/reducers/userinfo.js`中的initialState可作本地测试用,
在`root.js`中的initialState是服务器端载入的初始化state，会覆盖本地的initialState


# Link无法跳转路由。。===dev
antd-mobile的tabBar组件，外面套的div层导致的，fixed盖住了a，无法跳转
