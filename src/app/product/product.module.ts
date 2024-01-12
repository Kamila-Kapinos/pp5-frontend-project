import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { SoapsComponent } from './components/soaps/soaps.component';
import { OilsComponent } from './components/oils/oils.component';
import { CandlesComponent } from './components/candles/candles.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, SoapsComponent, OilsComponent, CandlesComponent],
  imports: [CommonModule, ProductRoutingModule, RouterModule],
})
export class ProductModule {}
