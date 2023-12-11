import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  offer: any;
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get<any[]>('/api/current-offer').subscribe((offer) => {
      console.log("Current offer: ");
      console.log({ offer });
      this.offer = offer;
    });
  }

}
