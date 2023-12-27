import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [CommonModule, ProductRoutingModule, RouterModule],
})
export class ProductModule {}
