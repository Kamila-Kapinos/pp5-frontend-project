import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FormsComponent } from './components/forms/forms.component';
import { ClientDataComponent } from './components/client-data/client-data.component';
import { ShippingComponent } from './components/shipping/shipping.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'client-data', component: ClientDataComponent },
  { path: 'shipping', component: ShippingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
