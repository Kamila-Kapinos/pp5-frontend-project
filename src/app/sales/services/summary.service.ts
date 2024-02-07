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
  private clientData;
  private shippingData;

  private clientDataSubject: BehaviorSubject<Customer>;
  private shippingDataSubject: BehaviorSubject<ShippingPayment>;

  constructor(private http: HttpClient) {
    this.cartProductsData = sessionStorage.getItem('cart-session-name');
    this.clientData = sessionStorage.getItem('client-session-name');
    this.shippingData = sessionStorage.getItem('shipping-method');

    // Inicjalizacja BehaviorSubjects
    this.clientDataSubject = new BehaviorSubject(this.getClientData());
    this.shippingDataSubject = new BehaviorSubject(
      this.getShippingAndPaymentData(),
    );

    window.addEventListener('storage', (event) => {
      this.updateClientDataFromSession(event);
      this.updateShippingDataFromSession(event);
    });
  }

  getCartProducts() {
    return this.cartProductsData ? JSON.parse(this.cartProductsData) : null;
  }

  getClientData() {
    return this.clientData ? JSON.parse(this.clientData) : null;
  }

  // Metoda do zwracania obserwowalnego klienta
  observeClientData() {
    return this.clientDataSubject.asObservable();
  }

  // Metoda do zwracania obserwowalnego danych dotyczących wysyłki i płatności
  observeShippingAndPaymentData() {
    return this.shippingDataSubject.asObservable();
  }

  getCity() {
    return this.getClientData().city || null;
  }

  getEmail() {
    return this.getClientData().email || null;
  }

  getHouseNumber() {
    return this.getClientData().houseNumber || null;
  }

  getLastName() {
    return this.getClientData().lastName || null;
  }

  getName() {
    return this.getClientData().name || null;
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

  getShippingAndPaymentData() {
    return this.shippingData ? JSON.parse(this.shippingData) : null;
  }

  getShippingMethod() {
    return this.getShippingAndPaymentData().shippingMethod || null;
  }

  getPaymentMethod() {
    return this.getShippingAndPaymentData().paymentMethod || null;
  }

  private updateClientDataFromSession(event: StorageEvent) {
    if (event.key === 'client-session-name') {
      this.clientData = event.newValue;
      console.log('Aktualizacja danych klienta:', this.clientData);
      this.clientDataSubject.next(this.getClientData());
    }
  }

  private updateShippingDataFromSession(event: StorageEvent) {
    if (event.key === 'shipping-method') {
      this.shippingData = event.newValue;
      console.log(
        'Aktualizacja danych dostawy i płatności:',
        this.shippingData,
      );
      this.shippingDataSubject.next(this.getShippingAndPaymentData());
    }
  }

  acceptOffer(
    offerAcceptanceRequest: OfferAcceptanceRequest,
  ): Observable<ReservationDetails> {
    return this.http.post<ReservationDetails>(
      '/api/accept-offer',
      offerAcceptanceRequest,
    );
  }
}
