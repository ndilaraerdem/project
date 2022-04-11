import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faBriefcase, faGripLines, faHandPointRight, faPowerOff, faRightFromBracket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faPowerOff = faPowerOff;
  faUsers = faUsers;
  faBriefcase = faBriefcase;
  faBars = faBars;
  faHandPointRight = faHandPointRight;
  faRightFromBracket = faRightFromBracket;


  constructor(
    private router : Router
  ) { }
  logout() {
    const alert = confirm('Silmek istediğinizden emin misiniz?')
      if (alert) {
        localStorage.removeItem('user')//beni hatırlayı sil
        sessionStorage.removeItem('user')//user oturumunu sil
        this.router.navigate(['/'])
      }

    }
  ngOnInit(): void {
  }

}
