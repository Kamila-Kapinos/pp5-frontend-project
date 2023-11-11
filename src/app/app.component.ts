import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kamila-test';

  products?: any[] = [];
  constructor(private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.httpClient.get<any[]>(
      '/api/products').subscribe((products) => {
        console.log({products})
      this.products = products;
    })

  }
}
