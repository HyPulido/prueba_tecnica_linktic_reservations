import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Segments {
    segments: number;
}

const initialState: Segments = {
    segments: 0,
};

export const messageSlice = createSlice({
    name: "segments",
    initialState,
    reducers: {
        setSegments(state, action: PayloadAction<Segments>) {
            state.segments = action.payload.segments
        },
    }
})

export const { setSegments } = messageSlice.actions;
export default messageSlice.reducer;
