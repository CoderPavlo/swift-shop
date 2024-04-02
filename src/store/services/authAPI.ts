import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuth, IUser } from '../../models/IUser'


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/auth/'}),
    endpoints: (build)=>({
        register: build.mutation<IAuth, IUser>({
            query: (user)=>{
                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('password', user.password);
                if(user.role)
                formData.append('role', user.role);
                
                if (user.buyer) {
                    formData.append('buyer.first_name', user.buyer.first_name);
                    formData.append('buyer.last_name', user.buyer.last_name);
                    formData.append('buyer.day', String(user.buyer.day));
                    formData.append('buyer.month', String(user.buyer.month));
                    formData.append('buyer.year', String(user.buyer.year));
                    formData.append('buyer.gender', String(user.buyer.gender));
                }
                
                if (user.seller) {
                    formData.append('seller.name', user.seller.name);
                    formData.append('seller.phone', user.seller.phone);
                    formData.append('seller.adress', user.seller.adress);
                }
                
                if (user.avatar) {
                    formData.append('avatar', user.avatar);
                }
                
                return {
                    url: 'register/',
                    method: 'POST',
                    body: formData
                };
            }
        }),
        login: build.mutation<IAuth, IUser>({
            query: (user)=> ({
                url: 'login/',
                method: 'POST',
                body: user
            })
        })

    })
})