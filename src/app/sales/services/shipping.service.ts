import { Injectable } from '@angular/core';
import { ShippingPayment } from '../models/shipping-payment.model';

const SHIPPING_SESSION_KEY = 'shipping-method';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private shippingPayment: ShippingPayment;

  constructor() {
    this.shippingPayment = this.getSession();
  }

  getShippingMethods(): ShippingPayment {
    return this.shippingPayment;
  }

  updateShippingMethods(newMethods: ShippingPayment): void {
    this.shippingPayment = newMethods;
    this.saveSession();
  }

  private saveSession(): void {
    sessionStorage.setItem(
      SHIPPING_SESSION_KEY,
      JSON.stringify(this.shippingPayment),
    );
  }

  private getSession(): ShippingPayment {
    const sess = sessionStorage.getItem(SHIPPING_SESSION_KEY);
    return sess ? JSON.parse(sess) : null;
  }
}