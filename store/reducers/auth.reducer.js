import authConstants from '../constants/auth.constant'

const initialState = {
    logged: false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.SET_LOGGED_IN:
            return { ...state, logged: true }
        case authConstants.SET_LOGGED_OUT:
            return { ...state, logged: false }
        default:
            return state;
    }
}

export default AuthReducer;
