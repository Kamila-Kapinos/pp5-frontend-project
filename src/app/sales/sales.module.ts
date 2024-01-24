import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import {CartComponent} from "./components/cart/cart.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SalesRoutingModule, RouterModule, FormsModule, PaginationModule
  ]
})
export class SalesModule {
}
