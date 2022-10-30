import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  users: any;

  @Input() userId: any;
  @Output() userEvent = new EventEmitter<any>();
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  userForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', Validators.compose([
      Validators.required,
      this.patternValidator(/\d/, {
        hasNumber: true
      }),
      this.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      this.patternValidator(/[a-z]/, {
        hasSmallCase: true
      }),
      this.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),
      Validators.minLength(8)])
    ],
    role: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserApiService,
  ) { }

  ngOnInit(): void {
  }

  updateUsers(): void {
    this.userService.getUserList().subscribe(users => {
      this.userEvent.emit(users);
    });
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  handleSubmit(): void {
    var user = {
      userName: this.userForm.value.userName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      role: this.userForm.value.role,
    }
    
    this.userService.addUserIdentity(user).subscribe(response => {
      if (response) {
        this.userService.addUser(response).subscribe(_ => {
          this.updateUsers();
        }, error => {
          console.log(error);
        });
        this.alertComponent.changeSuccessMessage('Uspješno dodan korisnik.', 'success');
      }
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Dodavanje korisnika nije uspjelo.', 'danger');
    });

    this.userForm.reset();
  }
}