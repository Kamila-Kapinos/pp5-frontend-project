import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CartComponent} from "./components/cart/cart.component";
import {FormsComponent} from "./components/forms/forms.component";


const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'forms', component: FormsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
