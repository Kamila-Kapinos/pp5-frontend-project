// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { CartProduct } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  sum = 0;
  sumQuantity = 0;
  voucherCode = '';
  voucherApplied = false;
  voucherError = '';
  discount = 0;
  sumWithDiscount = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.calc();
    });

    this.cartService.getProductsQuantity().subscribe((quantity) => {
      this.sumQuantity = quantity;
      this.calc();
    });
  }

  calc() {
    this.sum = this.cartProducts.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);

    let sumWithDiscount = this.sum;
    if (this.cartService.isVoucherApplied()) {
      const discount = this.cartService.calcDiscount(this.sum);
      sumWithDiscount -= discount;
      this.discount = discount;
    }

    this.sumWithDiscount = sumWithDiscount;
  }

  calcUnitsPrice(cartProduct: CartProduct): number {
    return cartProduct.quantity * cartProduct.product.price;
  }

  onChanged(cartProduct: CartProduct) {
    if (cartProduct.quantity < 1) {
      cartProduct.quantity = 1;
    }

    this.cartService.update({
      productId: cartProduct.productId,
      productName: cartProduct.productName,
      quantity: cartProduct.quantity,
    });
    this.calc();
    this.applyVoucher();
  }

  delete(cartProduct: CartProduct) {
    this.cartProducts = this.cartProducts.filter(
      (el) => el.productId !== cartProduct.productId,
    );
    this.cartService.delete(cartProduct);
    this.calc();
    this.applyVoucher();
    if (this.cartProducts.length === 0) {
      sessionStorage.clear();
    }
  }

  applyVoucher() {
    if (this.voucherApplied) {
      // this.voucherError = 'Voucher already applied';
      return;
    }

    this.cartService.applyVoucher(this.voucherCode).subscribe((isValid) => {
      if (isValid) {
        this.calc();
        this.voucherError = '';
      } else {
        this.voucherError = 'Failed to apply voucher.';
      }
    });
  }

  isNextPageButtonDisabled(): boolean {
    return !(
      this.cartProducts.length > 0 &&
      this.sum > 0 &&
      this.sumQuantity > 0 &&
      this.isVoucherCodeValid()
    );
  }

  private isVoucherCodeValid(): boolean {
    if (this.voucherCode && this.voucherCode.trim() !== '') {
      let isValid = false;
      this.cartService.checkVoucher(this.voucherCode).subscribe((result) => {
        isValid = result;
      });

      return isValid;
    }

    return true;
  }

  goToNextPage(pageNumber: number): void {
    if (!this.isNextPageButtonDisabled()) {
      console.log(`Navigating to page ${pageNumber}`);
      this.router.navigate(['sales/client-data']);
    } else {
      console.log(
        'Cannot proceed to the next page. Cart is empty or data is incorrect.',
      );
    }
  }
}
