import { Component, OnInit } from '@angular/core';
import { CartService } from './sales/services/cart-service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Self Care';

  cartQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProductsQuantity().subscribe((quantity) => {
      this.cartQuantity = quantity;
    });
  }
}
