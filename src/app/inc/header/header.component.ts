import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { Bilgiler, User } from 'src/app/models/IUser';
import { decrypt, rememberControl } from 'src/app/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faPowerOff =faPowerOff;
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
    rememberControl();
    const stringUserItem = sessionStorage.getItem('user')
    if (stringUserItem) {
      //giriş var
      try {
        //hata olma olasılığı olan kodlar
        this.user = JSON.parse(decrypt(stringUserItem))
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
  ngOnInit(): void {
  }

}
