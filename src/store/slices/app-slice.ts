import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { store } from '../store'

import { setAll } from "../../helpers/set-all";





interface UserType {
    id: string;
    email: string;
    admin: boolean;
    vouchers: number;
    idsSaved: [number]; 
}


interface UserState {
    id: "";
    email: "";
    admin: false;
    voucher: 0;
    idsSaved: [0];
}

// const blankUser: UserType = {
//     id: "",
//     email: "",
//     admin: false,
//     vouchers: 0,
//     idsSaved: [0]
// }

const initialState: UserType = {
    id: "",
    email: "",
    admin: false,
    vouchers: 0,
    idsSaved: [0]

}


export const appSlice = createSlice({
    name: "appData",
    initialState,
    reducers: {
        loadAppData(state, action){
            setAll(state, action.payload);
        }
    }
})


export const { loadAppData } = appSlice.actions;
type RootState = ReturnType<typeof store.getState>;
export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;