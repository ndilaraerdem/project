import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bilgiler, IUser } from '../models/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''

  }
  password = "";

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {
    const stringUserItem = sessionStorage.getItem('user')
    if (stringUserItem) {
      try {
        this.user = JSON.parse(stringUserItem)
      } catch (error) {
        sessionStorage.removeItem('user')
      }
    }
  }

  updateData() {
    if (this.user.userName === "") {
      this.toast.error("Name Empty!")
    }
    else if (this.user.userSurname === "") {
      this.toast.error("Surname Empty!")
    }
    else if (this.user.userEmail === "") {
      this.toast.error("Email Empty!")
    }
    else if (this.user.userPhone === "") {
      this.toast.error("Phone Empty!")
    }
    else if (this.password === "") {
      this.toast.error("Password Empty!")
    }
    else {
    //datalar var gönderimini sağla.

      const url = 'https://www.jsonbulut.com/json/userSettings.php'
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userMail: this.user.userEmail,
        userPhone: this.user.userPhone,
        userPass: this.password,
        userId: this.user.userId
      }
      const mythis = this
      this.http.get<IUser>(url, { params: sendParams }).subscribe({
        next(res) {
          const userData = res.user[0]
          const status = userData.durum
          const message = userData.mesaj
          if (status) {
            const stringUser = JSON.stringify(mythis.user)
            sessionStorage.setItem('user',stringUser)
            mythis.toast.success(message)
            setTimeout(()=>{
              window.location.reload()
            },2000)
          } else {
            mythis.toast.error(message)
          }
        },
        error(err) {
          console.log(err.message)
        }
      })


    }







    const userItem = JSON.stringify(this.user)
    localStorage.removeItem('user')
    localStorage.setItem('user', userItem)

  }

  ngOnInit(): void {
  }

}
