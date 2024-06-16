export type Category = {
    id: string;
    name: string;
    productListId: string;
};

export type List = {
    categories: Category[];
};


export interface Product {
    id: number;
    name: string;
    imageName: string;
    price: number;
    discountRate: number;
    review: number;
}

export interface Products {
    data: Product[]
}
interface ProductDetails {
    id: string;
    name: string;
    imageName: string;
    price: number;
    discountRate: number;
    review: number;
    description: string;
}
export interface ProductValue {
    quantity: number,
    total: number
    price:number,
    discountRate:number
}

export interface ServerError {
    response?: {
        data?: {
            error: string;
        };
    };
}
