import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Unfoldable {
    unfoldable: boolean;
}

const initialState: Unfoldable = {
    unfoldable: false,
};

export const togglerSlice = createSlice({
    name: "toggler",
    initialState,
    reducers: {
        // startUnfoldable(state) {
        //     state.unfoldable = true;
        // },
        setUnfoldable(state, action: PayloadAction<Unfoldable>) {
            state.unfoldable = action.payload.unfoldable;
        },
        // stopUnfoldable(state) {
        //     state.unfoldable = false;
        // },
    }
})

// export const { startUnfoldable, stopUnfoldable } = togglerSlice.actions;
export const { setUnfoldable } = togglerSlice.actions;
export default togglerSlice.reducer;
