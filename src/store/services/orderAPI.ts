import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import prepareHeaders from './prepareHeaders';
import {ICart, IGroupedCarts, ICartOrderData} from '../../models/IOrder';
import { IPagination } from '../../models/IGood';

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + '/order/',
        prepareHeaders,
    }),
    tagTypes: ['Cart', 'Order'],
    endpoints: (build) => ({
        addGoodToCart: build.mutation<void, ICart>({
            query: (data) => ({
                url: 'cart/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Cart'],
        }),
        fetchCart: build.query<IPagination<IGroupedCarts>, number>({
            query: (page) => {
                return {
                    url: `cart/?page=${page}`,
                };
            },
            providesTags: ['Cart'],
        }),
        deleteFromCart: build.mutation<void, number>({
            query: (id) => ({
                url: `cart/?id=${id}`,
                method: 'DELETE',
            }),
        }),
        buyCartGood: build.mutation<void, ICartOrderData>({
            query: (data) => ({
                url: 'cartToOrder/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Cart', 'Order'],
        }),

    })
})