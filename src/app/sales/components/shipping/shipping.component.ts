import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {

  isNextPageButtonDisabled(form: NgForm) {
    return !(form.valid && form.touched);

  }
}
