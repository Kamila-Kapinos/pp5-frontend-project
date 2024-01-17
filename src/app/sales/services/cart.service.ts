import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import {CartItem, CartProduct} from '../models/cart.model';
import { ProductService } from 'src/app/product/services/product.service';

const CART_SESSION_NAME = 'cart-session-name';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private subjectProductsQuantity = new BehaviorSubject(0);

  constructor(private productService: ProductService) {
    this.products = this.getSession();
    this.refreshProductsQuantity();
  }

  products: CartItem[] = [];

  getProductsQuantity(): Observable<number> {
    return this.subjectProductsQuantity.asObservable();
  }

  handleAddToCart(productId: string, quantity = 1): boolean {
    const exist = this.products.find(el => el.productId === productId);
    if (exist) {
      exist.quantity++;
    } else {
      this.products.push({productId, quantity});
    }
    this.refreshSession();

    return true;
  }

  getCart(): Observable<CartProduct[]> {
    if (this.products.length) {
      return this.productService.getProducts().pipe(map(products => {
        return this.products.map(cartItem => {
          return {
            ...cartItem,
            product: products.find(el => el.id === cartItem.productId)
          }
        }).filter(el => !!el.product);
      }))
    }
    return of([]);
  }

  update(cartItem: CartItem) {
    const index = this.products.findIndex(el => el.productId === cartItem.productId);
    if (index !== -1) {
      this.products.splice(index, 1, cartItem);
      this.refreshSession();
    }
  }

  delete(cartItem: CartItem) {
    const index = this.products.findIndex(el => el.productId === cartItem.productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.refreshSession();
    }
  }

  applyVoucher(voucherCode: string): Observable<any> {
    return of({ success: true, message: 'Voucher applied successfully.' });
  }

  private refreshSession() {
    this.saveSession();
    this.refreshProductsQuantity();
  }

  private refreshProductsQuantity() {
    this.subjectProductsQuantity.next(this.calcQuantity());
  }

  private calcQuantity() {
    return this.products.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
  }

  private saveSession() {
    sessionStorage.setItem(CART_SESSION_NAME, JSON.stringify(this.products));
  }

  private getSession() {
    const sess = sessionStorage.getItem(CART_SESSION_NAME);
    if (sess) {
      try {
        return JSON.parse(sess);
      } catch (err) {
        return [];
      }
    }
    return [];
  }
}
