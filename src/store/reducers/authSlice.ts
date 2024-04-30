import { Action, Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuth } from '../../models/IUser';
import axios from 'axios';
import { baseUrl } from '../services/baseUrl';


export const saveTokens = (auth: IAuth) => {
  // Store tokens in cookies with expiration times
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
// const initialState = {
//   role: await getRole(),
// };

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
