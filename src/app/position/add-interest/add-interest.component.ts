import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-add-interest',
  templateUrl: './add-interest.component.html',
  styleUrls: ['./add-interest.component.css']
})
export class AddInterestComponent {
  interests: any;
  interestForm = this.fb.group({
    interest: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
  });

  @Output() interestsEvent = new EventEmitter<any>();
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestApiService,
  ) { }

  handleSubmit(): void {
    var interest = {
      name: this.interestForm.value.interest,
    }

    this.interestService.addInterest(interest).subscribe(_ => {
      this.interestService.getInterestList().subscribe(interests => {
        this.interestsEvent.emit(interests);
      }, error => {
        console.log(error);
      });
      this.alertComponent.changeSuccessMessage('Uspješno dodana pozicija.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Dodavanje pozicije nije uspjelo.', 'danger');
    });

    this.interestForm.reset();
  }
}