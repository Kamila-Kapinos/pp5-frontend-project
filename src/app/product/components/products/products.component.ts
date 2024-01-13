import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../sales/services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      console.log({ products });
      this.products = products;
    });
  }

  initializeAddToCartHandler(productId: string | null): void {
    if (productId !== null) {
      if (this.cartService.handleAddToCart(productId)) {
        console.log(
          'OK'
        );
      } else {
        console.error('Błąd podczas dodawania do koszyka');
      }
    } else {
      console.error('Błąd: Brak identyfikatora produktu');
    }
  }
}
