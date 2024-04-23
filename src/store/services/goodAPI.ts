import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './baseUrl';
import { IGood, ITag } from '../../models/IGood';


export const goodAPI = createApi({
    reducerPath: 'goodAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl + '/good/'}),
    endpoints: (build)=>({
        fetchTags: build.query<ITag[], void>({
            query: () => {
                return {
                    url: 'tags/',
                };
            }
        }),
        addTags: build.mutation<ITag[], {body: ITag[], token?: string}>({
            query: (data)=> ({
                url: 'tags/add',
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` }
            })
        }),
        addGood: build.mutation<void, {body: IGood, token?: string}>({
            query: (data)=>{
                let good = data.body;
                const formData = new FormData();
                formData.append('name', good.name);
                if(good.image)
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
                    headers: { Authorization: `Bearer ${data.token}` }
                };
            }
        }),
    })
})