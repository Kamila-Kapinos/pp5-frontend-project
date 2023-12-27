import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './sales/components/cart/cart.component';
import { LogInComponent } from './customer/components/log-in/log-in.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'logIn', component: LogInComponent },
  // {
  //   path: 'details/:id',
  //   component: ProductDetailsComponent,
  //   title: 'Product details',
  // },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
