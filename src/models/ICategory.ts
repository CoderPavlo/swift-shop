export interface ISubCategory {
    id: number,
    name: string,
    image: string,
}

export interface ICategory {
    id: number,
    name: string,
    subcategories: ISubCategory[],
}