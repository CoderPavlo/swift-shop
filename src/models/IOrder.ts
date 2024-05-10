import { IGoodCardData } from "./IGood";

export interface ICart {
    good: number,
    count: number,
}

export interface ISellerMini {
    id: number,
    name: string,
    avatar: string,
}
export interface ICartDetail {
    id: number,
    good: IGoodCardData,
    count: number,
    selected?: boolean,
}

export interface IGroupedCarts {
    seller: ISellerMini,
    carts: ICartDetail[],
}

export interface ICartOrderData{
    goods: ICartOrders[],
    promocode_id?: number, 
} 

export interface ICartOrders{
    carts_id: number[],
    counts: number[],
}