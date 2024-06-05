import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuth } from '../../models/IUser';
import axios from 'axios';
import { baseUrl } from '../services/baseUrl';


export const saveTokens = (auth: IAuth) => {
  const accessExpiration = new Date();
  accessExpiration.setTime(accessExpiration.getTime() + 15 * 60 * 1000); // 15 minutes
  Cookies.set('accessToken', auth.access_token, { expires: accessExpiration });

  if (auth.role)
    Cookies.set('role', auth.role, { expires: accessExpiration });

  const refreshExpiration = new Date();
  refreshExpiration.setTime(refreshExpiration.getTime() + 24 * 60 * 60 * 1000); // 1 day
  Cookies.set('refreshToken', auth.refresh_token, { expires: refreshExpiration });
}

export const getRole = async () : Promise<string | undefined> => {
  let role = Cookies.get('role');
  const refresh = Cookies.get('refreshToken');
  if (!role && refresh) {
    await axios.post(baseUrl + '/auth/refresh/', {
      refresh_token: refresh
    })
      .then(async (response) => {
        let auth = response.data as IAuth;
        role = auth.role;
        saveTokens(auth);
      })
      .catch((error) => {
      });
  }
  return role;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role: await getRole(),
  },
  reducers: {
    setTokens: (state, action: PayloadAction<IAuth>) => {
      saveTokens(action.payload);
      if (action.payload.role) {
        state.role = action.payload.role;
      }
    },
    clearTokens: (state) => {
      state.role = undefined;
      Cookies.remove('role');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
