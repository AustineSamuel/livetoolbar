import { users_addresses } from '@/app_modules/realtime/UpdateAddressOnMovement';
import { User } from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';
import { StringFormat } from 'firebase/storage';
 
export interface appstate{
  message:string,
  visible:boolean,
  type:string,
  user:User| null,
  userAddress:users_addresses | null
}
const initialState:appstate = {
  user: null,
  userAddress: null,
  visible: false,
  message: '',
  type: 'info', // can be 'info', 'success', 'error'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.user = null;
    },
    setUserAddress: (state, action) => {
        state.userAddress = action.payload;
    },
  },
});

export const {  setUser, reset,setUserAddress } = appSlice.actions;
export default appSlice.reducer;
