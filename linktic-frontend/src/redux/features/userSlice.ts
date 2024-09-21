import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UsersItems } from '../../models/Users';

const initialState: UsersItems = {
    id: 0,
    identification_type: null,
    identification_number: 0,
    email: "",
    first_name: "",
    last_name: "",
    profile_image_url: null,
    phone_area_code: 0,
    phone_number: 0,
    status_id: 0,
    status_name: "",
    roles_id: 0,
    role_name: "",
    devices_id: "",
    created_at: "",
    updated_at: "",
};
// account
// device
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UsersItems>) {
            state.id = action?.payload?.id ?? 0;
            state.identification_type = action?.payload?.identification_type ?? null;
            state.identification_number = action?.payload?.identification_number ?? 0;
            state.email = action?.payload?.email ?? "";
            state.first_name = action?.payload?.first_name ?? "";
            state.last_name = action?.payload?.last_name ?? "";
            state.profile_image_url = action?.payload?.profile_image_url ?? null;
            state.phone_area_code = action?.payload?.phone_area_code ?? 0;
            state.phone_number = action?.payload?.phone_number ?? 0;
            state.status_id = action?.payload?.status_id ?? 0;
            state.roles_id = action?.payload?.roles_id ?? 0;
            state.devices_id = action?.payload?.devices_id ?? "";
            state.created_at = action?.payload?.created_at ?? "";
            state.updated_at = action?.payload?.updated_at ?? "";
        },
        clearUser(state) {
            state.id = 0;
            state.identification_type = null;
            state.identification_number = 0;
            state.email = "";
            state.first_name = "";
            state.last_name = "";
            state.profile_image_url = null;
            state.phone_area_code = 0;
            state.phone_number = 0;
            state.status_id = 0;
            state.roles_id = 0;
            state.devices_id = "";
            state.created_at = "";
            state.updated_at = "";
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;