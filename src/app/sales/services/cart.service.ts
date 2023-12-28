import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = '/api/cart';

  constructor(private httpClient: HttpClient) {}

  handleAddToCart(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;

    console.log(`handleAddToCart - Wysyłanie żądania POST do: ${url}`);

    return this.httpClient
      .post(url, {})
      .pipe(switchMap(() => this.getProductInfo(productId)));
  }

  private getProductInfo(productId: string): Observable<any> {
    const productUrl = `/api/product/${productId}`;

    console.log(`getProductInfo - Wysyłanie żądania GET do: ${productUrl}`);

    return this.httpClient.get(productUrl);
  }
}
