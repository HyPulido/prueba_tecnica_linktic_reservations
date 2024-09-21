import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthItems } from '../../models/Auth';

const initialState: AuthItems = {
    access_token: "",
    token_type: "",
    expires_in: 0,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthItems>) {
            state.access_token = action?.payload?.access_token ?? "";
            state.token_type = action?.payload?.token_type ?? "";
            state.expires_in = action?.payload?.expires_in ?? 0;
        },
        clearAuth(state) {
            state.access_token = "";
            state.token_type = "";
            state.expires_in = 0;
        },
    }
})

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
