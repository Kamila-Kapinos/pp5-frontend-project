// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

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
  productId = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
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
}
