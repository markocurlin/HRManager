import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { ShowUserComponent } from './user/show-user/show-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any;

  @ViewChild(ShowUserComponent) private showUserComponent!: ShowUserComponent;

  constructor(
    private userService: UserApiService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }
  
  emitUsers(users:any): void {
    this.users = users;
    this.showUserComponent.ngOnInit();
  }
}