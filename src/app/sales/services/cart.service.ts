import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartProduct } from '../models/cart.model';
import { ProductService } from 'src/app/product/services/product.service';

const CART_SESSION_NAME = 'cart-session-name';
const VOUCHER_CODE_KEY = 'voucher-code';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private subjectProductsQuantity = new BehaviorSubject(0);

  constructor(private productService: ProductService) {
    this.products = this.getSession();
    this.voucherCode = this.getVoucherCodeFromStorage() || '';
    this.refreshProductsQuantity();
    this.setVoucherValidity();
  }

  private readonly products: CartItem[] = [];
  private voucherCode = '';
  private voucherApplied = false;

  getProductsQuantity(): Observable<number> {
    return this.subjectProductsQuantity.asObservable();
  }

  handleAddToCart(
    productId: string,
    productName: string,
    quantity = 1,
  ): boolean {
    const exist = this.products.find((el) => el.productId === productId);
    if (exist) {
      exist.quantity++;
    } else {
      this.products.push({ productId, productName, quantity });
    }
    this.refreshSession();

    return true;
  }

  getCart(): Observable<CartProduct[]> {
    if (this.products.length) {
      return this.productService.getProducts().pipe(
        map((products) => {
          return this.products
            .map((cartItem) => {
              return {
                ...cartItem,
                product: products.find((el) => el.id === cartItem.productId),
              };
            })
            .filter((el) => !!el.product);
        }),
      );
    }
    return of([]);
  }

  update(cartItem: CartItem) {
    const index = this.products.findIndex(
      (el) => el.productId === cartItem.productId,
    );
    if (index !== -1) {
      this.products.splice(index, 1, cartItem);
      this.refreshSession();
    }
  }

  delete(cartItem: CartItem) {
    const index = this.products.findIndex(
      (el) => el.productId === cartItem.productId,
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      this.refreshSession();
    }
  }

  getDiscount() {
    return this.isVoucherApplied() ? 0.1 : 0;
  }
  calcDiscount(value: number) {
    return value * this.getDiscount();
  }

  private setVoucherValidity() {
    if (this.voucherCode) {
      const voucherCheckResult = this.checkVoucherValidity(this.voucherCode);
      if (voucherCheckResult) {
        this.voucherApplied = true;
      } else {
        this.voucherApplied = false;
      }
    } else {
      this.voucherApplied = false;
    }
  }

  applyVoucher(voucherCode: string): Observable<boolean> {
    this.voucherCode = voucherCode;
    this.setVoucherValidity();

    if (this.voucherApplied) {
      this.voucherCode = voucherCode;
      this.saveVoucherCodeToStorage();
      return of(true);
    } else {
      return of(false);
    }
  }

  checkVoucher(voucherCode: string): Observable<boolean> {
    const voucherCheckResult = this.checkVoucherValidity(voucherCode);
    return of(voucherCheckResult);
  }

  private checkVoucherValidity(voucherCode: string): boolean {
    // Simulating backend voucher validity check
    return voucherCode === 'vegan2024';
  }

  isVoucherApplied(): boolean {
    return this.voucherApplied;
  }

  private refreshSession() {
    this.saveSession();
    this.refreshProductsQuantity();
    this.saveVoucherCodeToStorage();
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

  private saveVoucherCodeToStorage() {
    sessionStorage.setItem(VOUCHER_CODE_KEY, this.voucherCode);
  }

  private getVoucherCodeFromStorage() {
    return sessionStorage.getItem(VOUCHER_CODE_KEY) || '';
  }
}
