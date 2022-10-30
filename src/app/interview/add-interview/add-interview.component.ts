import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InterviewApiService } from 'src/app/services/interview-api.service';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { Interview } from 'src/app/model/interview';
import { AlertComponent } from 'src/app/alert/alert.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
  interests: any;
  @Input() candidateId: any;
  @Output() interviewsEvent = new EventEmitter<any>();
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

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

  constructor(
    private fb: FormBuilder,
    private interviewService: InterviewApiService,
    private interestService: InterestApiService,
    private parserFormatter: NgbDateParserFormatter,
  ) { }

  ngOnInit(): void {
    this.interestService.getInterestList().subscribe(interests => {
      this.interests = interests;
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

  handleAddInterview(): void {
    var interview = new Interview();

    interview.dateOfInterview = this.parserFormatter.format(this.interviewForm.value.dateOfInterview as NgbDateStruct);
    interview.comment = this.interviewForm.value.comment!;
    interview.interest = this.interviewForm.value.interest!;
    interview.evaluation = this.interviewForm.value.evaluation!;
    interview.selectEmployment = this.interviewForm.value.selectEmployment!;
    interview.dateOfEmployment = this.parserFormatter.format(this.interviewForm.value.dateOfEmployment as NgbDateStruct);
    interview.candidateId = this.candidateId;

    this.interviewService.addInterview(interview).subscribe(response => {
      console.log(response);
      this.interviewService.getInterviews(this.candidateId).subscribe(interviews => {
        this.interviewsEvent.emit(interviews);
      }, error => {
        console.log(error);
      });
      this.alertComponent.changeSuccessMessage('Uspješno dodan razgovor.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Dodavanje razgovora nije uspjelo.', 'danger');
    });

    this.interviewForm.reset();
  }
}