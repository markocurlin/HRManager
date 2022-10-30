import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkingPlaceApiService } from 'src/app/services/working-place-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-add-working-place',
  templateUrl: './add-working-place.component.html',
  styleUrls: ['./add-working-place.component.css']
})
export class AddWorkingPlaceComponent {
  workingPlace: any;
  workingPlaceForm = this.fb.group({
    workingPlace: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
  });

  @Output() workingPlacesEvent = new EventEmitter<any>();
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private workingPlaceService: WorkingPlaceApiService,
  ) { }

  handleSubmit(): void {
    var workingPlace = {
      name: this.workingPlaceForm.value.workingPlace,
    }

    this.workingPlaceService.addWorkingPlace(workingPlace).subscribe(_ => {
      this.workingPlaceService.getWorkingPlaceList().subscribe(workingPlace => {
        this.workingPlacesEvent.emit(workingPlace);
      }, error => {
        console.log(error);
      });
      this.alertComponent.changeSuccessMessage('Uspješno dodana pozicija.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Dodavanje pozicije nije uspjelo.', 'danger');
    });

    this.workingPlaceForm.reset();
  }
}