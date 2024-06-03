
export enum ERole {
    BUYER = 'buyer',
    SELLER = 'seller',
    ADMIN = 'admin',
}

export enum EGender {
    UNKNOWN,
    MALE,
    FEMALE,
}

export interface IUser {
    email: string;
    password: string;
    role?: ERole;
    buyer?: IBuyer;
    seller?: ISeller;
    avatar?: File;
}

interface IBuyer {
    first_name: string;
    last_name: string;
    day: number;
    month: number;
    year: number;
    gender: number;
}
export interface IUserInfo {
    name: string,
    email: string,
    avatar: string,
}
export interface ISeller {
    id?: number;
    name: string;
    phone: string;
    adress: string;
    date_registered?: string;
    avatar?: string;
    percent?: number,
    rating?: number,
}

export interface IAuth {
    access_token: string;
    refresh_token: string;
    role?: string;
}