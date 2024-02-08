import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import {CartService} from "../../../sales/services/cart-service/cart.service";

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.scss'],
})
export class CandlesComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService,) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      console.log({ products });
      this.products = products;
    });
  }

  initializeAddToCartHandler(
    productId: string | null,
    productName: string,
  ): void {
    if (productId !== null) {
      if (this.cartService.handleAddToCart(productId, productName)) {
        console.log('Added to cart');
      } else {
        console.error('Błąd podczas dodawania do koszyka');
      }
    } else {
      console.error('Błąd: Brak identyfikatora produktu');
    }
  }

}
