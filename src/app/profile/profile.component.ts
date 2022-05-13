import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Bilgiler, IUser } from '../models/IUser';
import { RestService } from '../services/rest.service';
import { SeoService } from '../services/seo.service';
import { decrypt, encrypt } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: '',
  };
  password = '';

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private seo: SeoService,
    private restService: RestService
  ) {
    const stringUserItem = sessionStorage.getItem('user');
    if (stringUserItem) {
      try {
        this.user = JSON.parse(decrypt(stringUserItem));
      } catch (error) {
        sessionStorage.removeItem('user');
      }
    }
  }
  ngOnInit(): void {
    this.seo.updateTitle('Profile');
  }

  updateData() {
    if (this.user.userName === '') {
      this.toast.error('Name Empty!');
    } else if (this.user.userSurname === '') {
      this.toast.error('Surname Empty!');
    } else if (this.user.userEmail === '') {
      this.toast.error('Email Empty!');
    } else if (this.user.userPhone === '') {
      this.toast.error('Phone Empty!');
    } else if (this.password === '') {
      this.toast.error('Password Empty!');
    } else {
      //datalar var gönderimini sağla.
      const sendParams = {
        ref: environment.ref,
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userMail: this.user.userEmail,
        userPhone: this.user.userPhone,
        userPass: this.password,
        userId: this.user.userId,
      };
      this.restService.userUpdate(sendParams).subscribe((data) => {
        const userData = data.user[0];
        const status = userData.durum;
        const message = userData.mesaj;
        if (status) {
          const stringUser = JSON.stringify(this.user);
          sessionStorage.setItem('user', encrypt(stringUser));
          this.toast.success(message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.toast.error(message);
        }
      });
    }
    const userItem = JSON.stringify(this.user);
    localStorage.removeItem('user');
    localStorage.setItem('user', encrypt(userItem));
  }
}
