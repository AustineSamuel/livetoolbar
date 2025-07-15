import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
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
    }
  },
});

export const {  setUser, reset } = appSlice.actions;
export default appSlice.reducer;
