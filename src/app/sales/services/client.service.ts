import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { SummaryService } from './summary.service';

const CLIENT_SESSION_NAME = 'client-session-name';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private client: Customer;
  constructor(private summaryService: SummaryService) {
    this.client = this.getSession();
  }

  getClient(): Customer {
    return this.client;
  }

  updateClient(newClient: Customer): void {
    this.client = newClient;
    this.saveSession();
    this.summaryService.updateClientData(newClient);
  }

  private saveSession(): void {
    sessionStorage.setItem(CLIENT_SESSION_NAME, JSON.stringify(this.client));
  }

  private getSession() {
    const sess = sessionStorage.getItem(CLIENT_SESSION_NAME);
    if (sess) {
      try {
        return JSON.parse(sess);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}
