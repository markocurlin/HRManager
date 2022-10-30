import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterviewApiService } from 'src/app/services/interview-api.service';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { Location } from '@angular/common';
import { AlertComponent } from 'src/app/alert/alert.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.css']
})
export class EditInterviewComponent implements OnInit {
  interests: any;
  interview: any
  interviewForm: FormGroup;
  sub: any;
  breadcrumbItem: string = '/';
  title: string = '';

  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder,
    private interviewService: InterviewApiService,
    private interestService: InterestApiService,
    private route: ActivatedRoute,
    private location: Location,
    private parserFormatter: NgbDateParserFormatter,
  ) { 
    this.interviewForm = this.fb.group({
      dateOfInterview: ['', Validators.required],
      comment: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(150)]],
      interest: ['', Validators.required],
      evaluation: ['', Validators.required],
      selectEmployment: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbItem = history.state.breadcrumbItem;
    this.title = history.state.title;

    this.sub = this.route.params.subscribe(params => {
      this.interviewService.getInterview(params['id']).subscribe(interview => {
        this.interview = interview;
        this.interviewForm = this.fb.group({
          dateOfInterview: [this.parserFormatter.parse(this.interview.dateOfInterview), Validators.required],
          comment: [`${this.interview.comment}`, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(150)]],
          interest: [`${this.interview.interest}`, Validators.required],
          evaluation: [`${this.interview.evaluation}`, Validators.required],
          selectEmployment: [`${this.interview.selectEmployment}`, Validators.required],
          dateOfEmployment: [this.parserFormatter.parse(this.interview.dateOfEmployment), Validators.required],
        });
      }, error => {
        console.log(error);
      });
    });
    
    this.interestService.getInterestList().subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });
  }

  onChanges(): void {
    if (this.interviewForm.get('selectEmployment')?.value === 'Da') {
      this.interviewForm.get('dateOfEmployment')?.enable();
    } else {
      this.interviewForm.get('dateOfEmployment')?.reset();
      this.interviewForm.get('dateOfEmployment')?.disable();
    }
  }

  handleSubmit(): void {
    this.interview.dateOfInterview = this.parserFormatter.format(this.interviewForm.value.dateOfInterview);
    this.interview.comment = this.interviewForm.value.comment;
    this.interview.interest = this.interviewForm.value.interest;
    this.interview.evaluation = this.interviewForm.value.evaluation;
    this.interview.selectEmployment = this.interviewForm.value.selectEmployment;
    this.interview.dateOfEmployment = this.parserFormatter.format(this.interviewForm.value.dateOfEmployment);

    this.interviewService.updateInterview(this.interview.id, this.interview).subscribe(response => {
      console.log(response);
      this.alertComponent.changeSuccessMessage('Uspješno ažuriran razgovor.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Ažuriranje razgovora nije uspjelo.', 'danger');
    });
  }

  handleBack(): void {
    this.location.back();
  }
}