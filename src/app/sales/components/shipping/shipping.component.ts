import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShippingPayment } from '../../models/shipping-payment.model';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  shippingPayment: ShippingPayment = new ShippingPayment();

  constructor(
    private shippingService: ShippingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shippingPayment =
      this.shippingService.getShippingMethods() || new ShippingPayment();
  }

  onSubmit(form: NgForm) {
    if (form && form.valid && form.submitted) {
      this.shippingService.updateShippingMethods(this.shippingPayment);
      console.log('Shipping details saved:', this.shippingPayment);
      this.router.navigate(['/sales/summary']);
    } else {
      console.log('Invalid form');
    }
  }

  isNextPageButtonDisabled(form: NgForm) {
    return !(form.valid && form.touched);
    //TODO naprawic bo jak zapisze sie na sesji i wroci sie to mimo ze sa zaznaczone nie przepuszcza
  }

  goToClientData() {
    this.router.navigate(['/sales/client-data']);
  }
}
