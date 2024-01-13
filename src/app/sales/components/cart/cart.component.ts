import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartProducts: CartProduct[] = [];

  sum = 0;
  sumQuantity = 0;

  constructor( private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
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

  onChanged(cartProduct: CartProduct) {
      this.cartService.update({productId: cartProduct.productId, quantity: cartProduct.quantity});
      
  }

  delete(cartProduct: CartProduct) {
    this.cartProducts = this.cartProducts.filter(el => el.productId !== cartProduct.productId);
    this.cartService.delete(cartProduct);
  }


}
