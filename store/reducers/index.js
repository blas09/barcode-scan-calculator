import {combineReducers} from 'redux';
import barcodeReducer from './barcode.reducer';

const rootReducer = combineReducers({
    barcode: barcodeReducer
});

export {rootReducer};
export default {rootReducer};
