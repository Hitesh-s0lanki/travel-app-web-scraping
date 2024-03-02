export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export type PackageInfo = {
    id: null | string;
    name: string;
    nights: number;
    days: number;
    inclusions: string[];
    price: number;
}