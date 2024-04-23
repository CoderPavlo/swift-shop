import { Action, Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuth } from '../../models/IUser';
import axios from 'axios';
import { baseUrl } from '../services/baseUrl';

const initialState = {
  role: Cookies.get('role'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<IAuth>) => {
      const { access_token, refresh_token, role } = action.payload;

      // Store tokens in cookies with expiration times
      const accessExpiration = new Date();
      accessExpiration.setTime(accessExpiration.getTime() + 15 * 60 * 1000); // 15 minutes
      Cookies.set('accessToken', access_token, { expires: accessExpiration });
      if (role) {
        state.role = role;
        Cookies.set('role', role, { expires: accessExpiration });
      }


      const refreshExpiration = new Date();
      refreshExpiration.setTime(refreshExpiration.getTime() + 24 * 60 * 60 * 1000); // 1 day
      Cookies.set('refreshToken', refresh_token, { expires: refreshExpiration });
    },
    clearTokens: (state) => {
      state.role = undefined;
      Cookies.remove('role');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }
  },
});

export const updateTokens = (): ((dispatch: Dispatch<Action>) => Promise<string | undefined>) => async (dispatch: Dispatch<Action>) => new Promise((resolve, reject) => {
  let access_token = Cookies.get('accessToken');
  let refresh_token = Cookies.get('refreshToken');

  if (!access_token && refresh_token) {
    axios.post(baseUrl + '/auth/refresh/', {
      refresh_token: refresh_token
    })
    .then((response) => {
      let auth = response.data as IAuth;
      dispatch(setTokens(auth));
      resolve(auth.access_token);
    })
    .catch((error) => {
      resolve(undefined);
    });
  }
  else if (!access_token && !refresh_token) {
    dispatch(clearTokens());
    resolve(undefined); // No access token available
  }
  else {
    resolve(access_token); // Access token already available
  }
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
