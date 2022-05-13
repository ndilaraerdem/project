import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
//import data from '../customer.json';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  faTrash = faTrash;
  search = '';
  customer: any = [];
  tempArray: any = [];
  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('', [Validators.required]),
  });
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.tempArray = this.customer;
  }
  saveCustomer() {
    if (this.customerForm.valid) {
      this.sendData(this.customerForm);
      console.log(this.customerForm.value);
    
    } else {
      this.toastr.error("Empty Fields!")
    }
  }
  sendData(customerForm: any){
    this.http.post(environment.customerPath, customerForm.value).subscribe((data) => window.location.reload());
  }
  getData() {
    this.http.get(environment.customerPath).subscribe((data:any) => {
      Object.keys(data).forEach((key) => {
        this.customer.push({ id: key, data: data[key] });
      });
      console.log(this.customer[0]['id']);
      console.log(this.customer[0]['data'].surname);
      console.log(this.customer[3].id)
    });
  }
  deleteData(index:number) {
   const answer = confirm('Are you sure to delete?');
   if(answer){
         this.http.delete(environment.customerBasePath + this.customer[index].id + '.json')
      .subscribe((data) => window.location.reload());
   }
  }
  fncSearch() {
    this.customer = this.tempArray;
    const searchValue = this.search.toLocaleLowerCase();
    const filterGlobal = (item: any) =>
      item.customer['id']?.toLocaleLowerCase().includes(searchValue) ||
      item.customer['data'].name.toLocaleLowerCase().includes(searchValue);

    this.customer = this.customer.filter(filterGlobal);
  }
}
