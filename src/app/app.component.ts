import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoggedIn = false;
  userName: string = 'd';
  location: string = '/';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    
    this.authService.getUser().then(userName => {
      this.userName = userName!;
    });

    //console.log(this.userName);
  }

  updateLocation(): void {
    this.location = this.router.url;

    //console.log(this.router.url);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.authContext && this.authService.authContext.isAdmin;
  }

  canEdit() {
    return this.authService.authContext && this.authService.authContext.canEdit;
  }
}