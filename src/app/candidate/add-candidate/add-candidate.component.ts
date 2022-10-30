import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateApiService } from 'src/app/services/candidate-api.service';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { WorkingPlaceApiService } from 'src/app/services/working-place-api.service';
import { EducationDegreeApiService } from 'src/app/services/education-degree-api.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/alert/alert.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit{
  isCollapsed: boolean = false;
  interests: any;
  workingPlaces: any;
  educationDegrees: any;
  fileSrc: any;
  uploadedFile: any;
  formData: FormData;
  isFileUploading: boolean = false;
  size: number = 0;

  @ViewChild(AlertComponent) private alertComponent! : AlertComponent;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateApiService,
    private interestService: InterestApiService,
    private workingPlaceService: WorkingPlaceApiService, 
    private educationDegreeService: EducationDegreeApiService,
    private parserFormatter: NgbDateParserFormatter,
  ) {
    this.formData = new FormData();
  }

  checkboxForm = this.fb.group({
  });

  candidateForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
    dateOfApplication: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }, Validators.required],
    workingPlace: [{}],
    dateOfBirth: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }, Validators.required],
    profession: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
    employment: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
    educationDegree: ['', Validators.required],
    education: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
    candidateFile: ['', Validators.required],
  });

  interviewForm = this.fb.group({
    dateOfInterview: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }, Validators.required],
    comment: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(150)]],
    interest: ['', Validators.required],
    evaluation: ['', Validators.required],
    selectEmployment: ['', Validators.required],
    dateOfEmployment: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }, Validators.required],
  });

  ngOnInit(): void {
    this.workingPlaceService.getWorkingPlaceList().subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;

      workingPlaces.forEach((workingPlace:any) => {
        this.checkboxForm.addControl(workingPlace.name, new FormControl(false));
      });

      this.candidateForm.setControl('workingPlace', new FormControl(this.fb.array(workingPlaces.map(workingPlace => this.createListForm(workingPlace)))));
    }, error => {
      console.log(error);
    });

    this.interestService.getInterestList().subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });

    this.educationDegreeService.getEducationDegreeList().subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });

    this.interviewForm.get('dateOfEmployment')?.disable();
  }

  onChanges(): void {
    if (this.interviewForm.get('selectEmployment')?.value === 'Da') {
      this.interviewForm.get('dateOfEmployment')?.enable();
    } else {
      this.interviewForm.get('dateOfEmployment')?.reset();
      this.interviewForm.get('dateOfEmployment')?.disable();
    }
  }

  createListForm(workingPlace:any): FormGroup {
    return this.fb.group({
      id: workingPlace.id,
      name: workingPlace.name,
      value: new FormControl(this.checkboxForm.get(`${workingPlace.name}`)),
    });
  }

  checkBoxFormValidator(): boolean {
    if (Object.values(this.checkboxForm.value).includes(true)) {
      return true;
    } else {
      return false;
    }
  }
  
  handleWorkingPlaceForm() {
    var workingPlaceArray = this.candidateForm.value.workingPlace as FormArray;

    var values = [];

    for(var i = 0; i < Object.keys(workingPlaceArray.value).length; i++) {
        values.push({
          Id: workingPlaceArray.value[i].id,
          Name: workingPlaceArray.value[i].name,
          Value: workingPlaceArray.value[i].value.value,
        });
    }
    
    this.formData.set('workingPlaces', JSON.stringify(values));
  }

  onFileUpload(fileInput: any) {
    let fileList: File[] = fileInput.files;

    let reader = new FileReader();
    let file: File = fileList[0];

    reader.onloadstart = () => {
      this.isFileUploading = true;
    }

    reader.onload = (r) => {
      this.fileSrc = r.target?.result as string;
    }

    reader.onloadend = () => {
      this.isFileUploading = false;
    }

    reader.readAsDataURL(fileList[0] as Blob)

    this.uploadedFile = file;

    this.formData.set('candidateFile', file);
  }

  handleColapse(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.interviewForm.reset();
    } else {
      this.isCollapsed = true;
    }
  }

  handleSubmit(): void {
    this.formData.set('firstName', this.candidateForm.value.firstName!);
    this.formData.set('lastName', this.candidateForm.value.lastName!);
    this.formData.set('dateOfApplication', this.parserFormatter.format(this.candidateForm.value.dateOfApplication as NgbDateStruct));
    this.formData.set('dateOfBirth', this.parserFormatter.format(this.candidateForm.value.dateOfBirth as NgbDateStruct));
    this.formData.set('profession', this.candidateForm.value.profession!);
    this.formData.set('employment', this.candidateForm.value.employment!);
    this.formData.set('educationDegree', this.candidateForm.value.educationDegree!);
    this.formData.set('education', this.candidateForm.value.education!);
    
    if (this.candidateForm.valid && this.interviewForm.valid) {
      this.formData.set('dateOfInterview', this.parserFormatter.format(this.interviewForm.value.dateOfInterview as NgbDateStruct));
      this.formData.set('comment', this.interviewForm.value.comment!);
      this.formData.set('interest', this.interviewForm.value.interest!);
      this.formData.set('evaluation', this.interviewForm.value.evaluation!);
      this.formData.set('selectEmployment', this.interviewForm.value.selectEmployment!);
      this.formData.set('dateOfEmployment', this.parserFormatter.format(this.interviewForm.value.dateOfEmployment as NgbDateStruct));
      
      this.candidateService.addCandidate(this.formData).subscribe(response => {
        console.log(response);
        this.alertComponent.changeSuccessMessage('Uspješno dodan kandidat.', 'success');
      }, error => {
        console.log(error);
        this.alertComponent.changeSuccessMessage('Dodavanje nije uspijelo.', 'danger');
      });
    } else if (this.candidateForm.valid) {
      this.candidateService.addCandidate(this.formData).subscribe(response => {
        console.log(response);
        this.alertComponent.changeSuccessMessage('Uspješno dodan kandidat.', 'success');
      }, error => {
        console.log(error);
        this.alertComponent.changeSuccessMessage('Dodavanje kandidata nije uspjelo.', 'danger');
      });
    } else {
      //ovo ne triba al eto cisto info
      console.log('Nema unosa');
      this.alertComponent.changeSuccessMessage('Dodavanje nije uspjelo.', 'danger');
    }

    this.candidateForm.reset();
    this.checkboxForm.reset();
    this.interviewForm.reset();

    this.ngOnInit();
  }
}