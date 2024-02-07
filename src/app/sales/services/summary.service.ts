import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ShippingPayment } from '../models/shipping-payment.model';
import { ReservationDetails } from '../models/reservation-details';
import { OfferAcceptanceRequest } from '../models/offer-acceptance-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private cartProductsData;
  private clientDataSubject: BehaviorSubject<Customer>;
  private shippingDataSubject: BehaviorSubject<ShippingPayment>;

  constructor(private http: HttpClient) {
    this.cartProductsData = sessionStorage.getItem('cart-session-name');
    const clientData = sessionStorage.getItem('client-session-name');
    const shippingData = sessionStorage.getItem('shipping-method');

    // Inicjalizacja BehaviorSubjects
    this.clientDataSubject = new BehaviorSubject(
      clientData ? JSON.parse(clientData) : null,
    );
    this.shippingDataSubject = new BehaviorSubject(
      shippingData ? JSON.parse(shippingData) : null,
    );
  }

  observeClientData(): Observable<Customer> {
    return this.clientDataSubject.asObservable();
  }

  observeShippingAndPaymentData(): Observable<ShippingPayment> {
    return this.shippingDataSubject.asObservable();
  }

  acceptOffer(
    offerAcceptanceRequest: OfferAcceptanceRequest,
  ): Observable<ReservationDetails> {
    return this.http.post<ReservationDetails>(
      '/api/accept-offer',
      offerAcceptanceRequest,
    );
  }

  updateClientData(clientData: Customer) {
    this.clientDataSubject.next(clientData);
    sessionStorage.setItem('client-session-name', JSON.stringify(clientData));
  }

  updateShippingAndPaymentData(shippingAndPaymentData: ShippingPayment) {
    this.shippingDataSubject.next(shippingAndPaymentData);
    sessionStorage.setItem(
      'shipping-method',
      JSON.stringify(shippingAndPaymentData),
    );
  }
}
