// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../sales/services/cart-service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: '',
    uuid: '',
    name: '',
    desc: '',
    type: '',
    price: 0,
    image: '',
    online: false,
  };
  productId = this.product.id;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        console.log({ product });
        this.product = product;
      },
      (error) => {
        console.error('Błąd podczas pobierania szczegółów produktu:', error);
      },
    );
  }

  initializeAddToCartHandler(
    productId: string | null,
    productName: string,
  ): void {
    if (productId !== null) {
      if (this.cartService.handleAddToCart(productId, productName)) {
        console.log('OK');
      } else {
        console.error('Błąd podczas dodawania do koszyka');
      }
    } else {
      console.error('Błąd: Brak identyfikatora produktu');
    }
  }
}
