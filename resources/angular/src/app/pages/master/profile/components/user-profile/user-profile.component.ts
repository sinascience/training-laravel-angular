import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../../users/services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userLogin;
  titleModal: string;
  modelId: number;
  userVital;

  constructor(
  private userService: UserService,
  private router: Router,
  private authService: AuthService,) {}

  ngOnInit(): void {
    this.getUserLogin();
    this.getUserCredential(this.userLogin.id)
  }
  
  getUserLogin() {
    this.authService.getProfile().subscribe((user: any) => {
      this.userLogin = user;
  });
  }

  getUserCredential(e) {
    this.userService.getUserById(e).subscribe((user: any) => {
      this.userVital = user;
  });
  }

  // logout() {
  //   let isChange: false;

  //   if (this.userVital.email != this.userLogin.email || this.userLogin.password != null) {
  //     isChange: true;
  //   }

  //   if(isChange) {
  //     this.authService.logout();
  //     this.router.navigate(['auth/login']);
  //   }
}


