import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Bilgiler, User } from 'src/app/models/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;

  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  constructor(private router: Router) {
    const stringUserItem = sessionStorage.getItem('user')
    if (stringUserItem) {
      //giriş var
      try {
        //hata olma olasılığı olan kodlar
        this.user = JSON.parse(stringUserItem)
      } catch (error) {
        //hata olduğunda çalışacak kodlar
        sessionStorage.removeItem('user')
        this.router.navigate(['/'])
      }
    }
    else {
      //giriş yok
      this.router.navigate(['/'])
    }
  }

  logout() {
    const alert = confirm('Silmek istediğinizden emin misiniz?')
      if (alert) {
        sessionStorage.removeItem('user')
        this.router.navigate(['/'])
      }

    }

  ngOnInit(): void {
  }

}