import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./services/authAPI";
import authReducer from "./reducers/authSlice";
import { categoriesAPI } from "./services/categoriesAPI";
import { goodAPI } from "./services/goodAPI";
import { orderAPI } from "./services/orderAPI";
import { forecastAPI } from "./services/forecastAPI";

const rootReducer = combineReducers({
    // themeModeReducer,
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [goodAPI.reducerPath]: goodAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [forecastAPI.reducerPath]: forecastAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=> 
            getDefaultMiddleware().concat(authAPI.middleware, categoriesAPI.middleware, goodAPI.middleware, orderAPI.middleware, forecastAPI.middleware)
    })
}

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof setupStore>
export type TAppDispatch = TAppStore['dispatch']