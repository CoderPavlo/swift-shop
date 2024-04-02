
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

interface ISeller {
    name: string;
    phone: string;
    adress: string;
}

export interface IAuth {
    access_token: string;
    refresh_token: string;
    role?: string,
}