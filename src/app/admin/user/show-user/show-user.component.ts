import { Component, Input, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service.component';
import { UserApiService } from 'src/app/services/user-api.service';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize:number = 1;
  sortOrder:string = '';
  
  @Input() users: any;
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserApiService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsersByPageSorted('userName_asc', this.page, this.pageSize).subscribe(users => {
      this.users = users;
    });

    this.userService.getNumberPages().subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages
    });
  }

  isAdmin() {
    return this.authService.authContext && this.authService.authContext.isAdmin;
  }

  refreshUsers(): void {
    this.userService.getUsersByPageSorted('userName_asc', this.page, this.pageSize).subscribe(users => {
      this.users = users;
    });

    this.router.navigate([`admin-page/${this.page}/userName_asc`]);
  }
  
  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });

    this.userService.getUsersByPageSorted(`${column}_${direction}`, this.page, this.pageSize).subscribe(users => {
      this.users = users;
    });

    this.router.navigate([`admin-page/${this.page}/${column}_${direction}`]);
  }

  handleDelete(user:any): void {
    this.userService.deleteUserIdentity(user.id).subscribe(_ => {
      this.userService.deleteUser(user.id).subscribe(_ => {
        this.ngOnInit()
        this.alertComponent.changeSuccessMessage('Uspješno izbrisan korisnik.', 'success');
      }, error => {
        console.log(error);
        this.alertComponent.changeSuccessMessage('Brisanje korisnika nije uspjelo.', 'danger');
      });
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje korisnika nije uspjelo.', 'danger');
    });
  }

  handleClick(user:any): void {
    this.router.navigate([`edit-user-page/${user.id}`], { state: { user: user } });
  }
}