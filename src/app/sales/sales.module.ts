import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CartComponent } from './components/cart/cart.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ClientDataComponent } from './components/client-data/client-data.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CartComponent,
    ClientDataComponent,
    ShippingComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    RouterModule,
    FormsModule,
    PaginationModule,
    AlertModule,
  ],
  providers: [BsModalService],
})
export class SalesModule {}
