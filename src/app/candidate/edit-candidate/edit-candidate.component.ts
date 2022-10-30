import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth-service.component';
import { CandidateApiService } from 'src/app/services/candidate-api.service';
import { WorkingPlaceApiService } from 'src/app/services/working-place-api.service';
import { EducationDegreeApiService } from 'src/app/services/education-degree-api.service';
import { Location } from '@angular/common';
import { AlertComponent } from 'src/app/alert/alert.component';
import { AddInterviewComponent } from 'src/app/interview/add-interview/add-interview.component';
import { ShowInterviewComponent } from 'src/app/interview/show-interview/show-interview.component';
import { Candidate } from 'src/app/model/candidate';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {
  candidate: any;
  candidateForm: FormGroup;
  educationDegrees: any;
  workingPlaces: any;
  interviews: any;
  fileSrc: any;
  uploadedFileName: any;
  formData: FormData;
  isFileUploading: boolean = false;
  isCollapsed: boolean = false;
  breadcrumbItem: string = '/';
  title: string = '';
  id: any;

  downloadedFile: any;

  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChild(AddInterviewComponent) private addInterviewComponent!: AddInterviewComponent;
  @ViewChild(ShowInterviewComponent) private showInterviewComponent!: ShowInterviewComponent;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private candidateService: CandidateApiService,
    private workingPlaceService: WorkingPlaceApiService,
    private educationDegreeService: EducationDegreeApiService,
    private location: Location,
    private parserFormatter: NgbDateParserFormatter,
  ) { 
    this.candidateForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      dateOfApplication: [{
        'year': 0,
        'month': 0,
        'day': 0,
      }, Validators.required],
      workingPlace: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
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

    this.candidate = new Candidate();
    this.formData = new FormData();
  }

  checkboxForm = this.fb.group({
  });
  
  ngOnInit(): void {
    window.scroll(0,0);

    this.breadcrumbItem = history.state.breadcrumbItem;
    this.title = history.state.title;
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.candidateService.getCandiDate(this.id).subscribe(candidate => {
        this.candidate = candidate;

        this.candidateForm = this.fb.group({
          firstName: [`${this.candidate.firstName}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
          lastName: [`${this.candidate.lastName}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
          dateOfApplication: [this.parserFormatter.parse(this.candidate.dateOfApplication), Validators.required],
          dateOfBirth: [this.parserFormatter.parse(this.candidate.dateOfBirth), Validators.required],
          profession: [`${this.candidate.profession}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
          employment: [`${this.candidate.employment}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
          educationDegree: [`${this.candidate.educationDegree}`, Validators.required],
          education: [`${this.candidate.education}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
          candidateFile: [],
        });

        this.uploadedFileName = this.candidate.candidateFile;

        this.workingPlaceService.getWorkingPlaceList().subscribe(workingPlaces => {
          this.workingPlaces = workingPlaces;

          const arr: string[]= [];
          
          this.candidate.candidateWorkingPlaces.forEach((candidateWorkingPlaces:any) => {
            arr.push(candidateWorkingPlaces.workingPlace.name);            
          });

          workingPlaces.forEach((workingPlace:any) => {
            this.candidate.candidateWorkingPlaces.forEach((candidateWorkingPlaces:any) => {
              if (arr.includes(workingPlace.name)) {
                this.checkboxForm.addControl(candidateWorkingPlaces.workingPlace.name, new FormControl(candidateWorkingPlaces.value));
              } else {
                this.checkboxForm.addControl(workingPlace.name, new FormControl(false));
              }
            });
          });
          this.candidateForm.setControl('workingPlace', new FormControl(this.fb.array(workingPlaces.map(workingPlace => this.createListForm(workingPlace)))));
          this.handleWorkingPlaceForm();
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    });

    this.educationDegreeService.getEducationDegreeList().subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });

    if (!this.canEdit()) {
      this.candidateForm.disable();
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

  canEdit() {
    return this.authService.authContext && this.authService.authContext.canEdit;
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

    this.uploadedFileName = file.name;

    this.formData.set('candidateFile', file);
    this.formData.set('candidateFileName', file.name);
  }

  downloadFile() {
    this.candidateService.getFile(this.uploadedFileName).subscribe(downloadedFile => {
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = this.uploadedFileName;
      a.href = URL.createObjectURL(downloadedFile);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.log(error);
    });
  }

  handleSubmit(): void {
    this.formData.set('id', this.candidate.id)
    this.formData.set('firstName', this.candidateForm.value.firstName!);
    this.formData.set('lastName', this.candidateForm.value.lastName!);
    this.formData.set('dateOfApplication', this.parserFormatter.format(this.candidateForm.value.dateOfApplication as NgbDateStruct));
    this.formData.set('dateOfBirth', this.parserFormatter.format(this.candidateForm.value.dateOfBirth as NgbDateStruct));
    this.formData.set('profession', this.candidateForm.value.profession!);
    this.formData.set('employment', this.candidateForm.value.employment!);
    this.formData.set('educationDegree', this.candidateForm.value.educationDegree!);
    this.formData.set('education', this.candidateForm.value.education!);
    this.formData.set('candidateFileName', this.candidate.candidateFile);

    this.candidateService.updateCandidate(this.candidate.id, this.formData).subscribe(response => {
      console.log(response);
      this.alertComponent.changeSuccessMessage('Uspješno ažuriran kandidat.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Ažuriranje nije uspjelo.', 'danger');
    });
  }

  emitInterviews(interviews:any): void {
    this.interviews = interviews;
    this.showInterviewComponent.ngOnInit();
  }

  handleColapse(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.addInterviewComponent.interviewForm.reset();
    } else {
      this.isCollapsed = true;
    }
  }

  handleBackButton(): void {
    this.location.back();
  }
}