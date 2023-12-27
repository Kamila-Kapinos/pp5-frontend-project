import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: Product = new Product();
  route: ActivatedRoute = inject(ActivatedRoute);
  productId = '';

  constructor(private httpClient: HttpClient) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.httpClient
      .get<Product>(`/api/products/${this.productId}`)
      .subscribe((product: Product) => {
        console.log({ product });
        this.product = product;
      });
  }
}
