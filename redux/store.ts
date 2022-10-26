import { configureStore, combineReducers, EnhancedStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import categoryReducer, { CategoriesState } from "./slices/categories";
import inventoryReducer, { InventoryState } from "./slices/inventory";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    categories: categoryReducer,
    inventoryItems: inventoryReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export interface State {
    categories: any;
    inventoryItems: any;
}

export const store: EnhancedStore<State> = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store);
