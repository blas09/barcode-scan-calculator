import authConstants from '../constants/auth.constant';

export const login = () => {
    return { type: authConstants.SET_LOGGED_IN };
}

export const logout = () => {
    return { type: authConstants.SET_LOGGED_OUT };
}
