import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SummaryService } from '../../services/summary-service/summary.service';
import { Customer } from '../../models/customer';
import { CartProduct } from '../../models/cart.model';
import { CartService } from '../../services/cart-service/cart.service';
import { OfferAcceptanceRequest } from '../../models/offer-acceptance-request';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { ShippingService } from '../../services/shipping-service/shipping.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  offerAcceptanceRequest: OfferAcceptanceRequest = new OfferAcceptanceRequest();
  modalRef?: BsModalRef;
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
  reservationId = '';

  constructor(
    private modalService: BsModalService,
    private summaryService: SummaryService,
    private cartService: CartService,
    private clientService: ClientService,
    private shippingService: ShippingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.summaryService.observeClientData().subscribe((clientData) => {
      this.customer = clientData;
      console.log(this.customer);
    });

    this.summaryService
      .observeShippingAndPaymentData()
      .subscribe((shippingAndPaymentData) => {
        this.shippingMethod = shippingAndPaymentData.shippingMethod;
        this.paymentMethod = shippingAndPaymentData.paymentMethod;
      });

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
    this.offerAcceptanceRequest.firstname = this.customer.name;
    this.offerAcceptanceRequest.lastname = this.customer.lastName;
    this.offerAcceptanceRequest.email = this.customer.email;
    console.log(this.offerAcceptanceRequest.email);

    this.summaryService
      .acceptOffer(this.offerAcceptanceRequest)
      .subscribe((reservationDetails) => {
        this.reservationId = reservationDetails.reservationId;
        console.log('Reservation ID:', reservationDetails.reservationId);
        // console.log('Payment URL:', reservationDetails.paymentUrl);
      });

    this.openModal(template);
    this.clientService.clearClient();
    this.shippingService.clearShippingMethods();
    for (const product of this.cartProducts) {
      this.cartService.delete(product);
    }
    this.cartService.clearVoucher();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
