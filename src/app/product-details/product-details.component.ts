import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: any;
  route: ActivatedRoute = inject(ActivatedRoute);
  productId = '';
  constructor(private httpClient: HttpClient) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.httpClient
      .get<any[]>('/api/products/{productId}')
      .subscribe((product) => {
        console.log({ product });
        this.product = product;
      });
  }
}
