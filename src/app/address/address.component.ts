import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressList, IAddress } from '../models/IAddress';
import { dateConvert, getUser } from '../utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SeoService } from '../services/seo.service';
import { RestService } from '../services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  faTrash = faTrash;
  address: AddressList = {};
  allAddress: AddressList[] = [];
  modelAddress: AddressList = {};

  constructor(
    private toast: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    private seo: SeoService,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    this.seo.updateTitle('Address');
    this.getAddress();
  }

  getAddress() {
    const userData = getUser();
    if (userData !== null) {
      this.restService.getAddressList().subscribe({
        next:(data) => {
          this.allAddress = data.addressList!;
        },
        error:(err) => {
          console.error(err.message);
        }
      }
      );
    }
  }

  addAddress() {
    const userData = getUser();
    if (userData !== null) {
      this.address.musterilerID = userData.userId;

      if (this.address.il === undefined || this.address.il === '') {
        this.toast.error('City can not be null!');
        console.log('data');
      } else if (this.address.ilce === undefined || this.address.ilce === '') {
        this.toast.error('Distinct can not be null!');
      } else if (
        this.address.Mahalle === undefined ||
        this.address.Mahalle === ''
      ) {
        this.toast.error('Neighborhood can not be null!');
      } else if (
        this.address.adres === undefined ||
        this.address.adres === ''
      ) {
        this.toast.error('Address can not be null!');
      } else if (
        this.address.kapiNo === undefined ||
        this.address.kapiNo === ''
      ) {
        this.toast.error('No can not be null!');
      } else if (this.address.not === undefined || this.address.not === '') {
        this.toast.error('Note can not be null!');
      } else {
        // service call
        const sendParams = {
          ref: environment.ref,
          musterilerID: this.address.musterilerID,
          il: this.address.il,
          ilce: this.address.ilce,
          Mahalle: this.address.Mahalle,
          adres: this.address.adres,
          kapiNo: this.address.kapiNo,
          notBilgi: this.address.not,
        };
        const newThis = this;
        this.restService.createAddress(sendParams).subscribe(
          (data) => {
            this.getAddress();
          },
          (err) => {
            console.error(err.message);
          }
        );
      }
    }
  }

  deleteAddress(adresID: string) {
    const answer = confirm('Are you sure!');
    if (answer) {
      const userData = getUser();
      if (userData !== null) {
        const sendParams = {
          ref: environment.ref,
          musterilerID: userData.userId,
          adresID: adresID,
        };

        this.restService.removeAddress(sendParams).subscribe(
          (data) => {
            this.getAddress();
          },
          (err) => {
            console.error(err.message);
          }
        )
      }
    }
  }
  addressDetail(index: number) {
    const item = this.allAddress[index];
    if (item.tarih) {
      item.tarih = dateConvert(item.tarih.toString());
    }
    this.modelAddress = item;
  }
}
