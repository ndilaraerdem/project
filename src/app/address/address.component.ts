
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressList, IAddress } from '../models/IAddress';
import { Bilgiler } from '../models/IUser';
import { Util } from '../util';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address:AddressList = {}

  user: Bilgiler ={
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  addAddress() {
    let util = new Util();
    const userData = util.getUserData();
    this.address.musterilerID = userData.userId;

    const url = 'https://www.jsonbulut.com/json/addressAdd.php'
    const sendParams = {
      ref: 'c7c2de28d81d3da4a386fc8444d574f2',
      musterilerID: this.address.musterilerID,
      il: this.address.il!,
      ilce: this.address.ilce!,
      Mahalle: this.address.Mahalle!,
      adres: this.address.adres!,
      kapiNo: this.address.kapiNo!,
      notBilgi: this.address.not!
    }
    console.log( this.address )

    const mythis = this;
    this.http.get<IAddress>(url, { params: sendParams }).subscribe({
      next(res) {
        //????
        const addressData = mythis.address
        if(addressData){
         const strAddress = JSON.stringify(addressData);
        sessionStorage.setItem('address', strAddress);
        mythis.toast.success("Adres eklendi");
        }
      },
      error(err) {
        console.log(err.message)
      }
    })
  }

}