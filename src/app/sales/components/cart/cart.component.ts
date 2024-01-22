import {Component, OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartProducts: CartProduct[] = [];

  sum = 0;
  sumQuantity = 0;
  voucherCode = '';

  constructor( private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.calc();
    });
    this.cartService.getProductsQuantity().subscribe(quantity => {
      this.sumQuantity = quantity;
      this.calc();
    })
  }

  calc() {
    this.sum = this.cartProducts.reduce((prev, curr) => {
      return prev + (curr.quantity * curr.product.price);
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

  }

  delete(cartProduct: CartProduct) {
    this.cartProducts = this.cartProducts.filter(el => el.productId !== cartProduct.productId);
    this.cartService.delete(cartProduct);
    this.calc();
  }

  applyVoucher() {
    if (this.voucherCode === 'vegan2024' && this.sum > 50) {
      const discount = this.sum * 0.1;
      this.sum -= discount;

      console.log('Zastosowano zniżkę 10%');
    } else {
      console.log('Nieprawidłowy kod vouchera lub kwota w koszyku za niska');
    }
  }


}
