export interface IStatistics {
    title: string,
    data: {
        date: string[],
        count: number[],
    },
    future_data: {
        index: string[],
        count: number[],
    },
    extra: number,
    analysis: number,
    forecast: number,
    count: number,
}

export interface ICategoryStatistics {
    good__categories__name: string,
    count: number,
}

export interface IGoodStatistics {
    index: string[],
    cart: number[],
    views: number[],
    orders_goods: number[],

}

export interface IInfluencingFactors {
    x: number[][],
    y: number[],
    accuracy: number,
    coefficients: number[],
    label: string[],
}