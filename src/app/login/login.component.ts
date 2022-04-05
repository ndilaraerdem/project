import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private toast : ToastrService,
    private router : Router
  ) { }
  userForm = this.formBuilder.group({
    email : '',
    password : ''
  })

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl( this.userForm.value.email, [
        Validators.required, Validators.email
      ]),
      password : new FormControl(this.userForm.value.password, [
        Validators.required
      ])
    })
  }
  get email() {
    return this.userForm.get('email')
  }
  get password() {
    return this.userForm.get('password')
  }
  fncLogin(){
    const email = this.email?.value
    const password = this.password?.value
    
    const url = 'https://www.jsonbulut.com/json/userLogin.php'
    const sendParams = {
      ref:'c7c2de28d81d3da4a386fc8444d574f2',
      userEmail: email,
      userPass : password,
      face: 'no'
    }
  
    const mythis = this
    this.http.get<IUser>(url,{params: sendParams}).subscribe({
      next(res){
        const user = res.user[0]
        const status = user.durum
        const message = user.mesaj
        console.log(status, message)
        if (status) {
          //giriş başarılı
          mythis.toast.success(
            message, 'User Login'
          )
          //Session Storage'a kullanıcı bilgilerini sakla
          const userData = user.bilgiler;
           if(userData){
             const stringUserData = JSON.stringify(userData);
             sessionStorage.setItem('user',stringUserData)
             mythis.router.navigate(['/admin'])
           }
        }
        else{
          //giriş başarısız
          mythis.toast.error(
            message, 'User Login'
          )
        }
      },
      error(err){
        console.log(err.message)
      }
    })
  }
}
