import barcodeConstants from '../constants/barcode.constant';

export const registerUser = data => {
    return { type: barcodeConstants.SET_REGISTER, data };
}

export const login = () => {
    return { type: barcodeConstants.SET_LOGGED_IN };
}
