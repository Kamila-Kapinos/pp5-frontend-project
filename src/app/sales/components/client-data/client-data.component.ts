import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client-service/client.service';
import { Customer } from '../../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss'],
})
export class ClientDataComponent implements OnInit {
  customer: Customer = new Customer();
  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.customer = this.clientService.getClient() || new Customer();
  }

  onSubmit(form: NgForm) {
    if (form.valid && form.submitted) {
      this.clientService.updateClient(this.customer);
      console.log('Dane klienta zostały zapisane:', this.customer);
      this.router.navigate(['/sales/shipping']);
    } else {
      console.log('Nie dodano klienta, formularz niepoprawny');
    }
  }

  isNextPageButtonDisabled(form: NgForm) {
    return !form.valid;
  }
}
