import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { encrypt, rememberControl } from '../utils';
import { SeoService } from '../services/seo.service';
import { RestService } from '../services/rest.service';
import { environment } from 'src/environments/environment';
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
    private router : Router,
    private seo: SeoService,
    private restService: RestService
  ) { 
    //kullanıcı beni hatırla dediyse
    //kullanıcıyı admine gönder

    const status = rememberControl();
    if (status === true) {
      this.router.navigate(['/admin'])
    }

  }
  userForm = this.formBuilder.group({
    email : '',
    password : '',
    remember: false
  })

  ngOnInit(): void {
    this.seo.updateTitle("Admin Login")

    this.userForm = new FormGroup({
      email: new FormControl( this.userForm.value.email, [
        Validators.required, Validators.email
      ]),
      password : new FormControl(this.userForm.value.password, [
        Validators.required
      ]),
      remember: new FormControl(this.userForm.value.remember, [])
    })
  }
  get email() {
    return this.userForm.get('email')
  }
  get password() {
    return this.userForm.get('password')
  }

  fncLogin(){
    const remember = this.userForm.value.remember
    console.log("remember",remember);
    
    const url = 'https://www.jsonbulut.com/json/userLogin.php'

    const sendParams = {
      ref:environment.ref,
      userEmail: this.email?.value,
      userPass : this.password?.value,
      face: 'no'
    }
    this.restService.userLogin(sendParams).subscribe((data)=> {
      const user = data.user[0]
      const status = user.durum
      const message = user.mesaj
      console.log(status, message)
      if (status) {
        //giriş başarılı
        this.toast.success(
          message, 'User Login'

        )
        //Session Storage'a kullanıcı bilgilerini sakla
        const userData = user.bilgiler;
         if(userData){
           const stringUserData = JSON.stringify(userData);
           sessionStorage.setItem('user', encrypt(stringUserData))
          //remember ->true
           if(remember === true){
            localStorage.setItem('user', encrypt(stringUserData))
          }
           this.router.navigate(['/admin'])
         }
      }else{
        //giriş başarısız
        this.toast.error(
          message, 'User Login'
        )
      }
    })
  }
}
