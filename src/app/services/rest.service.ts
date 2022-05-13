import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IAddress } from '../models/IAddress';
import { IOrder } from '../models/IOrder';
import { IProduct } from '../models/IProduct';
import { IUser } from '../models/IUser';
import { getUser } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  url = 'https://www.jsonbulut.com/json/';
  
//-----------USER SERVICES-------------------------------
  userLogin(params: any): Observable<IUser> {
    const path = this.url + 'userLogin.php';
    return this.http.get<IUser>(path, { params: params });
  }
  userUpdate(params:any):Observable<IUser>{
    const path = this.url + 'userSettings.php';
    return this.http.get<IUser>(path, { params: params });
  }
//---------PRODUCT SERVICES-------------------------------
  getProduct():Observable<IProduct>{
    const path = this.url + 'product.php';
    const sendParams = {
      ref: environment.ref,
      start: '0',
    };
    return this.http.get<IProduct>(path, { params: sendParams });
  }

  orderProduct(productId:string):Observable<any>{
    const userData = getUser();
    const path = this.url + 'orderForm.php';
    const sendParams = {
      ref: environment.ref,
      customerId: userData!.userId,
      productId: productId,
      html: productId,
    };
    return this.http.get<any>(path, { params: sendParams });
  }

  getOrder():Observable<IOrder>{
    const userData = getUser();
    const sendParams = {
      ref: environment.ref,
      musterilerID: userData!.userId
    }
    const path = this.url + 'orderList.php';
    return this.http.get<IOrder>(path, { params: sendParams });
  }
//--------------ADDRESS SERVICES----------------------
  getAddressList():Observable<IAddress>{
    const userData = getUser();
    const sendParams = {
      ref: environment.ref,
      musterilerID: userData!.userId
    }
    const path = this.url + 'addressList.php';
    return this.http.get<IAddress>(path, { params: sendParams });
  }

  createAddress(params: any):Observable<IAddress>{
    const path = this.url + 'addressAdd.php';
    return this.http.get<IAddress>(path, { params: params });
  }
  removeAddress(params: any):Observable<IAddress>{
    const path = this.url + 'addressDelete.php';
    return this.http.get<IAddress>(path, { params: params });
  }
  }
