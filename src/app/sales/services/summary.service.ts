import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private cartProductsData;
  private voucherData;
  private clientData;
  private shippingData;
  constructor() {
    this.cartProductsData = sessionStorage.getItem("cart-session-name")
    this.voucherData = sessionStorage.getItem("voucher-code")
    this.clientData = sessionStorage.getItem("client-session-name")
    this.shippingData = sessionStorage.getItem("shipping-method")
  }

  getCartProducts(){
    return this.cartProductsData ? JSON.parse(this.cartProductsData) : null;
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
