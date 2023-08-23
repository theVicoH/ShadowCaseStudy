export interface Product {
    brandName?: string;
    displayName?: string;
    image450?: string;
    currentSku?: {
        listPrice?: string;
    };
    rating?: string;
    productId?: string;
}

export interface ProductDetails {
    brand?: {
        displayName?: string
    }
    displayName?: string;
    currentSku?: {
        skuId?: string;
        listPrice?: string;
        skuImages?: {
            image300: string;
        };
    };
    rating?: number;
    productId?: string;
    quickLookDescription?: string
    longDescription?: string
    ingredientDesc: string
    reviews?: number
}