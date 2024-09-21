import { createSlice } from '@reduxjs/toolkit'

interface Load {
    loading: boolean;
}

const initialState: Load = {
    loading: false,
};

export const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
    }
})

export const { startLoading, stopLoading } = loadSlice.actions;
export default loadSlice.reducer;
