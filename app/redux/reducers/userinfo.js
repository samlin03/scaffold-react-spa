import * as actionTypes from '../constants/userinfo'

const initialState = {
	cityName: 'shehui',
	hasLogined: false
};

function userinfo(state = initialState, action) {
	switch (action.type) {
		case actionTypes.USERINFO_LOGIN:
			return Object.assign({}, state, action.data);

		case actionTypes.UPDATA_CITYNAME:
			return Object.assign({}, state, action.data);

		default:
			return state;
	}
}

export default userinfo;