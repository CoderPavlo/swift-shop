import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import prepareHeaders from './prepareHeaders';
import { ICategoryStatistics, IGoodStatistics, IInfluencingFactors, IStatistics} from '../../models/IStatistics';

export const forecastAPI = createApi({
    reducerPath: 'forecastAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + '/forecast/',
        prepareHeaders,
    }),
    tagTypes: [],
    endpoints: (build) => ({
        fetchUserActivity: build.query<IStatistics[], number>({
            query: (period) => {
                return {
                    url: `userActivity/?period=${period}`,
                };
            },
        }),
        fetchGoodStatistics: build.query<IGoodStatistics, number>({
            query: (period) => {
                return {
                    url: `goodsStatistics/?period=${period}`,
                };
            },
        }),
        fetchCategoryStatistics: build.query<ICategoryStatistics[], {period: number, type: number}>({
            query: (data) => {
                return {
                    url: `categoryStatistics/?period=${data.period}&type=${data.type}`,
                };
            },
        }),
        fetchAdditionalStatistics: build.query<IStatistics[], number>({
            query: (period) => {
                return {
                    url: `additionalStatistics/?period=${period}`,
                };
            },
        }),
        fetchInfluencingFactors: build.query<IInfluencingFactors, void>({
            query: () => {
                return {
                    url: `analysis/`,
                };
            },
        }),
    })
})