import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import { ICategory, ISubCategory } from '../../models/ICategory';


export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl + '/category/'}),
    endpoints: (build)=>({
        fetchSubCategories: build.query<ISubCategory[], void>({
            query: () => ({
                url: 'sub/get/',
            })
        }),

        fetchCategories: build.query<ICategory[], void>({
            query: () => ({
                url: 'get/',
            })
        })

    })
})