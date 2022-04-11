import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrder, OrderList } from '../models/IOrder';
import { getUser } from '../utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderList: OrderList[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const userData = getUser();
    if (userData) {
      const url = 'https://www.jsonbulut.com/json/orderList.php'
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        musterilerID: userData?.userId
      }
      const mythis = this
      this.http.get<IOrder>(url, { params: sendParams }).subscribe({
        next(res) {
          const data = res.orderList![0];
          if (data) {
            mythis.orderList = data
          }

        },
        error(err) {
          console.error(err.message)
        }
      })

    }

  }

}
