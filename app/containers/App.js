import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userInfoActionsFromOtherFile from '../redux/actions/userinfo';
import LocalStore from '../WebStorage/localStore';
import { CITYNAME } from '../WebStorage/localStoreKey';
import { USERID } from '../Cookies/CookiesName';

class App extends React.Component {
	componentDidMount() {
		// 获取本地存储中的数据
		let cityName = LocalStore.getItem(CITYNAME);
		
		// 获取cookies中的数据
		let { cookies } = this.props;
		let userId = cookies.get(USERID);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	};
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    };
}

export default withRouter(
	connect(
		mapStateToProps,
	    mapDispatchToProps
	)(withCookies(App))
);
