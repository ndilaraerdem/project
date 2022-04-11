import { Component, OnInit } from '@angular/core';
import { IProduct, ProductBilgiler } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import {  NgxSmartModalService } from 'ngx-smart-modal';
import { decrypt, encrypt, getUser } from '../utils';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  search = ''
  html = ''
  arr: ProductBilgiler[] = []
  tempArray: ProductBilgiler[] = []
  product:ProductBilgiler = {}
 
  constructor(
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr : ToastrService,
    private router: Router
  ) {

    encrypt("ali");
    decrypt("U2FsdGVkX19TeQlz2AsWz+PusqFFaBwbMtFOxssW+sE=")
   }

  fncSearch() {
    console.log(this.search)
    this.arr = this.tempArray
    const searchValue = this.search.toLocaleLowerCase()
    const filterGlobal = (item:ProductBilgiler) => 
    item.productName?.toLocaleLowerCase().includes(searchValue) ||
    item.price?.toLocaleLowerCase().includes(searchValue) || 
    item.productId?.includes(searchValue)

    this.arr = this.arr.filter( filterGlobal );
  }
  fncDetail(index: number){
    console.log("Index: " + index)
    this.product = this.arr[index]
  }
  ngOnInit(): void {

    const url = 'https://www.jsonbulut.com/json/product.php'
    const sendParams = {
      ref: 'c7c2de28d81d3da4a386fc8444d574f2',
      start: '0'
    }
    const mythis = this
    this.http.get<IProduct>(url, { params: sendParams }).subscribe({
      next(res) {
        const bilgiler = res.Products[0].bilgiler;
        if (bilgiler) {
          mythis.arr = bilgiler
          mythis.tempArray = bilgiler
        }

      },
      error(err) {
        console.error(err.message)
      }
    })
  }
 
  addToCart(productId:string){
    const userData = getUser();
    if (userData) {
    const url =' https://www.jsonbulut.com/json/orderForm.php'
    '&customerId=12&productId=12&html=12'
    const sendParams = {
     ref: 'c7c2de28d81d3da4a386fc8444d574f2',
     customerId:userData.userId,
     productId: productId,
     html: productId 
    }
    const mythis = this
    this.http.get<any>(url, { params: sendParams }).subscribe({
      next(res) {
        const product = res.order[0]
        const status:boolean = product.durum
        const message:string = product.mesaj
        
        if (status === true) {
          mythis.toastr.success(message)
          mythis.ngxSmartModalService.getModal('myModal').close();
          sessionStorage.setItem('product', JSON.stringify(product))
        } else {
          mythis.toastr.error(message)
        }
      },
      error(err) {
        console.error(err);
      }
    })
  }
}
 
}
