import { ISubCategory } from "./ICategory";

export interface ITag {
    id?: number,
    name: string,
}

export interface IGood {
    name: string,
    image: File | null,
    description: string,
    price: number | null,
    discount: number | null,
    count: number | null,
    categoriesID: number[],
    tagsID: number[],
}

export interface IGoodFormData {
    name: string,
    image: File | null,
    description: string,
    price: number | null,
    discount: number | null,
    count: number | null,
    categories: ISubCategory[],
    tags: ITag[],
}