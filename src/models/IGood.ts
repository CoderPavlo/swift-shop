import { ETabs } from "../buyer/HomePage/components/TabsComponent";
import { ISubCategory } from "./ICategory";

export interface IPagination<T> {
    pages: number,
    data: T[],
}

export interface ITag {
    id?: number,
    name: string,
}

export interface IGood {
    id?: number,
    name: string,
    image: File | null,
    description: string,
    price: number | undefined,
    discount: number | undefined,
    count: number | undefined,
    categoriesID: number[],
    tagsID: number[],
}

export interface IGoods {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    discount: number,
    count: number,
    rating: number,
    categoriesID: number[],
    tagsID: number[],
}

export interface IGoodCardData {
    id: number,
    name: string,
    image: string,
    description?: string,
    price: number,
    discount: number,
    rating?: number,
    count: number,
}

export interface IGoodFilterForShop {
    categoryId: number,
    searchQuery: string,
    order: boolean,
    page: number,
}

export interface IGoodFilterForBuyer {
    categoryId: number,
    searchQuery: string,
    order?: boolean,
    page: number,
    priceFrom?: number,
    priceTo?: number,
}

export interface IGoodFilterHome {
    tab: string;
    page: string;
}

export interface IGoodFormData {
    id?: number,
    name: string,
    image: File | string | null,
    description: string,
    price: number | undefined,
    discount: number | undefined,
    count: number | undefined,
    categories: ISubCategory[],
    tags: ITag[],
}

export interface IGoodByIdForEdit {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    discount: number,
    count: number,
    categories: ISubCategory[],
    tags: ITag[],
}

