import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuth } from '../../models/IUser';

const initialState = {
  role: Cookies.get('role')
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action:PayloadAction<IAuth>) => {
      const { access_token, refresh_token, role } = action.payload;
      state.role = role;
      // Store tokens in cookies with expiration times
      const accessExpiration = new Date();
      accessExpiration.setTime(accessExpiration.getTime() + 15 * 60 * 1000); // 15 minutes
      Cookies.set('accessToken', access_token, { expires: accessExpiration });
      if(role)
        Cookies.set('role', role, { expires: accessExpiration });

      const refreshExpiration = new Date();
      refreshExpiration.setTime(refreshExpiration.getTime() + 24 * 60 * 60 * 1000); // 1 day
      Cookies.set('refreshToken', refresh_token, { expires: refreshExpiration });
    },
    clearTokens: (state) => {
      state.role = undefined;
      // Clear cookies
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
