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

export interface ICartOrderData {
    goods: ICartOrders[],
    promocode_id?: number,
}

export interface ICartOrders {
    carts_id: number[],
    counts: number[],
}

export interface IPromocode {
    code: string,
    start_date: string,
    end_date: string,
    discount: number,
}
export interface IOrder {
    id: number,
    date: string,
    price: number,
    status: number,
    promocode: IPromocode | null,
    order_goods: IGoodCardData[],
    shop?: ISellerMini,
}