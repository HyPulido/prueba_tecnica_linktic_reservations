import { RootState } from "./store";

export const selectAuth = (state: RootState) => state.authSlice;
export const selectLoad = (state: RootState) => state.loadSlice;
export const selectMessage = (state: RootState) => state.messageSlice;
export const segment = (state: RootState) => state.messageSlice.segments;
export const selectConfirm = (state: RootState) => state.confirmSlice;
export const toggler = (state: RootState) => state.togglerSlice;