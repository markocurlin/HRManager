import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EducationDegreeApiService } from 'src/app/services/education-degree-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-add-education-degree',
  templateUrl: './add-education-degree.component.html',
  styleUrls: ['./add-education-degree.component.css']
})
export class AddEducationDegreeComponent {
  educationDegrees: any;
  educationDegreeForm = this.fb.group({
    educationDegree: ['', [Validators.required, Validators.pattern('[a-zA-Z . ]*'), Validators.maxLength(20)]],
  });

  @Output() educationDegreesEvent = new EventEmitter<any>();
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private educationDegreeService: EducationDegreeApiService,
  ) { }

  handleSubmit(): void {
    var educationDegree = {
      name: this.educationDegreeForm.value.educationDegree,
    }

    this.educationDegreeService.addEducationDegree(educationDegree).subscribe(_ => {
      this.educationDegreeService.getEducationDegreeList().subscribe(educationDegrees => {
        this.educationDegreesEvent.emit(educationDegrees);
      }, error => {
        console.log(error);
      });
      this.alertComponent.changeSuccessMessage('Uspješno dodan stupanj obrazovanja.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Dodavanje stupnja edukacije nije uspjelo', 'danger');
    });

    this.educationDegreeForm.reset();
  }
}