import appReducer from './slices/app-slice'
import { configureStore } from '@reduxjs/toolkit'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';



export const store = configureStore({
    reducer: {
        app: appReducer,
        // middleware: getDefaultMiddleware({
        //     serializableCheck: false
        // })
    }
})



