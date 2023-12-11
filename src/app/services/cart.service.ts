import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = '/api/cart';

  constructor(private httpClient: HttpClient) {}

  handleAddToCart(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.post(url, {});
  }
}
