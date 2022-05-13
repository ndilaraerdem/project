import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrder, OrderList } from '../models/IOrder';
import { RestService } from '../services/rest.service';
import { SeoService } from '../services/seo.service';
import { getUser } from '../utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderList: OrderList[] = [];
  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    this.seo.updateTitle('Cart');
    const userData = getUser();
    if (userData) {
      this.restService.getOrder().subscribe((data) => {
        const orderData = data.orderList![0];
        if (orderData) {
          this.orderList = orderData;
        }
      });
    }
  }
}
