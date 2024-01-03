import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {SoapsComponent} from "./components/soaps/soaps.component";
import {OilsComponent} from "./components/oils/oils.component";
import {CandlesComponent} from "./components/candles/candles.component";

const routes: Routes = [
  { path: 'list', component: ProductsComponent },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    title: 'Product details',
  },{
    path: 'soaps',
    component: SoapsComponent
  },
  {
    path: 'oils',
    component: OilsComponent
  },
  {
    path: 'candles',
    component: CandlesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
