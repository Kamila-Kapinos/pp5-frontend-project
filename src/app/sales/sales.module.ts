import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CartComponent} from "./components/cart/cart.component";
import {AlertModule} from "ngx-bootstrap/alert";
import { FormsComponent } from './components/forms/forms.component';



@NgModule({
  declarations: [CartComponent, FormsComponent],
  imports: [
    CommonModule,
    SalesRoutingModule, RouterModule, FormsModule, PaginationModule, AlertModule
  ]
})
export class SalesModule {
}
