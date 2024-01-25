import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LogInComponent } from './customer/components/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { ClientDataComponent } from './customer/components/client-data/client-data.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {AlertModule} from "ngx-bootstrap/alert";

@NgModule({
  declarations: [AppComponent, HomeComponent, LogInComponent, ClientDataComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
