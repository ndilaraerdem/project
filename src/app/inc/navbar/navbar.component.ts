import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor() { }

  ngOnInit(): void {
  }

}
