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
      this.cartService.handleAddToCart(productId).subscribe(
        (productInfo) => {
          console.log(
            'Informacje o produkcie po dodaniu do koszyka:',
            productInfo,
          );
          // Dodatkowo, możesz zaktualizować widok lub inny stan komponentu
        },
        (error) => {
          console.error('Błąd podczas dodawania do koszyka:', error);
        },
      );
    } else {
      console.error('Błąd: Brak identyfikatora produktu');
    }
  }
}
