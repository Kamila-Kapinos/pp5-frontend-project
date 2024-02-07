import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SummaryService } from '../../services/summary.service';
import { Customer } from '../../models/customer';
import { CartProduct } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import {OfferAcceptanceRequest} from "../../models/offer-acceptance-request";
import {HttpClient} from "@angular/common/http";
import {ReservationDetails} from "../../models/reservation-details";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  offerAcceptanceRequest: OfferAcceptanceRequest = new OfferAcceptanceRequest();
  modalRef?: BsModalRef;
  products;
  cartProducts: CartProduct[] = [];
  discount = 0;
  sumWithDiscount = 0;
  sum = 0;
  customer: Customer = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    postcode: '',
    city: '',
  };
  shippingMethod = '';
  paymentMethod = '';

  constructor(
    private modalService: BsModalService,
    private summaryService: SummaryService,
    private cartService: CartService,
    private http: HttpClient,
  ) {
    this.products = summaryService.getCartProducts();
    this.customer.city = summaryService.getCity();
    this.customer.email = summaryService.getEmail();
    this.customer.houseNumber = summaryService.getHouseNumber();
    this.customer.lastName = summaryService.getLastName();
    this.customer.name = summaryService.getName();
    this.customer.phone = summaryService.getPhone();
    this.customer.postcode = summaryService.getPostcode();
    this.customer.street = summaryService.getStreet();
    this.shippingMethod = summaryService.getShippingMethod();
    this.paymentMethod = summaryService.getPaymentMethod();
    this.offerAcceptanceRequest.firstname = this.customer.name;
    this.offerAcceptanceRequest.lastname = this.customer.lastName;
    this.offerAcceptanceRequest.email = this.customer.email;
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.calc();
    });
  }


  calc() {
    this.sum = this.cartProducts.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);

    let sumWithDiscount = this.sum;
    if (this.cartService.isVoucherApplied()) {
      const discount = this.cartService.calcDiscount(this.sum);
      sumWithDiscount -= discount;
      this.discount = discount;
    }

    this.sumWithDiscount = sumWithDiscount;
  }

  calcUnitsPrice(cartProduct: CartProduct): number {
    return cartProduct.quantity * cartProduct.product.price;
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  acceptOffer(template: TemplateRef<void>) {
    this.openModal(template)

    this.http.post<ReservationDetails>('/api/accept-offer', this.offerAcceptanceRequest)
      .subscribe(reservationDetails => {
        console.log('Reservation ID:', reservationDetails.reservationId);
        console.log('Payment URL:', reservationDetails.paymentUrl);
      });
  }
}
