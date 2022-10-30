import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkingPlaceApiService } from '../services/working-place-api.service';
import { ShowWorkingPlaceComponent } from './show-working-place/show-working-place.component';

@Component({
  selector: 'app-working-place',
  templateUrl: './working-place.component.html',
  styleUrls: ['./working-place.component.css']
})
export class WorkingPlaceComponent implements OnInit {
  workingPlaces: any = [];

  @ViewChild(ShowWorkingPlaceComponent) private showWorkingPlaceComponent!: ShowWorkingPlaceComponent;

  constructor(private workingPlaceService: WorkingPlaceApiService) { }

  ngOnInit(): void {
    this.workingPlaceService.getWorkingPlaceList().subscribe(workingPlaces => {
      this.workingPlaces = workingPlaces;
    }, error => {
      console.log(error);
    });
  }

  emitWorkingPlaces(workingPlaces:any): void {
    this.workingPlaces = workingPlaces;
    this.showWorkingPlaceComponent.ngOnInit();
  }
}