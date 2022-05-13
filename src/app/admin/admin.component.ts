import { Component, OnInit } from '@angular/core';
import { IProduct, ProductBilgiler } from '../models/IProduct';
import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { getUser } from '../utils';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[RestService]
})
export class AdminComponent implements OnInit {
  search = '';
  html = '';
  arr: ProductBilgiler[] = [];
  tempArray: ProductBilgiler[] = [];
  product: ProductBilgiler = {};

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService,
    private rest: RestService,
    private seo: SeoService
  ) {}

  fncSearch() {
    this.arr = this.tempArray;
    const searchValue = this.search.toLocaleLowerCase();
    const filterGlobal = (item: ProductBilgiler) =>
      item.productName?.toLocaleLowerCase().includes(searchValue) ||
      item.price?.toLocaleLowerCase().includes(searchValue) ||
      item.productId?.includes(searchValue);

    this.arr = this.arr.filter(filterGlobal);
  }
  fncDetail(index: number) {
    console.log('Index: ' + index);
    this.product = this.arr[index];
  }
  ngOnInit(): void {
    this.seo.updateTitle('Admin');

    const mythis = this;
    this.rest.getProduct().subscribe({
      next(res) {
        const bilgiler = res.Products[0].bilgiler;
        if (bilgiler) {
          mythis.arr = bilgiler;
          mythis.tempArray = bilgiler;
        }
      },
      error(err) {
        console.error(err.message);
      },
    });
  }

  addToCart(productId: string) {
    const userData = getUser();
    if (userData) {
      const mythis = this;
      this.rest.orderProduct(productId).subscribe({
        next(res) {
          const product = res.order[0];
          const status: boolean = product.durum;
          const message: string = product.mesaj;

          if (status === true) {
            mythis.toastr.success(message);
            mythis.ngxSmartModalService.getModal('myModal').close();
            sessionStorage.setItem('product', JSON.stringify(product));
          } else {
            mythis.toastr.error(message);
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }
}
