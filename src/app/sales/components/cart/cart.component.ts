import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  offer: any;
  constructor( private CartService: CartService) {
  }

  ngOnInit() {
    this.CartService.getOffer().subscribe((offer) => {
      console.log("Current offer: ");
      console.log({ offer });
      this.offer = offer;
    });
  }
}
