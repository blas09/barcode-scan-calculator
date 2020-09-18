import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import barcodeReducer from "./reducers/barcode.reducer";
import authReducer from "./reducers/auth.reducer";

const rootReducer = combineReducers({
    barcode: barcodeReducer,
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'barcode',
    ],
    blacklist: [
        'auth',
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        createLogger(),
    ),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};
