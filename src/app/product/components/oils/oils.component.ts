import { Component } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../../sales/services/cart.service";

@Component({
  selector: 'app-oils',
  templateUrl: './oils.component.html',
  styleUrls: ['./oils.component.scss']
})
export class OilsComponent {

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