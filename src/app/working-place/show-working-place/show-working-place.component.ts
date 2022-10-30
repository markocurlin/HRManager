import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { WorkingPlaceApiService } from 'src/app/services/working-place-api.service';
import { SortableHeader } from 'src/app/sortable-header/sortable-header';
import { SortEvent } from 'src/app/sortable-header/sortable-header';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-show-working-place',
  templateUrl: './show-working-place.component.html',
  styleUrls: ['./show-working-place.component.css']
})
export class ShowWorkingPlaceComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number = 1;
  sortOrder: string = '';

  @Input() workingPlaces: any = [];
  @ViewChild(AlertComponent) private alertComponent!: AlertComponent;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader> | undefined;

  constructor(
    private router: Router,
    private workingPlaceService: WorkingPlaceApiService,
  ) { }

  ngOnInit(): void {
    this.workingPlaceService.getWorkingPlacesByPageSorted('name_asc', this.page, this.pageSize).subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;
    }, error => {
      console.log(error);
    });

    this.workingPlaceService.getNumberPages().subscribe((numberOfPages:any) => {
      this.collectionSize = numberOfPages
    }, error => {
      console.log(error);
    });
  }

  refreshWorkingPlaces(): void {
    this.workingPlaceService.getWorkingPlacesByPageSorted('name_asc', this.page, this.pageSize).subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`working-places-page/${this.page}/userName_asc`]);
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'asc';
      }
    });
 
    this.workingPlaceService.getWorkingPlacesByPageSorted(`${column}_${direction}`, this.page, this.pageSize).subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;
    }, error => {
      console.log(error);
    });

    this.router.navigate([`working-places-page/${this.page}/${column}_${direction}`]);
  }

  handleDelete(workingPlace:any): void {
    this.workingPlaceService.deleteWorkingPlace(workingPlace.id).subscribe(_ => {
      this.ngOnInit();
      this.alertComponent.changeSuccessMessage('Uspješno izbrisano radno mjesto.', 'success');
    }, error => {
      console.log(error);
      this.alertComponent.changeSuccessMessage('Brisanje radnog mjesta nije uspjelo.', 'danger');
    });
  }
}