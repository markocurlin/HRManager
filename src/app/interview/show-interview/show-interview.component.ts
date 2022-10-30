import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service.component';
import { InterviewApiService } from 'src/app/services/interview-api.service';
import { Interview } from 'src/app/model/interview';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-interview',
  templateUrl: './show-interview.component.html',
  styleUrls: ['./show-interview.component.css']
})
export class ShowInterviewComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number = 1;
  sortOrder: string = '';
  interviews: Interview[] = [];

  @Input() candidateId: any;
  @Input() breadcrumbItem: string = '/';
  @Input() title: string = '';
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private interviewService: InterviewApiService,
  ) { }

  ngOnInit(): void {
    this.interviewService.getInterviewsByPageSorted('dateOfInterview_asc', this.page, this.pageSize, this.candidateId).subscribe(interviews=> {
      this.interviews = interviews;
    }, error => {
      console.log(error);
    });

    this.interviewService.getNumberPages(this.candidateId).subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages;
    }, error => {
      console.log(error);
    });
  }

  handleClick(interview:any): void {
    this.router.navigate([`edit-interview-page/${interview.id}`], { state: { breadcrumbItem: this.breadcrumbItem, title: this.title } });
  }
  
  canEdit() {
    return this.authService.authContext && this.authService.authContext.canEdit;
  }

  refreshInterviews(): void {
    this.interviewService.getInterviewsByPageSorted('dateOfInterview_asc', this.page, this.pageSize, this.candidateId).subscribe(interviews=> {
      this.interviews = interviews;
    }, error => {
      console.log(error);
    });
  }
  
  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });

    this.interviewService.getInterviewsByPageSorted(`${column}_${direction}`, this.page, this.pageSize, this.candidateId).subscribe(interviews => {
      this.interviews = interviews;
    }, error => {
      console.log(error);
    });
  }

  handleDelete(interview:any): void {
    this.interviewService.deleteInterview(interview.id).subscribe(_ => {
      this.ngOnInit();
      this.alertComponent.changeSuccessMessage('Uspješno izbrisan razgovor.', 'success');
    }, error => { 
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje razgovora nije uspjelo.', 'danger');
    });
  }
}