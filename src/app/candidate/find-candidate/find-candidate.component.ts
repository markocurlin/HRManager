import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service.component';
import { CandidateApiService } from 'src/app/services/candidate-api.service';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { WorkingPlaceApiService } from 'src/app/services/working-place-api.service';
import { EducationDegreeApiService } from 'src/app/services/education-degree-api.service';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Candidate } from 'src/app/model/candidate';
import { Interview } from 'src/app/model/interview';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-find-candidate',
  templateUrl: './find-candidate.component.html',
  styleUrls: ['./find-candidate.component.css']
})
export class FindCandidateComponent implements OnInit {
  candidate: any;
  interests: any;
  workingPlaces: any;
  educationDegrees: any;
  searchResults: any = [];
  searchResultsList: any = [];
  formDisable: boolean = false;
  formValue = [];
  page = 1;
  pageSize = 5;
  collectionSize:number = 1;

  @ViewChild(AlertComponent) private alertComponent! : AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private interestService: InterestApiService,
    private workingPlacesService: WorkingPlaceApiService,
    private educationDegreeService: EducationDegreeApiService,
    private parserFormatter: NgbDateParserFormatter,
  ) { }
  
  findForm = this.fb.group({
    firstName: ['', Validators.maxLength(50)],
    lastName: ['', Validators.maxLength(50)],
    dateOfApplication: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }],
    workingPlace: [''],
    educationDegree: [''],
    dateOfInterview: [{
      'year': 0,
      'month': 0,
      'day': 0,
    }],
    interest: [''],
    evaluation: [''],
  });

  ngOnInit(): void {
    this.interestService.getInterestList().subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });

    this.workingPlacesService.getWorkingPlaceList().subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;
    }, error => {
      console.log(error);
    });

    this.educationDegreeService.getEducationDegreeList().subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });
  }

  canEdit() {
    return this.authService.authContext && this.authService.authContext.canEdit;
  }

  refreshCandidates(): void {
    this.searchResults = this.searchResultsList
      .map((searchResults:any, index:any) => ({id: index + 1, ...searchResults}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  iterateWorkingPlaces(candidate:any) {
    var count = 0;
    var position = 0;

    candidate.candidateWorkingPlaces.forEach((candidateWorkingPlace:any, index:number) => {
      if (candidateWorkingPlace.value === true) {
        count++;
        position = index;
      }
    });

    return { count, position };
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });

    this.searchResults = [...this.searchResults].sort((a, b) => {
      if (column === 'workingPlace') {
        if (this.iterateWorkingPlaces(a).count === this.iterateWorkingPlaces(b).count) {
          const res = compare(a.candidateWorkingPlaces[this.iterateWorkingPlaces(a).position].workingPlace.name, b.candidateWorkingPlaces[this.iterateWorkingPlaces(b).position].workingPlace.name);
          return direction === 'asc' ? res : -res;
        } else {
          const res = compare(this.iterateWorkingPlaces(a).count, this.iterateWorkingPlaces(b).count);
          return direction === 'asc' ? res : -res;
        }
      }

      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }

  atLeastOneValidator() {
    let controls = this.findForm.controls;

    if (controls) {
      let controlsList = Object.values(controls);
      let array: boolean[] = [];
       
      controlsList.forEach((a:any) => {
        if (a.value == '' && (a.value.year == undefined && a.value.month == undefined && a.value.day == undefined)) {
          array.push(false);
        } else if ((a.value != undefined && a.value != undefined && a.value != undefined) && (a.value.year == 0 && a.value.month == 0 && a.value.day == 0) && (a.value.year != null && a.value.month != null && a.value.day != null)) {
          array.push(false);
        } else {
          array.push(true);
        }
      });

      if (array.includes(true)) {
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  handleSubmit(): void {
    var candidate = new Candidate();

    candidate.firstName = this.findForm.value.firstName!;
    candidate.lastName = this.findForm.value.lastName!;
    candidate.dateOfApplication = this.parserFormatter.format(this.findForm.value.dateOfApplication as NgbDateStruct);
    candidate.workingPlace = this.findForm.value.workingPlace!;
    candidate.educationDegree = this.findForm.value.educationDegree!;
    
    var interview = new Interview();

    interview.dateOfInterview = this.parserFormatter.format(this.findForm.value.dateOfInterview as NgbDateStruct);
    interview.interest = this.findForm.value.interest!;
    interview.evaluation = this.findForm.value.evaluation!;
    
    candidate.interviews.push(interview);

    this.candidate = candidate;
    
    this.candidateService.searchCandidates(candidate).subscribe(searchResults => {
      console.log(searchResults);
      this.collectionSize = searchResults.length;
      this.searchResultsList = searchResults;
      this.refreshCandidates();
      
      this.router.navigate([`find-candidate-page`]);

      if (searchResults.length === 0) {
        this.alertComponent.changeSuccessMessage('Kandidat ili razgovor ne postoji.', 'danger');
      }
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Kandidat ili razgovor ne postoji.', 'danger');
    });
  }

  handleDelete(candidate:any): void {
    this.candidateService.deleteCandiDate(candidate.id).subscribe(_ => {
      this.candidateService.searchCandidates(this.candidate).subscribe(searchResults => {
        this.collectionSize = searchResults.length;
        this.searchResultsList = searchResults;
        this.refreshCandidates();
      }, error => {
        console.log(error);
      });
      this.alertComponent.changeSuccessMessage('Uspješno izbrisan kandidat.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje kandidata nije uspjelo.', 'danger');
    });
  }

  handleClick(candidate: any): void {
    this.router.navigate([`edit-candidate-page/${candidate.id}`], { state: { breadcrumbItem: '/find-candidate-page', title: 'Pretraživanje kandidata' } });
  }
}