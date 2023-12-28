import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/products');
  }

  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${productId}`);
  }
}
