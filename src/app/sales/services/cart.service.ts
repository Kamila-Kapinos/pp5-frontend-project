// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartProduct } from '../models/cart.model';
import { ProductService } from 'src/app/product/services/product.service';

const CART_SESSION_NAME = 'cart-session-name';
const DISCOUNTED_SUM_KEY = 'discounted-sum';
const VOUCHER_CODE_KEY = 'voucher-code';
const VOUCHER_APPLIED_KEY = 'voucher-applied';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private subjectProductsQuantity = new BehaviorSubject(0);

  constructor(private productService: ProductService) {
    this.products = this.getSession();
    this.sum = this.getDiscountedSumFromStorage() || 0;
    this.voucherCode = this.getVoucherCodeFromStorage() || '';
    this.voucherApplied = this.getVoucherAppliedFromStorage() || false;
    this.refreshProductsQuantity();
  }

  products: CartItem[] = [];
  sum = 0;
  voucherCode = '';
  voucherApplied = false;

  getProductsQuantity(): Observable<number> {
    return this.subjectProductsQuantity.asObservable();
  }

  handleAddToCart(productId: string, quantity = 1): boolean {
    const exist = this.products.find((el) => el.productId === productId);
    if (exist) {
      exist.quantity++;
    } else {
      this.products.push({ productId, quantity });
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
        })
      );
    }
    return of([]);
  }

  update(cartItem: CartItem) {
    const index = this.products.findIndex((el) => el.productId === cartItem.productId);
    if (index !== -1) {
      this.products.splice(index, 1, cartItem);
      this.refreshSession();
    }
  }

  delete(cartItem: CartItem) {
    const index = this.products.findIndex((el) => el.productId === cartItem.productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.refreshSession();
    }
  }

  applyVoucher(voucherCode: string, sum: number): Observable<any> {
    if (this.voucherApplied) {
      console.log('Voucher already applied');
      return of({ success: false, message: 'Voucher already applied' });
    }

    this.sum = sum;

    const voucherCheckResult = this.checkVoucherValidity(voucherCode);

    if (voucherCheckResult.success) {
      const discount = this.sum * 0.1;
      this.sum -= discount;

      this.voucherCode = voucherCode;
      this.voucherApplied = true;

      this.saveDiscountedSumToStorage();
      this.saveVoucherCodeToStorage();
      this.saveVoucherAppliedToStorage();

      console.log(`Voucher applied successfully. Discount applied: ${voucherCheckResult.discount}%`);
      return of({
        success: true,
        message: 'Voucher applied successfully.',
        discountedSum: this.sum,
        discount: voucherCheckResult.discount,
      });
    } else {
      console.log(voucherCheckResult.message);
      return of({ success: false, message: voucherCheckResult.message });
    }
  }

  checkVoucher(voucherCode: string): Observable<any> {
    const voucherCheckResult = this.checkVoucherValidity(voucherCode);
    return of(voucherCheckResult);
  }

  private checkVoucherValidity(voucherCode: string): { success: boolean; message: string; discount?: number } {
    // Simulating backend voucher validity check
    if (voucherCode === 'vegan2024' && this.sum > 50) {
      return { success: true, message: 'Voucher code is valid.', discount: 10 };
    } else {
      return { success: false, message: 'Invalid voucher code or sum too low' };
    }
  }

  getDiscountedPrice(): Observable<number> {
    const discountedSum = this.getDiscountedSumFromStorage();
    return of(discountedSum || 0);
  }

  isVoucherApplied(): boolean {
    return this.voucherApplied;
  }

  private refreshSession() {
    this.saveSession();
    this.refreshProductsQuantity();
    this.saveDiscountedSumToStorage();
    this.saveVoucherCodeToStorage();
    this.saveVoucherAppliedToStorage();
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

  private saveDiscountedSumToStorage() {
    sessionStorage.setItem(DISCOUNTED_SUM_KEY, JSON.stringify(this.sum));
  }

  private getDiscountedSumFromStorage() {
    const discountedSum = sessionStorage.getItem(DISCOUNTED_SUM_KEY);
    return discountedSum ? JSON.parse(discountedSum) : null;
  }

  private saveVoucherCodeToStorage() {
    sessionStorage.setItem(VOUCHER_CODE_KEY, this.voucherCode);
  }

  private getVoucherCodeFromStorage() {
    return sessionStorage.getItem(VOUCHER_CODE_KEY) || '';
  }

  private saveVoucherAppliedToStorage() {
    sessionStorage.setItem(VOUCHER_APPLIED_KEY, JSON.stringify(this.voucherApplied));
  }

  private getVoucherAppliedFromStorage() {
    const voucherApplied = sessionStorage.getItem(VOUCHER_APPLIED_KEY);
    return voucherApplied ? JSON.parse(voucherApplied) : null;
  }
}
