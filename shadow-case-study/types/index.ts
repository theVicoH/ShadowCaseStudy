export interface Product {
    brandName?: string;
    displayName?: string;
    heroImage?: string;
    currentSku?: {
        listPrice?: string;
    };
    rating?: string;
    productId?: string;
}

export interface ProductDetails {
    brand?: [
        displayName?: string
    ];
    displayName?: string;
    heroImage?: string;
    currentSku?: {
        skuId?: string;
        listPrice?: string;
    };
    rating?: number;
    productId?: string;
    quickLookDescription?: string
    longDescription?: string
    ingredientDesc: string
    reviews?: number
}