import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../sales/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products?: any[] = [];
  constructor(
    private httpClient: HttpClient,
    private cartService: CartService,
  ) {}
  ngOnInit() {
    this.httpClient.get<any[]>('/api/products').subscribe((products) => {
      console.log({ products });
      this.products = products;
    });
  }
  // initializeAddToCartHandler(el: HTMLButtonElement): void {
  //   el.addEventListener('click', async (e: Event) => {
  //     const button = e.target as HTMLButtonElement;
  //     const productId = button.getAttribute('data-product-id');
  //
  //     try {
  //       if (productId !== null) {
  //         const productInfo = await this.cartService
  //           .handleAddToCart(productId)
  //           .toPromise();
  //         console.log(productInfo);
  //       } else {
  //         console.error('Błąd: Brak identyfikatora produktu');
  //       }
  //     } catch (error) {
  //       console.error('Błąd podczas dodawania do koszyka:', error);
  //     }
  //   });
  // }
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
