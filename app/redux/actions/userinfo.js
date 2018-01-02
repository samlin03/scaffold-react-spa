import * as actionTypes from '../constants/userinfo';

export function login(data) {
	return {
		type: actionTypes.USERINFO_LOGIN,
		data
	};
}

export function updataCityName(data) {
	return {
		type: actionTypes.UPDATA_CITYNAME,
		data
	};
}