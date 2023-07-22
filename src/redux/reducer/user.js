import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userData: null,

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setUserData } = authSlice.actions;