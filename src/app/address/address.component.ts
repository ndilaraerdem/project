import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressList, IAddress } from '../models/IAddress';
import { dateConvert, getUser } from '../utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {  NgxSmartModalService } from 'ngx-smart-modal';



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  faTrash = faTrash
  address:AddressList = { }
  allAddress:AddressList[] = []
  modelAddress:AddressList ={ }

  constructor( 
    private toast:ToastrService, 
    private http:HttpClient, 
    public ngxSmartModalService: NgxSmartModalService
    ) { }

  ngOnInit(): void {
    this.getAddress()
  }

  getAddress() {
    const userData = getUser()
    if ( userData !== null ) {
      const url = 'https://www.jsonbulut.com/json/addressList.php'
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        musterilerID: userData.userId
      }
      const newThis = this
      this.http.get<IAddress>( url, { params: sendParams } ).subscribe({
        next(res) {
          newThis.allAddress = res.addressList!
        },
        error(err) {
          console.error( err.message )
        }
      })
    }
  }

  addAddress() {
    const userData = getUser()
    if ( userData !== null ) {
      this.address.musterilerID = userData.userId
      
      if(this.address.il === undefined || this.address.il === "" ){
        this.toast.error("City can not be null!")
        console.log("data")
      }else if(this.address.ilce === undefined || this.address.ilce === ""){
        this.toast.error("Distinct can not be null!")
      }else if(this.address.Mahalle === undefined || this.address.Mahalle === ""){
        this.toast.error("Neighborhood can not be null!")
      }else if(this.address.adres === undefined || this.address.adres === ""){
        this.toast.error("Address can not be null!")
      }else if(this.address.kapiNo === undefined || this.address.kapiNo === ""){
        this.toast.error("No can not be null!")
      }else if(this.address.not === undefined || this.address.not === ""){
        this.toast.error("Note can not be null!")
      }else{

          // service call
          const url = 'https://www.jsonbulut.com/json/addressAdd.php'
          const sendParams = {
            ref: 'c7c2de28d81d3da4a386fc8444d574f2',
            musterilerID: this.address.musterilerID,
            il: this.address.il,
            ilce: this.address.ilce,
            Mahalle: this.address.Mahalle,
            adres: this.address.adres,
            kapiNo: this.address.kapiNo,
            notBilgi: this.address.not
          }
          const newThis = this
          this.http.get( url, { params: sendParams } ).subscribe({
            next(res) {
              newThis.getAddress()
            },
            error(err) {
              console.error(err.message)
            }
          })


      }

    }
    
  }

  // ?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=35&adresID=7
  deleteAddress( adresID:string ) {
    const userData = getUser()
    if ( userData !== null ) {
      const url = 'https://www.jsonbulut.com/json/addressDelete.php';
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        musterilerID: userData.userId,
        adresID: adresID
      }
      const newThis = this
      this.http.get( url, { params: sendParams } ).subscribe({
        next(res) {
          newThis.getAddress()
        },
        error(err) {
          console.error(err.message)
        }
      })
    }
  }
  addressDetail(index:number){
    const item = this.allAddress[index]
    if ( item.tarih ) {
      item.tarih = dateConvert( item.tarih.toString() );
    }
  
    this.modelAddress = item
  }

}