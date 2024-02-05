import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ClientDataComponent } from './components/client-data/client-data.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'client-data', component: ClientDataComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
