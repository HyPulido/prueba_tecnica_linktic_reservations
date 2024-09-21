import { createSlice, isAction, PayloadAction } from '@reduxjs/toolkit'

interface Confirm {
    confirm: boolean;
    show: boolean;
    action: string;
    message: string;
}

interface Payload {
    action: string;
    message: string;
}

const initialState: Confirm = {
    confirm: false,
    show: false,
    action: "",
    message: ""
};

export const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {
        yesConfirm(state) {
            state.confirm = true;
            state.show = false;
        },
        noConfirm(state) {
            state.confirm = false;
            state.show = false;
        },
        showConfirm(state, action: PayloadAction<Payload>) {
            console.log(action);
            state.show = true;
            state.message = action.payload.message;
            state.action = action.payload.action;
        },
        hideConfirm(state) {
            state.show = false;
            state.confirm = false;
            state.message = "";
            state.action = "";

        }
    }
})

export const { showConfirm, hideConfirm, yesConfirm, noConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
