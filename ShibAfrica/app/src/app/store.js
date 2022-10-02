import { userReducer } from '../features/User/userSlice'
import { combineReducers } from 'redux'
import { configureStore, createAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createMigrate from 'redux-persist/es/createMigrate';
import thunk from 'redux-thunk'


export const rootReducer = combineReducers({
    user:userReducer,
});
const migrations = {
    3: (state) => {
        return{
            ...state,
            device:undefined,
        }
    },
    4: (state) => {
        return {
            device:state.device
        }
    }
}
const persistConfig = {
    key:'root',
    storage,
    version:4,
    stateReconciler: autoMergeLevel2,
    migrate: createMigrate(migrations, { debug:true })
}
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
})
export const persistor = persistStore(store)

export const factory = ()=>{
    return {store:store, persistor:persistor}
  }