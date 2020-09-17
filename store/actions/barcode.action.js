import barcodeConstants from '../constants/barcode.constant';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = data => {
    return { type: barcodeConstants.SET_REGISTER, data };
}

export const login = () => {
    return { type: barcodeConstants.SET_LOGGED_IN, token: uuidv4() };
}
