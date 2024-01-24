// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  sum = 0;
  sumQuantity = 0;
  voucherCode = '';
  voucherApplied = false;
  voucherError = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.calc();
    });

    this.cartService.getProductsQuantity().subscribe((quantity) => {
      this.sumQuantity = quantity;
      this.calc();
    });

    this.cartService.getDiscountedPrice().subscribe((discountedSum) => {
      this.sum = discountedSum;
      this.calc();
    });

    this.voucherApplied = this.cartService.isVoucherApplied();
  }

  calc() {
    this.sum = this.cartProducts.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);
  }

  calcUnitsPrice(cartProduct: CartProduct): number {
    return cartProduct.quantity * cartProduct.product.price;
  }

  onChanged(cartProduct: CartProduct) {
    if (cartProduct.quantity < 1) {
      cartProduct.quantity = 1;
    }

    this.cartService.update({ productId: cartProduct.productId, quantity: cartProduct.quantity });
    this.calc();
    this.applyVoucher();
  }

  delete(cartProduct: CartProduct) {
    this.cartProducts = this.cartProducts.filter((el) => el.productId !== cartProduct.productId);
    this.cartService.delete(cartProduct);
    this.calc();
    this.applyVoucher();
  }



  applyVoucher() {
    if (this.voucherApplied) {
      this.voucherError = 'Voucher already applied';
      return;
    }

    this.cartService.checkVoucher(this.voucherCode).subscribe((isValid) => {
      if (isValid) {
        this.cartService.applyVoucher(this.voucherCode, this.sum).subscribe((result) => {
          console.log(result);

          if (result.success) {
            this.sum = result.discountedSum;
            this.voucherApplied = true;
            this.voucherError = ''; // Usunięcie błędu po poprawnym zastosowaniu kuponu
          } else {
            this.voucherError = 'Failed to apply voucher. ' + result.message;
          }
        });
      } else {
        this.voucherError = 'Invalid voucher code';
      }
    });
  }




  isNextPageButtonDisabled(): boolean {
    return !(this.cartProducts.length > 0 && this.sum > 0 && this.sumQuantity > 0 && this.isVoucherCodeValid());
  }

  private isVoucherCodeValid(): boolean {
    if (this.voucherCode && this.voucherCode.trim() !== '') {
      let isValid = false;
      this.cartService.checkVoucher(this.voucherCode).subscribe((result) => {
        isValid = result;
      });

      return isValid;
    }

    return true; // Jeśli brak kuponu, to uznajemy za poprawne
  }

  goToNextPage(pageNumber: number): void {
    if (!this.isNextPageButtonDisabled()) {
      console.log(`Navigating to page ${pageNumber}`);
      this.router.navigate(['/clientData']);
    } else {
      console.log('Cannot proceed to the next page. Cart is empty or data is incorrect.');
    }
  }
}
