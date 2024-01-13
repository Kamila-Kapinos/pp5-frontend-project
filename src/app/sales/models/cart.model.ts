import { Product } from "src/app/product/models/product";

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface CartProduct extends CartItem {
    product: Product;
}