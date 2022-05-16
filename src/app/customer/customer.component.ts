import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CustomerList } from '../models/ICustomer';
//import data from '../customer.json';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faPenToSquare;
  searchText = '';
  selectedCustomer = -1;
  edit: boolean = false;
  customer: CustomerList[] = [];
  tempCustomer: CustomerList[] = [];

  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCustomer();
  }
  saveCustomer() {
    if (this.customerForm.valid) {
      this.sendData(this.customerForm);
    } else {
      this.toastr.error('Empty Fields!');
    }
  }
  sendData(customerForm: any) {
    this.http
      .post(environment.customerPath, customerForm.value)
      .subscribe((data) => window.location.reload());
  }
  getCustomer() {
    this.http.get(environment.customerPath).subscribe((data: any) => {
      Object.keys(data).forEach((key) => {
        this.customer.push({ id: key, data: data[key] });
        this.tempCustomer = this.customer;
      });
    });
  }
  deleteCustomer(index: number) {
    const answer = confirm('Are you sure to delete?');
    if (answer) {
      this.http
        .delete(
          environment.customerBasePath + this.customer[index].id + '.json'
        )
        .subscribe((data) => window.location.reload());
    }
  }
  searchCustomer() {
    this.tempCustomer = this.customer.filter((customer) => {
      return (
        customer.data.city
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        customer.data.firstName
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        customer.data.surname
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        customer.data.email
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase())
      );
    });
  }
  editCustomer(index: number) {
    console.log(index);
    this.edit = true;
    this.selectedCustomer = index;
    this.customerForm.setValue(this.customer[index].data);
  }
  updateCustomer(selected: number) {
    this.edit = false;
    this.http
      .put(
        environment.customerBasePath + this.customer[selected].id + '.json',
        this.customerForm.value
      )
      .subscribe((data) => {
        this.selectedCustomer = -1;
        window.location.reload();
        this.getCustomer();
      });
  }
}
