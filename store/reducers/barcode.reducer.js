import barcodeConstants from '../constants/barcode.constant'

const initialState = {
    initiated: false,
    user: {},
}

const barcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case barcodeConstants.SET_REGISTER:
            return { ...state, user: action.data, initiated: true };
        case barcodeConstants.SET_LOGGED_IN:
            return { ...state, user: {...state.user, token: action.token} }
        default:
            return { ...state };
    }
}

export default barcodeReducer;
