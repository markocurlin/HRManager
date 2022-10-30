import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any;
  userForm: FormGroup;

  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private userService: UserApiService,
  ) { 
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z @ .]*'), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      //password: ['', Validators.maxLength(20)],
      //newPassword: ['', Validators.maxLength(20)],
      //repeatNewPassword: ['', Validators.maxLength(20)],
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
      newPassword: ['', Validators.compose([
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
      repeatNewPassword: ['', Validators.compose([
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
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = history.state.user;

    this.userForm = this.fb.group({
      userName: [`${this.user.userName}`, [Validators.required, Validators.pattern('[a-zA-Z @ .]*'), Validators.maxLength(50)]],
      email: [`${this.user.email}`, [Validators.required, Validators.email, Validators.maxLength(50)]],
      /*password: ['', Validators.maxLength(20)],
      newPassword: ['', Validators.maxLength(20)],
      repeatNewPassword: ['', Validators.maxLength(20)],*/
      password: ['', Validators.compose([
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
      newPassword: ['', Validators.compose([
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
      repeatNewPassword: ['', Validators.compose([
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
      firstName: [`${this.user.firstName}`,[Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      lastName: [`${this.user.lastName}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      role: [`${this.user.role}`, Validators.required],
    });

    if (this.user.role === 'Admin') {
      this.userForm.get('role')?.disable();
    }
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
    if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
      var user = {
        id: this.user.id,
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        newPassword: this.userForm.value.newPassword,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        role: this.userForm.value.role,
      };
      
      this.userService.updateUserIdentity(this.user.id, user).subscribe(_ => {
        this.userService.updateUser(this.user.id, user).subscribe(_ => {
          this.alertComponent.changeSuccessMessage('Uspješno ažuriranje korisnika.', 'success');
        }, error => {
          console.log(error);
          this.alertComponent.changeSuccessMessage('Ažuriranje korisnika nije uspjelo.', 'danger');
        });
      }, error => {
        console.log(error);
        this.alertComponent.changeSuccessMessage('Ažuriranje korisnika nije uspjelo.', 'danger');
      });
    } else {
      this.alertComponent.changeSuccessMessage('Lozinke se ne podudaraju.', 'danger');
    }
  }
}