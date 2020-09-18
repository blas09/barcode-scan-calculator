import barcodeConstants from '../constants/barcode.constant'

const initialState = {
    initiated: false,
    logged: false,
    user: {},
    products: [],
}

const barcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case barcodeConstants.SET_REGISTER:
            return { ...state, user: action.data, initiated: true };
        case barcodeConstants.SET_PRODUCT:
            let products = state.products.filter(product => product.barcode !== action.data.barcode);
            products.push(action.data);

            return { ...state, products: products }
        default:
            return state;
    }
}

export default barcodeReducer;
