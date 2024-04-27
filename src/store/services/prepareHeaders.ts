import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./baseUrl";
import { IAuth } from "../../models/IUser";
import { saveTokens } from "../reducers/authSlice";

export default async function prepareHeaders(headers: Headers): Promise<Headers> {
    let access_token = Cookies.get('accessToken');
    let refresh_token = Cookies.get('refreshToken');

    if (!access_token && refresh_token) {
        await axios.post(baseUrl + '/auth/refresh/', {
            refresh_token: refresh_token
        })
            .then(async (response) => {
                let auth = response.data as IAuth;
                saveTokens(auth);
                access_token = auth.access_token;
            })
            .catch((error) => {
            });
    }
    if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
}