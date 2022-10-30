import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/core/auth-service.component';
import { CandidateApiService } from 'src/app/services/candidate-api.service';
import { Router } from '@angular/router';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css']
})
export class ShowCandidateComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize:number = 1;
  sortOrder:string = '';
  candidates: any = [];

  sub: any;

  constructor(
    private authService: AuthService,
    private candidateService: CandidateApiService,
    private router: Router,
  ) { }

  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  ngOnInit(): void {
    this.candidateService.getCandidatesByPageSorted('firstName_asc', this.page, this.pageSize).subscribe(candidates => {
      this.candidates = candidates;
    }, error => {
      console.log(error);
    });

    this.candidateService.getNumberPages().subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages
    }, error => {
      console.log(error);
    });
  }

  canEdit() {
    return this.authService.authContext && this.authService.authContext.canEdit;
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

  refreshCandidates(): void {
    this.candidateService.getCandidatesByPageSorted('firstName_asc', this.page, this.pageSize).subscribe(candidates => {
      this.candidates = candidates;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`show-candidate-page/${this.page}/firstName_asc`]);
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });

    this.candidateService.getCandidatesByPageSorted(`${column}_${direction}`, this.page, this.pageSize).subscribe(candidates => {
      this.candidates = candidates;
      console.log(candidates);
    }, error => {
      console.log(error);
    });

    this.router.navigate([`show-candidate-page/${this.page}/${column}_${direction}`]);
  }

  handleDelete(candidate:any): void {
    this.candidateService.deleteCandiDate(candidate.id).subscribe(_ => {
      this.ngOnInit();
      this.alertComponent.changeSuccessMessage('Uspješno izbrisan kandidat.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje kandidata nije uspjelo.', 'danger');
    });
  }

  handleClick(candidate:any): void {
    this.router.navigate([`edit-candidate-page/${candidate.id}`], { state: { breadcrumbItem: '/show-candidate-page/1/firstName_asc', title: 'Pregled svih kandidata'} });
  }
}