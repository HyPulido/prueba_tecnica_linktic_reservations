import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/userSlice'
import authSlice from "./features/authSlice";
import loadSlice from "./features/loadSlice";
import messageSlice from "./features/messageSlice";
import confirmSlice from "./features/confirmSlice";
import togglerSlice from "./features/togglerSlice";

export const store = configureStore({
    reducer: {
        userSlice,
        authSlice,
        loadSlice,
        messageSlice,
        confirmSlice,
        togglerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch