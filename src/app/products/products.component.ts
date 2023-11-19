import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products?: any[] = [];
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get<any[]>('/api/products').subscribe((products) => {
      console.log({ products });
      this.products = products;
    });
  }
}
