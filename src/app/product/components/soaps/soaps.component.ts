import { Component } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-soaps',
  templateUrl: './soaps.component.html',
  styleUrls: ['./soaps.component.scss']
})
export class SoapsComponent {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      console.log({ products });
      this.products = products;
    });
  }
}
