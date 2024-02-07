import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SummaryService } from '../../services/summary.service';
import { Customer } from '../../models/customer';
import { CartProduct } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
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
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.calc();
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
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
}
