import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./services/authAPI";
import authReducer from "./reducers/authSlice";

const rootReducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
    authReducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=> 
            getDefaultMiddleware().concat(authAPI.middleware)
    })
}

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof setupStore>
export type TAppDispatch = TAppStore['dispatch']