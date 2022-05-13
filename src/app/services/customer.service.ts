import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  sendData(customerForm: any){
    return this.http.post(environment.customerPath, customerForm.value).subscribe((data) => this.getData());
  }
  getData() {
   return this.http.get(environment.customerPath);
  }
}
