import barcodeConstants from '../constants/barcode.constant';

export const registerUser = data => {
    return {type: barcodeConstants.SET_REGISTER, data};
}

export const saveProduct = data => {
    return {type: barcodeConstants.SET_PRODUCT, data};
}

export const updateUser = data => {
    return {type: barcodeConstants.UPDATE_REGISTER, data};
}
