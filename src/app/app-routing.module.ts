import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './customer/components/log-in/log-in.component';
import { ClientDataComponent } from './customer/components/client-data/client-data.component';
import {ShippingComponent} from "./customer/components/shipping/shipping.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'clientData', component: ClientDataComponent },
  { path: 'shipping', component: ShippingComponent},
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./sales/sales.module').then((m) => m.SalesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
