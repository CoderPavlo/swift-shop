import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import { IGood, IGoodByIdForEdit, IGoodCardData, IGoodFilterForShop, IGoodFilterHome, IGoods, IPagination, ITag } from '../../models/IGood';
import prepareHeaders from './prepareHeaders';


export const goodAPI = createApi({
    reducerPath: 'goodAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + '/good/',
        prepareHeaders,
    }),
    tagTypes: ['Tag', 'Good'],
    endpoints: (build) => ({
        fetchTags: build.query<ITag[], void>({
            query: () => {
                return {
                    url: 'tags/',
                };
            },
            providesTags: ['Tag'],
        }),

        addTags: build.mutation<ITag[], ITag[]>({
            query: (data) => ({
                url: 'tags/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tag'],
        }),
        addGood: build.mutation<void, IGood>({
            query: (good) => {
                const formData = new FormData();
                formData.append('name', good.name);
                if (good.image)
                    formData.append('image', good.image);
                formData.append('description', good.description);
                formData.append('price', String(good.price));
                formData.append('discount', String(good.discount));
                formData.append('count', String(good.count));
                for (let id of good.categoriesID)
                    formData.append('categories', id.toString());
                for (let id of good.tagsID)
                    formData.append('tags', id.toString());

                return {
                    url: 'goods/',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Good'],
        }),

        fetchGoodsByShop: build.query<IPagination<IGoodCardData>, IGoodFilterForShop>({
            query: (filter) => {
                return {
                    url: `goodsByShop/?categoryId=${filter.categoryId}&searchQuery=${filter.searchQuery}&order=${filter.order}&page=${filter.page}`,
                };
            },
            providesTags: ['Good'],

        }),
        deleteGood: build.mutation<void, number>({
            query: (id) => ({
                url: `goodByShop/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Good', 'Tag'],
        }),
        fetchGoodByIdForEdit: build.query<IGoodByIdForEdit, number>({
            query: (id) => {
                return {
                    url: `goodByShop/${id}/`,
                };
            },
            providesTags: ['Good'],
        }),
        updateGood: build.mutation<void, IGood>({
            query: (good) => {
                const formData = new FormData();
                formData.append('name', good.name);
                if (good.image)
                    formData.append('image', good.image);
                formData.append('description', good.description);
                formData.append('price', String(good.price));
                formData.append('discount', String(good.discount));
                formData.append('count', String(good.count));
                for (let id of good.categoriesID)
                    formData.append('categories', id.toString());
                for (let id of good.tagsID)
                    formData.append('tags', id.toString());

                return {
                    url: `goodByShop/${good.id}/`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Good', 'Tag'],
        }),

        fetchGoodsForUser: build.query<IPagination<IGoodCardData>, IGoodFilterHome>({
            query: (filter) => {
                return {
                    url: `goodsForUser/?tab=${filter.tab}&page=${filter.page}`,
                };
            },
            providesTags: ['Good'],
        }),
        fetchGoodById: build.query<IGoodCardData, number>({
            query: (id) => {
                return {
                    url: `goodForUser/${id}/`,
                };
            },
            providesTags: ['Good'],
        }),
        fetchSimilarGoods: build.query<IPagination<IGoodCardData>, {id: number, page:number}>({
            query: (filter) => {
                return {
                    url: `similar/?id=${filter.id}&page=${filter.page}`,
                };
            },
            providesTags: ['Good'],
        }),
    })
})