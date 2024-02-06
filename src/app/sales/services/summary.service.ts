import { Injectable } from '@angular/core';
import {ProductService} from "../../product/services/product.service";
import { Product } from '../../product/models/product'
import {catchError, Observable, of} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private cartProductsData;
  private voucherData;
  private clientData;
  private shippingData;

  constructor(private productService: ProductService,) {
    this.cartProductsData = sessionStorage.getItem("cart-session-name")
    this.voucherData = sessionStorage.getItem("voucher-code")
    this.clientData = sessionStorage.getItem("client-session-name")
    this.shippingData = sessionStorage.getItem("shipping-method")
  }
  getCartProducts(){
    return this.cartProductsData ? JSON.parse(this.cartProductsData) : null;
  }


  getProductName(id: string): Observable<string> {
    return this.productService.getProductById(id).pipe(
      map((product: Product) => product.name),
      catchError((error) => {
        console.error('Błąd podczas pobierania szczegółów produktu:', error);
        return of('');
      })
    );
  }

  getVoucher(){
    return this.voucherData ? JSON.parse(this.voucherData) : null;
  }

  getClientData(){
    return this.clientData ? JSON.parse(this.clientData) : null;
  }
  getCity(){
    return this.getClientData().city || null
  }

  getEmail(){
    return this.getClientData().email || null
  }

  getHouseNumber(){
    return this.getClientData().houseNumber || null
  }

  getLastName(){
    return this.getClientData().lastName || null
  }

  getName(){
    return this.getClientData().name || null
  }

  getPhone() {
    return this.getClientData().phone || null;
  }

  getPostcode() {
    return this.getClientData().postcode || null;
  }

  getStreet() {
    return this.getClientData().street || null;
  }

  getShippingAndPaymentData(){
    return this.shippingData ? JSON.parse(this.shippingData) : null;
  }

  getShippingMethod() {
    return this.getClientData().shippingMethod || null;
  }

  getPaymentMethod() {
    return this.getClientData().paymentMethod || null;
  }

}
