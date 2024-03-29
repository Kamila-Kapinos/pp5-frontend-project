import { Product } from 'src/app/product/models/product';

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
}

export interface CartProduct extends CartItem {
  product: Product;
  quantityError?: string;
}
