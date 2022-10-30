import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-interest',
  templateUrl: './show-interest.component.html',
  styleUrls: ['./show-interest.component.css']
})
export class ShowInterestComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number = 1;
  sortOrder: string = '';
  
  @Input() interests: any = [];
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private router: Router,
    private interestService: InterestApiService,
  ) { }

  ngOnInit(): void {
    this.interestService.getInterestsByPageSorted('name_asc', this.page, this.pageSize).subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });

    this.interestService.getNumberPages().subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages
    }, error => {
      console.log(error);
    });
  }

  refreshInterests(): void {
    this.interestService.getInterestsByPageSorted('name_asc', this.page, this.pageSize).subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`interest-page/${this.page}/userName_asc`]);
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });
 
    this.interestService.getInterestsByPageSorted(`${column}_${direction}`, this.page, this.pageSize).subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`interest-page/${this.page}/${column}_${direction}`]);
  }

  handleDelete(interest:any): void {
    this.interestService.deleteInterest(interest.id).subscribe(_ => {
      this.ngOnInit();
      this.alertComponent.changeSuccessMessage('Uspješno izbrisana interes.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje interesa nije uspjelo.', 'danger');
    });
  }
}