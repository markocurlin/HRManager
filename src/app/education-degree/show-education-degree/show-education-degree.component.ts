import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { EducationDegreeApiService } from 'src/app/services/education-degree-api.service';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-education-degree',
  templateUrl: './show-education-degree.component.html',
  styleUrls: ['./show-education-degree.component.css']
})
export class ShowEducationDegreeComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number = 1;
  sortOrder: string = '';

  @Input() educationDegrees: any;
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private router: Router,
    private educationDegreeService: EducationDegreeApiService,
  ) { }

  ngOnInit(): void {
    this.educationDegreeService.getEducationDegreeByPageSorted('name_asc', this.page, this.pageSize).subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });

    this.educationDegreeService.getNumberPages().subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages
    }, error => {
      console.log(error);
    });
  }

  refreshEducationDegrees(): void {
    this.educationDegreeService.getEducationDegreeByPageSorted('name_asc', this.page, this.pageSize).subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`education-degree-page/${this.page}/name_asc`]);
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });

    this.educationDegreeService.getEducationDegreeByPageSorted(`${column}_${direction}`, this.page, this.pageSize).subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`education-degree-page/${this.page}/${column}_${direction}`]);

  }

  handleDelete(educationDegree:any): void {
    this.educationDegreeService.deleteEducationDegree(educationDegree.id).subscribe(_ => {
      this.ngOnInit();
      this.alertComponent.changeSuccessMessage('Uspješno izbrisan stupanj obrazovanja.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje stupnja obrazovanja nije uspjelo.', 'danger');
    });
  }
}