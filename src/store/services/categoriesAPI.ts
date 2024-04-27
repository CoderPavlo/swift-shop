import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import { ICategory, ISubCategory } from '../../models/ICategory';
import prepareHeaders from './prepareHeaders';


export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + '/category/',
        prepareHeaders,    
    }),
    endpoints: (build)=>({
        fetchSubCategories: build.query<ISubCategory[], void>({
            query: () => ({
                url: 'sub/get/',
            })
        }),
        fetchSubCategoriesByShop: build.query<ISubCategory[], void>({
            query: () => ({
                url: 'sub/shop/',
            })
        }),
        fetchCategories: build.query<ICategory[], void>({
            query: () => ({
                url: 'get/',
            })
        })

    })
})